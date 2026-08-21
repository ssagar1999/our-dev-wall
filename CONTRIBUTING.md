# Contributing Guide

This document is for **students** making their first contribution and for **reviewers** (teachers/TAs) merging Pull Requests.

---

## For Students

### What to do

1. Fork this repository
2. Find or create `students/your-github-username/`
3. Add a `profile.json` file with your details
4. Optionally add a `photo.jpg` in the same folder
5. Commit and open a Pull Request

### profile.json format

```json
{
  "name": "Your Name",
  "github": "your-github-username",
  "about": "A short bio about yourself.",
  "favoriteTech": "JavaScript",
  "image": ""
}
```

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Your full name |
| `github` | Yes | Your GitHub username (must match your folder name) |
| `about` | Yes | One sentence about yourself |
| `favoriteTech` | No | Something you're learning or know |
| `image` | No | Path to photo, e.g. `"./photo.jpg"`. Leave empty for initials. |

### Common mistakes

- **Wrong folder name:** Your folder must match your GitHub username exactly
- **Invalid JSON:** Missing commas, trailing commas, or unmatched quotes
- **Missing fields:** At minimum, include `name`, `github`, and `about`
- **Photo too large:** Keep images under 500KB

---

## For Reviewers

### Before merging a PR, check:

#### 1. File structure

The student's folder should be at:
```
students/<github-username>/profile.json
```

Optional:
```
students/<github-username>/photo.jpg
```

#### 2. profile.json validity

- [ ] File is valid JSON (no trailing commas, proper quoting)
- [ ] `name` field exists and is a non-empty string
- [ ] `github` field matches the folder name
- [ ] `about` field exists and is a non-empty string
- [ ] `image` field is either empty string or `"./photo.jpg"`
- [ ] No additional fields that could break the site

#### 3. Content checks

- [ ] Name looks real (not "test", "asdf", or placeholder)
- [ ] About is a real sentence (not lorem ipsum)
- [ ] No offensive or inappropriate content
- [ ] No malicious links or scripts

#### 4. Photo (if included)

- [ ] File is actually an image (JPEG, PNG, or WebP)
- [ ] File size is reasonable (under 500KB)
- [ ] Image is appropriate for a class project

### Valid profile.json example

```json
{
  "name": "Rahul Kumar",
  "github": "rahul_dev",
  "about": "Trying web development for the first time.",
  "favoriteTech": "JavaScript",
  "image": "./photo.jpg"
}
```

### Minimal valid example

```json
{
  "name": "Jane Doe",
  "github": "janedoe",
  "about": "Here to learn and build things."
}
```

### Invalid examples

**Trailing comma (will break JSON):**
```json
{
  "name": "Jane",
  "github": "jane",
}
```

**Missing required field:**
```json
{
  "name": "Jane"
}
```

**GitHub username mismatch:**
- Folder: `students/janedoe/`
- JSON: `"github": "jane_doe"` (underscore vs no underscore)

### Quick JSON validation

You can validate JSON online at [jsonlint.com](https://jsonlint.com) or ask the student to check in their editor.

### Merge checklist

1. Approve the PR if all checks pass
2. Merge using "Squash and merge" (keeps main history clean)
3. The GitHub Pages deployment will auto-update the site
4. Tell the student to check the live site

### If a PR has issues

Leave a comment explaining what needs to be fixed. Common fixes:

- "Your JSON has a trailing comma after the last field. Remove it."
- "Your `github` field doesn't match your folder name. Please fix."
- "Your file is missing the `about` field. Please add it."

Be encouraging. This is their first PR.
