# 👋 Our Dev Wall

**This is a website built by our class.**

Every student adds their own card. Your card goes on this wall after your first Pull Request is merged.

---

## 🎯 Your one task

> Add your name, a short bio, and your favourite tech to the website. Then raise a PR. That's it.

**It should take about 5 minutes.**

---

## 📝 Do this, step by step

### 1. Click Fork

Look at the top-right of this page. Click the button that says **Fork**.

This makes a copy of the project in your GitHub account.

Wait a few seconds. You will be taken to your copy.

---

### 2. Go to the students folder

Click on the **`students/`** folder.

You will see folders like this:

```
students/
  alice_w/
  bob_dev/
  carlosmg/
```

These are example students. Yours will go here too.

---

### 3. Create your folder

Click **"Add file" → "Create new file"**

Type this as the file name (replace `yourusername` with your actual GitHub username):

```
students/yourusername/profile.json
```

> ⚠️ Your username must be **exactly** your GitHub username. Not your real name. Not a nickname.

---

### 4. Paste this and change the details

Delete everything in the file. Paste this:

```json
{
  "name": "Your Full Name",
  "github": "yourusername",
  "about": "Write one sentence about yourself.",
  "favoriteTech": "JavaScript",
  "image": ""
}
```

**Now change each line to match you:**

| Line | Change it to | Example |
|------|-------------|---------|
| `"name"` | Your real name | `"Priya Sharma"` |
| `"github"` | Your GitHub username | `"priya_dev"` |
| `"about"` | One sentence about you | `"Trying to build my first website."` |
| `"favoriteTech"` | Something you're learning | `"Python"` |
| `"image"` | Leave as `""` for now | `""` |

**Need ideas for your about line?**
- "I like making weird websites."
- "No idea what I'm doing yet."
- "Here to learn something new."
- "Future full-stack developer (hopefully)."
- "I just want to break stuff and fix it."

---

### 5. Save it

Click the green button that says **"Commit changes"**.

Type a message like: `Add my profile`

Click **"Commit changes"** again.

---

### 6. Open a Pull Request

Now go to the **original repository** (not your fork).

> How? Go to your fork. Look for a message that says something like "This branch is X commits behind [original repo]." Click **"Contribute" → "Open pull request"**.

You will see a page that says **"Open a pull request"**.

Type a title like: `Add Priya's profile`

Click **"Create pull request"**.

---

### 7. Done! 🎉

Your teacher will merge your PR. Once merged, your card appears on the website.

Tell your teacher: **"I just made my first Pull Request!"**

---

## ❓ Problems? Read this

**"I don't see my folder"**
→ You have to create it yourself in Step 3.

**"I made a mistake"**
→ Edit your `profile.json` file. Commit again. Your PR will update automatically.

**"I don't know my GitHub username"**
→ Click your profile picture (top-right of GitHub). Your username is shown under your name.

**"I don't have a photo"**
→ That's fine! The website shows your initials instead. You can add a photo later.

**"It says my JSON has an error"**
→ Check for:
  - Missing commas between lines
  - Extra comma at the end
  - Missing quotes around text
  - Copy-paste the template exactly and only change the values

---

## 🖼️ Adding a photo (optional, later)

1. Take a photo of yourself
2. Rename it to `photo.jpg`
3. Put it in your folder (`students/yourusername/photo.jpg`)
4. Change this line in your `profile.json`:
   - Before: `"image": ""`
   - After: `"image": "./photo.jpg"`
5. Commit and push

Keep the photo small — under 500KB.

---

## 🔍 Want to check your work?

Before you submit your PR, you can open `index.html` in your browser to see if your card looks right.

Just double-click the `index.html` file in your fork on GitHub, or clone your fork and open it locally.

---

## 📁 What's in this project?

You don't need to understand all of this. Just know:

| File | What it does | Do you touch it? |
|------|-------------|-----------------|
| `index.html` | The web page | No |
| `css/style.css` | The colours and layout | No |
| `js/app.js` | Loads student cards | No |
| `students/` | **Your folder goes here** | **Yes!** |
| `README.md` | This file | No |

---

**You only touch one thing: `students/yourusername/profile.json`**

Everything else is already set up for you.

---

Made with ❤️ by the class.
