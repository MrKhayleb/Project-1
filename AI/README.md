# 🚀 Alex Morgan — Personal Portfolio

A modern, dark-themed personal portfolio website built with **HTML5**, **CSS3**, and **Vanilla JavaScript**.  
Zero dependencies. No build tools required.

---

## 📁 Project Structure

```
portfolio/
│
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles (CSS variables, responsive, animations)
├── script.js           ← All interactivity (navbar, typewriter, carousel, form...)
│
├── assets/
│   ├── images/         ← Add your profile photo, project screenshots, blog images here
│   │   └── profile.jpg ← Your headshot (replace the icon placeholder)
│   └── resume.pdf      ← Your resume (linked from "Download Resume" button)
│
└── README.md           ← This file
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Sticky Navbar** | Transparent → blurred glass on scroll. Highlights active section. |
| **Typewriter Effect** | Cycles through developer roles in the hero. |
| **Scroll Reveal** | Elements animate in from up / left / right on scroll. |
| **Animated Skill Bars** | Progress bars fill when skills section enters the viewport. |
| **Portfolio Filtering** | Filter projects by category (All / Web Apps / UI Design / Personal). |
| **Testimonial Carousel** | Auto-plays, supports dot navigation, prev/next buttons, and touch swipe. |
| **Form Validation** | Real-time + on-submit validation with accessible error messages. |
| **Mobile Hamburger Menu** | Smooth animated mobile navigation. |
| **Responsive Design** | Adapts perfectly to desktop, tablet, and mobile. |
| **SEO Friendly** | Semantic HTML5, meta tags, aria-labels, and landmark roles. |

---

## 🏃 Running Locally

### Option A — Open directly (simplest)
1. Download or clone this repository.
2. Open `index.html` in any modern browser.

### Option B — Live Server (recommended for development)
1. Install [VS Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.
4. Browser auto-refreshes on every save.

### Option C — Python simple server
```bash
# Python 3
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Option D — Node.js serve
```bash
npm install -g serve
serve .
```

---

## 🎨 Personalisation Guide

### 1. Replace placeholder content

**In `index.html`:**
- Change every instance of `Alex Morgan` to your name.
- Update `alex@morgan.dev`, phone number, and location.
- Replace skill percentages in the `data-width` attributes.
- Add your real project cards (title, description, tech tags, links).
- Update blog post content or remove the section.

### 2. Add your profile photo

```html
<!-- Replace this in the hero and about sections: -->
<div class="image-placeholder"><i class="fas fa-user"></i></div>

<!-- With: -->
<img src="assets/images/profile.jpg" alt="Alex Morgan" />
```

Then update the CSS to remove the icon-centering styles:
```css
.image-placeholder { padding: 0; }
.image-placeholder img { width: 100%; height: 100%; object-fit: cover; }
```

### 3. Add your resume
Drop your resume PDF at `assets/resume.pdf` — the download button already points there.

### 4. Update social links
Search for `href="#"` inside the social icon anchors and replace with your real URLs:
```html
<a href="https://github.com/yourusername" ...>
<a href="https://linkedin.com/in/yourusername" ...>
```

### 5. Connect the contact form (optional)
Replace `fakeSubmit()` in `script.js` with a real submission:

**Using [EmailJS](https://www.emailjs.com/) (free, no backend needed):**
```js
// Install: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
emailjs.init('YOUR_PUBLIC_KEY');

async function realSubmit(formData) {
  return emailjs.send('service_id', 'template_id', {
    from_name: formData.get('name'),
    from_email: formData.get('email'),
    message: formData.get('message'),
  });
}
```

### 6. Change the accent colour
Edit a single CSS variable at the top of `style.css`:
```css
:root {
  --accent: #f97316;  /* ← Change this hex to any colour you like */
}
```

---

## 🌐 Deployment

### Deploy to GitHub Pages (free)
1. Create a new GitHub repository.
2. Push all files to the `main` branch.
3. Go to **Settings → Pages**.
4. Set Source to `Deploy from a branch` → `main` → `/ (root)`.
5. Click **Save** — your site is live at `https://yourusername.github.io/repo-name` within a minute.

### Deploy to Netlify (free, recommended)
**Option A — Drag & Drop:**
1. Go to [app.netlify.com](https://app.netlify.com).
2. Drag your `portfolio/` folder onto the deploy zone.
3. Your site is live instantly with a random URL.
4. Rename it under **Site settings → Change site name**.

**Option B — Git integration (auto-deploys on push):**
1. Connect your GitHub repo to Netlify.
2. Every push to `main` automatically redeploys. No extra config needed.

### Custom Domain
Both GitHub Pages and Netlify support custom domains for free.  
Point your domain's DNS records to their servers and configure it in the dashboard.

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure, ARIA accessibility
- **CSS3** — CSS custom properties, Grid, Flexbox, animations, responsive
- **Vanilla JS** — No frameworks, no build step, IntersectionObserver API

---

## 📄 License

MIT License — free to use, modify, and distribute for personal and commercial projects.  
Attribution appreciated but not required.

---

## 📬 Questions?

Open an issue or reach out at **alex@morgan.dev**.
