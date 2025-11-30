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

- [Quick Start with Docker](#quick-start-with-docker)
- [Local Installation](#local-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development Standards](#development-standards)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

---

## 🐳 Quick Start with Docker

Get the entire development environment running in seconds using Docker and Docker Compose.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/narainkarthikv/fit-track.git
cd fit-track
```

2. **Configure environment variables:**

```bash
cp .env.example .env
```

Edit `.env` and update the following variables:

```bash
# Backend Configuration
NODE_ENV=development
BACKEND_PORT=5000
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=7d

# MongoDB Connection String
ATLAS_URI=<your-mongodb-atlas-connection-string>

# Frontend Configuration
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:5000/
VITE_APININJAS=<your-api-ninjas-key>
```

3. **Start the application:**

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f
```

4. **Access the application:**

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

### Useful Docker Commands

```bash
# View running containers
docker-compose ps

#View logs for docker-compose
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend    # Backend logs
docker-compose logs -f frontend   # Frontend logs

# Stop services
docker-compose stop

# Remove services and volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Stop and remove all containers, networks, and orphans
docker-compose down --remove-orphans

# Restart all services defined in docker-compose.yml
docker-compose restart

# Execute commands in container
docker-compose exec backend npm install
docker-compose exec frontend npm install
```

---

## 🚀 Local Installation

### 1️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp ../.env.example .env
```

Update `backend/.env` with your configuration:

```bash
# backend/.env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=7d
ATLAS_URI=<your-mongodb-atlas-connection-string>
```

Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
node server.js
```

The backend server will be available at `http://localhost:5000`

### 2️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp ../.env.example .env
```

Update `frontend/.env` with your configuration:

```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/
VITE_APININJAS=<your-api-ninjas-key>
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 🗂️ Project Structure

### Frontend

````plaintext
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
## 🔑 Environment Variables

### Backend Environment Variables

| Variable          | Default Value | Description                                                     |
| ----------------- | -------------- | --------------------------------------------------------------- |
| `NODE_ENV`        | `development`  | Node.js environment (development/production)                    |
| `PORT`            | `5000`         | Backend server port                                             |
---

## 📜 Available Scripts

### Backend Scripts

```bash
cd backend

# Development mode with hot reload (nodemon)
npm run dev

# Production mode
node server.js

# Run tests
npm test
````

### Frontend Scripts

```bash
### Code Style

- **Formatting & Linting:**
  - ESLint + Prettier for all code
  - 2-space indentation
  - Max line length: 100 characters
  - Use semicolons

- **Frontend:**
  - Follow React Hooks best practices
  - Use Redux Toolkit for state management
  - Functional components only
  - Props validation with PropTypes

- **Backend:**
  - RESTful API design principles
  - Proper error handling and validation
  - Use async/await instead of callbacks
  - Add JSDoc comments for endpoints

- **Documentation:**
  - JSDoc for functions and components
  - Comments for complex logic
  - Keep README updated
  - Document API endpoints

### Git Workflow

- **Branch Naming:**
  - Features: `feature/description`
  - Bugs: `fix/description`
  - Docs: `docs/description`
  - Chores: `chore/description`

- **Commits:**
  - Follow [Conventional Commits](https://www.conventionalcommits.org/)
  - Examples:
    - `feat: add user login functionality`
    - `fix: resolve JWT validation error`
    - `docs: update installation guide`
    - `refactor: optimize database queries`

- **Pull Requests:**
  - Keep PRs focused and small
  - Link related issues
  - Provide clear description
  - Request reviews from maintainers

### Testing (Need to be implemented in the upcoming days)

- **Coverage:** Aim for ≥ 80% test coverage
- **Unit Tests:** Test individual functions/components
- **Integration Tests:** Test component interactions
- **E2E Tests:** Test critical user flows
- **Tools:**
  - Frontend: Vitest + React Testing Library
  - Backend: Jest (recommended)

### Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] Changes are well-documented
- [ ] Tests added/updated
- [ ] No console logs in production code
- [ ] No breaking changes (or documented)
- [ ] Performance impact assessed
# Fix linting issues
npm run lint -- --fix
```

---

## 👥 Contributors

Thanks to everyone who has helped make Fit-Track awesome! 💪

<a href="https://github.com/narainkarthikv/fit-track/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=narainkarthikv/fit-track" />
</a>

See the [Contributors Page](https://github.com/narainkarthikv/fit-track/blob/main/Contributors.md) for the full list.

### How to Add Yourself

When your PR is merged, add yourself to the `Contributors.md` file following the format in that file.

---

## 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](https://github.com/narainkarthikv/fit-track/blob/main/MIT-LICENSE.txt) file for full details.

**Summary:** You are free to use, modify, and distribute this software for any purpose, including commercial use.

---

## 📚 Additional Resources

- [Contributing Guide](CONTRIBUTING.md)

---

## 🔗 Links

- **Website:** [fit-track.vercel.app](https://fit-track.vercel.app/)
- **Issues:** [GitHub Issues](https://github.com/narainkarthikv/fit-track/issues)
- **Discussions:** [GitHub Discussions](https://github.com/narainkarthikv/fit-track/discussions)

---

## 🙏 Support

If you find Fit-Track helpful:

- ⭐ Give us a star on GitHub
- 🐛 Report bugs and suggest features through [Issues](https://github.com/narainkarthikv/fit-track/issues)
- 💬 Join discussions and help other contributors
- 📢 Share Fit-Track with your network

---

## 💡 Final Thoughts

We're building **Fit-Track** as a collaborative fitness companion. Your code, ideas, and feedback make it stronger every day.

Whether you're fixing a typo, improving performance, or building new features — **every contribution matters!** 🏗️💚

Let's build the best fitness tracker together! 🚀

````

**Hot reload not working:**
```bash
# Rebuild without cache
docker-compose up -d --build

# Check file permissions
ls -la backend/
ls -la frontend/
````

### Local Development Issues

**Port conflicts:**

```bash
# Check what's using the port
lsof -i :5000   # Backend
lsof -i :5173   # Frontend
```

**Dependencies issues:**

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

**Build errors:**

```bash
# Check Node.js version (should be 18+)
node --version

# Clear Vite cache
rm -rf .vite
npm run dev
```

---

## 📝 Development Standards | MongoDB Atlas or local MongoDB connection string (REQUIRED) |

### Frontend Environment Variables

| Variable         | Default Value            | Description                              |
| ---------------- | ------------------------ | ---------------------------------------- |
| `VITE_API_URL`   | `http://localhost:5000/` | Backend server URL                       |
| `VITE_APININJAS` | N/A                      | API Ninjas key for Quotes API (optional) |

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
