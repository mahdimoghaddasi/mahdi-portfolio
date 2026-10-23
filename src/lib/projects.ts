import type { Project } from "../content/projects";

export function publishedProjects(projects: Project[]) {
  return projects.filter((project) => project.status === "published");
}

export function filterProjects(
  projects: Project[],
  query: string,
  category: string,
) {
  const search = query.trim().toLocaleLowerCase();
  return publishedProjects(projects).filter(
    (project) =>
      (category === "all" || project.category === category) &&
      [project.title, ...project.tags].some((value) =>
        value.toLocaleLowerCase().includes(search),
      ),
  );
}
