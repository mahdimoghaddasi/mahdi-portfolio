export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

// Add only real roles and public dates. An empty list shows a focus section instead.
export const experience: Experience[] = [];
