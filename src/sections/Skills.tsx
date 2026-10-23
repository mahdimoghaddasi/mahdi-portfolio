import { portfolioStack, skillGroups } from "../content/skills";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/motion/Reveal";

export function Skills() {
  const confirmedGroups = skillGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.confirmed),
    }))
    .filter((group) => group.items.length);
  return (
    <section
      className="section container toolkit-section"
      aria-label="Technical toolkit"
    >
      <Reveal>
        <SectionHeading
          number="03"
          label="THE TOOLKIT"
          title="The right tools. A clear purpose."
        />
        <p className="section-intro">
          The stack behind this portfolio. Each piece has a job to do.
        </p>
      </Reveal>
      <Reveal>
        <div className="stack-grid">
          {portfolioStack.map((tool) => (
            <div className="stack-item" key={tool.name}>
              <span className="tool-symbol mono" aria-hidden="true">
                {tool.symbol}
              </span>
              <div>
                <h3>{tool.name}</h3>
                <p>{tool.detail}</p>
              </div>
            </div>
          ))}
        </div>
        {confirmedGroups.length ? (
          <div className="confirmed-skills">
            {confirmedGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="toolkit-note">
            <span className="small-dot" /> This is the project’s stack. A
            personal skills overview will be added once confirmed.
          </p>
        )}
      </Reveal>
    </section>
  );
}
