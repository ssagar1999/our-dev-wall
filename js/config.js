/**
 * Configuration — set your repository details here.
 *
 * The website uses the GitHub API to automatically find and load
 * all student profiles from the students/ directory.
 *
 * Update these values after you create the repository.
 */
var CONFIG = {
  // Your GitHub username or organization
  owner: "ssagar1999",

  // The repository name (e.g. "our-dev-wall")
  repo: "our-dev-wall",

  // Branch to fetch from
  branch: "main",

  // Total number of students in the class (for the progress bar)
  totalStudents: 90,

  // How many profiles to show (set to 0 for unlimited)
  limit: 0,

  // Cache profiles in localStorage (minutes)
  cacheMinutes: 5
};
