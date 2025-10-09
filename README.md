# 🏃‍♂️ Fit-Track

> **Your all-in-one fitness log tracker built on the MERN stack**

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/fit-track?style=flat-square)](https://github.com/narainkarthikv/fit-track/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/fit-track?style=flat-square)](https://github.com/narainkarthikv/fit-track/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/fit-track?style=flat-square)](https://github.com/narainkarthikv/fit-track/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/fit-track?style=flat-square)](./MIT-LICENSE.txt)

---

## 🌟 Why Fit-Track?

Fit-Track is a MERN-stack app designed to help you **log workouts**, **track progress**, and **stay motivated**. Whether you’re a beginner or a pro, we welcome your contributions to make Fit-Track better for everyone.

✨ **Key Features:**

- Log & track your daily exercises
- Monitor your progress with charts & analytics
- Access motivational fitness quotes
- Join a growing open-source fitness community

---

## 🛠️ Tech Stack

| Area         | Stack / Tools                          |
| ------------ | -------------------------------------- |
| **Frontend** | React + Vite, Redux Toolkit, Bootstrap |
| **Backend**  | Node.js, Express.js, MongoDB Atlas     |
| **CI/CD**    | Netlify (Frontend), GitHub Actions     |

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,bootstrap,redux,mongo,express,netlify,githubactions" />
</p>

---

## 📑 Table of Contents

- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development Standards](#development-standards)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

---

## 🚀 Installation

### 1️⃣ Backend Setup

- Refer `.env.example` in `backend` directory.

```bash
cd backend
npm install
```

- Create a `.env` file inside the `backend` directory:

```bash
# backend/.env
ATLAS_URI=<your-mongodb-connection-string>
```

- Start the server:

```bash
node server.js
# or use nodemon for live reload:
nodemon server.js
```

### 2️⃣ Frontend Setup

- Refer `.env.example` in `frontend` directory.

```bash
cd frontend
npm install
```

- Create a `.env` file inside the `frontend` directory:

```bash
# frontend/.env
VITE_SERVER_URL=<backend-server-url>
VITE_APININJAS=<your-api-ninjas-key>
```

- Start the development server:

```bash
npm run dev
```

---

## 🗂️ Project Structure

### Frontend

```plaintext
frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── lottie/
│   ├── components/
│   │   ├── common/
│   │   ├── Exercise/
│   │   ├── Heatmap/
│   │   └── Navbar/
│   ├── pages/
│   ├── slices/
│   ├── store/
│   └── utils/
├── index.html
├── package.json
└── vite.config.js
```

### Backend

```plaintext
backend/
├── models/
├── routes/
├── package.json
└── server.js
```

---

## 🔑 Environment Variables

| Directory    | Variable Name     | Description                                                                               |
| ------------ | ----------------- | ----------------------------------------------------------------------------------------- |
| **Backend**  | `ATLAS_URI`       | MongoDB Atlas connection string                                                           |
| **Frontend** | `VITE_SERVER_URL` | URL where backend server is hosted (e.g., [http://localhost:5000](http://localhost:5000)) |
|              | `VITE_APININJAS`  | API Ninjas key for Quotes API                                                             |

---

## 📝 Development Standards

- **Code Style:**
  - ESLint + Prettier for formatting and linting
  - 2-space indentation, max line length 100 chars
  - Follow React Hooks and Redux best practices

- **Documentation:**
  - JSDoc for components & functions
  - Keep README and API docs updated

- **Git Workflow:**
  - Branch naming: `feature/description` or `fix/description`
  - Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - PR template usage & squash commits

- **Testing:**
  - Unit tests for new features
  - Test coverage ≥ 80%

---

## 🤝 Contributing

We ❤️ contributions! Here’s how to get started:

1. **Fork the repo** (click the Fork button at the top right).

2. **Clone your fork:**

   ```bash
   git clone https://github.com/your-username/fit-track.git
   cd fit-track
   ```

3. **Create a new branch:**

   ```bash
   git switch -c feature/your-feature-name
   ```

4. **Make changes** in your editor of choice.

5. **Stage & Commit:**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

6. **Push your branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request** from your fork to the `develop` branch of the main repo.

📌 _Tip: Keep your PRs small and focused to get faster reviews._

---

## 👥 Contributors

Thanks to everyone who has helped make Fit-Track awesome! 💪
Check out our [Contributors Page](https://github.com/narainkarthikv/fit-track/blob/main/Contributors.md).

---

## 📜 License

This project is licensed under the MIT License.
See the [LICENSE](https://github.com/narainkarthikv/fit-track/blob/main/MIT-LICENSE.txt) file for details.

---

### 💡 Final Thoughts

We’re building **Fit-Track** as a collaborative fitness companion.
Your code, your ideas, and your feedback make it stronger. Let’s build it together! 🏗️💚
