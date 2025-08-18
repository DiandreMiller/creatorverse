# 🌌 CreatorVerse  

CreatorVerse is a fantastical web app where you can **explore, add, and showcase creators** across different domains—from music and politics to culture and beyond. With a cosmic-themed design and smooth UI powered by [PicoCSS](https://picocss.com/), the project offers an engaging way to browse through a growing community of impactful figures.  

---

## ✨ Features  

- 🎨 **Cosmic UI** – A sleek, starry background that brings a unique aesthetic to the app.  
- 🧑‍🎤 **Creator Showcase** – Browse through a grid of creators, each represented by an image and their name.  
- ➕ **Add Creator** – Add new creators dynamically with name and image support.  
- 🔎 **About Page** – Learn more about the project’s mission and inspiration.  
- ⚡ **Supabase Integration (Optional)** – Future-proofed for backend data storage and user contributions.  

---

## 🖥️ Tech Stack  

- **Frontend:** React, React Router, Vite  
- **Styling:** [PicoCSS](https://picocss.com/) + custom cosmic background (`cosmic.css`)  
- **Backend (Optional):** Supabase (for authentication and database)  
- **Deployment:**  Netlify (recommended) (Coming)

---

## 📂 Project Structure  

```bash
src/
 ├── components/
 │   ├── Navbar.jsx
 │   ├── Footer.jsx
 │   ├── CreatorGrid.jsx
 │   └── cosmic.css
 ├── pages/
 │   ├── Home.jsx
 │   ├── About.jsx
 │   ├── ShowCreators.jsx
 │   └── AddCreator.jsx
 ├── utils/
 │   └── supabaseClient.js  # optional, if using Supabase
 ├── App.jsx
 └── main.jsx
```

 ## 🚀 Getting Started

Prerequisites
	•	Node.js (v18+)
	•	npm or yarn

Installation

```
# Clone repo
git clone https://github.com/DiandreMiller/creatorverse

# Navigate
cd creatorverse

# Install dependencies
npm install

# Run dev server
npm run dev
```

Visit http://localhost:5173/ to see CreatorVerse in action.

🌠 Screenshots

(Add screenshots of your app here!)

⸻

🔮 Roadmap
	•	✅ Static creator grid
	•	✅ Cosmic-themed layout with Navbar + Footer
	•	🔲 Supabase integration for dynamic creators
	•	🔲 User login with passkeys
	•	🔲 Creator categories and filtering

⸻

🛡️ Security
	•	All inputs are sanitized when integrated with Supabase.
	•	No need for DOMPurify unless rendering untrusted HTML directly.

⸻

📜 License

This project is licensed under the MIT License.

⸻

🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

⸻

🌌 Acknowledgements
	•	PicoCSS for the lightweight styling.
	•	Supabase for optional backend services.
	•	Every creator who inspires the universe of CreatorVerse.