/**
 * Local fallback data.
 * Used when the GitHub API isn't available (e.g. opening index.html locally).
 * In production, the API auto-discovers profiles from the students/ directory.
 */
var LOCAL_PROFILES = [
  {
    name: "Alice Wang",
    github: "alice_w",
    about: "I like making weird websites.",
    favoriteTech: "HTML/CSS",
    image: "",
    _folder: "alice_w",
    _noImage: true
  },
  {
    name: "Bob Fischer",
    github: "bob_dev",
    about: "Trying JavaScript for the first time.",
    favoriteTech: "JavaScript",
    image: "",
    _folder: "bob_dev",
    _noImage: true
  },
  {
    name: "Carlos Mendes",
    github: "carlosmg",
    about: "Here to build something cool.",
    favoriteTech: "Python",
    image: "",
    _folder: "carlosmg",
    _noImage: true
  }
];
