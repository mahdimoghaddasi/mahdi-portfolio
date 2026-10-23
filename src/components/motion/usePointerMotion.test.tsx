import { act, renderHook } from "@testing-library/react";
import type { PointerEvent } from "react";
import { expect, test, vi } from "vitest";
import { usePointerMotion } from "./usePointerMotion";

function event(target: HTMLElement, pointerType = "mouse") {
  return {
    currentTarget: target,
    pointerType,
    clientX: 80,
    clientY: 30,
  } as PointerEvent<HTMLElement>;
}

test("touch and reduced-motion environments do not measure or tilt surfaces", () => {
  const target = document.createElement("div");
  const measure = vi.spyOn(target, "getBoundingClientRect");
  const { result } = renderHook(() => usePointerMotion());
  act(() => {
    result.current.onPointerEnter(event(target));
    result.current.onPointerMove(event(target));
  });
  expect(result.current.enabled).toBe(false);
  expect(measure).not.toHaveBeenCalled();
  expect(result.current.rotateX.get()).toBe(0);
});

test("fine-pointer movement uses cached bounds and does not rerender React", () => {
  window.matchMedia = vi
    .fn()
    .mockImplementation((media: string) => ({
      matches: true,
      media,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  const target = document.createElement("div");
  const measure = vi
    .spyOn(target, "getBoundingClientRect")
    .mockReturnValue({ left: 0, top: 0, width: 100, height: 100 } as DOMRect);
  let renders = 0;
  const { result } = renderHook(() => {
    renders++;
    return usePointerMotion();
  });
  const initialRenders = renders;
  act(() => {
    result.current.onPointerEnter(event(target));
    for (let i = 0; i < 20; i++) result.current.onPointerMove(event(target));
  });
  expect(measure).toHaveBeenCalledTimes(1);
  expect(renders).toBe(initialRenders);
  measure.mockClear();
  act(() => {
    result.current.onPointerEnter(event(target, "touch"));
    result.current.onPointerMove(event(target, "touch"));
  });
  expect(measure).not.toHaveBeenCalled();
});
