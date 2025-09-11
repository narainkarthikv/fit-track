# 🏃‍♂️ Fit-Track

Welcome to **Fit-Track**, your go-to exercise log-tracking application built with the MERN (MongoDB, Express, React+Vite) stack with Bootstrap CSS Framework. Whether you're a beginner or a pro, your contribution is welcome! 🤍🤝

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/fit-track?style=flat-square)](https://github.com/narainkarthikv/fit-track/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/fit-track?style=flat-square)](https://github.com/narainkarthikv/fit-track/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/fit-track?style=flat-square)](https://github.com/narainkarthikv/fit-track/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/fit-track?style=flat-square)](./MIT-LICENSE.txt)

## 📚 About

**Fit-Track** lets you:
- Track and log your daily exercises and workouts
- Monitor your fitness progress over time
- View detailed exercise statistics and analytics
- Join a community of fitness enthusiasts

## 🛠️ Tech Stack

<table>
    <tr>
     <td>Frontend</td>
     <td><img src="https://skillicons.dev/icons?i=react,vite,bootstrap,redux" /></td>
    </tr>
    <tr>
     <td>Backend</td>
     <td><img src="https://skillicons.dev/icons?i=mongo,express" /></td>
    </tr>
    <tr>
     <td>CI/CD</td>
     <td><img src="https://skillicons.dev/icons?i=netlify,githubactions" /></td>
    </tr>
</table>

## 📚 Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Structure](#project-structure)
  - [Frontend](#frontend-1)
  - [Backend](#backend-1)
- [Development Standards](#development-standards)
- [Contributing](#contributing)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning the Repository](#cloning-the-repository)
  - [Creating a Branch](#creating-a-branch)
  - [Making Changes](#making-changes)
  - [Committing Changes](#committing-changes)
  - [Pushing Changes](#pushing-changes)
  - [Creating a Pull Request](#creating-a-pull-request)
- [Contributors](#contributors)
- [License](#license)

## Installation

### Frontend

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Backend

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Setup MongoDB Atlas:
   1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account if you don't already have one.
   2. Create a new cluster by following the prompts. [Mongo Atlas Cluster Creation Tutorial](https://www.youtube.com/watch?v=esKNjzDZItQ)
   3. Once the cluster is created, go to the **Database Access** section and create a user with the necessary privileges.
   4. Go to **Network Access** and allow your IP address (or allow access from anywhere if testing locally).
   5. In the **Clusters** section, click **Connect**, then choose **Connect your application**. You'll see a connection string that looks like this:
      ```
      mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
      ```
   6. Replace `<username>` and `<password>` with your actual MongoDB Atlas username and password. Copy the entire connection string.
4. Add MongoDB ATLAS_URI to `.env` file:
   - Create a `.env` file in the `backend` directory.
   - Add the following line to the `.env` file, replacing `<your-mongodb-connection-string>` with the connection string you copied from MongoDB Atlas:
     ```bash
     ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fit-track?retryWrites=true&w=majority
     ```
5. Start the server:
   ```sh
   node server.js
   ```
   or if `nodemon` is installed for live updates of backend:
   ```sh
   nodemon server.js
   ```

## Project Structure

### Frontend

The `frontend` directory contains the React application:

```plaintext
frontend/
├── public/                 # Public assets and favicon
├── src/
│   ├── assets/            # Static assets and Lottie animations
│   │   ├── images/        # Image assets
│   │   └── lottie/       # Lottie animation files
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Shared components
│   │   ├── Exercise/     # Exercise-related components
│   │   ├── Heatmap/     # Heatmap visualization
│   │   └── Navbar/      # Navigation components
│   ├── pages/            # Application pages/routes
│   ├── slices/           # Redux toolkit slices
│   ├── store/            # Redux store configuration
│   └── utils/            # Utility functions
├── index.html            # HTML template
├── package.json          # Project dependencies
└── vite.config.js       # Vite configuration
```

### Backend

The `backend` directory contains the Node.js server and Express application:

```plaintext
backend/
├── models/               # MongoDB Schema models
│   ├── exercise.model.js # Exercise data model
│   └── user.model.js    # User data model
├── routes/              # API route handlers
│   ├── exercises.js     # Exercise-related routes
│   └── user.js         # User authentication routes
├── package.json         # Backend dependencies
└── server.js           # Express server setup
```

## Development Standards

### Code Style
- We use ESLint and Prettier for code formatting and linting
- Follow the established ESLint rules in both frontend and backend
- Maximum line length is 100 characters
- Use 2 spaces for indentation
- Follow React best practices and hooks rules

### Documentation
- All components and functions must have JSDoc documentation
- Include clear descriptions for API endpoints
- Document complex business logic
- Keep the README and API documentation up to date

### Git Workflow
- Create feature branches from `develop` using format: `feature/description`
- Create bug fix branches using format: `fix/description`
- Follow conventional commits specification
- Submit PRs using the provided template
- Squash commits before merging

### Code Review Process
- All PRs require at least one review
- Address all comments and suggestions
- Ensure CI checks pass before merging
- Keep PRs focused and reasonably sized

### Testing
- Write unit tests for new features
- Include API endpoint tests
- Maintain test coverage above 80%
- Test components in isolation

## Contributing

We welcome contributions! To contribute to Fit-Track, follow these steps:

### Forking the Repository

1. Fork the repository by clicking the "Fork" button at the top right of the repository page on GitHub.
   ![Forking the Repository](https://user-images.githubusercontent.com/github-fork-button.png)

### Cloning the Repository

2. Clone your forked repository to your local machine:
   ```sh
   git clone https://github.com/your-username/Fit-Track.git
   ```
3. Navigate to the project directory:
   ```sh
   cd Fit-Track
   ```

### Creating a Branch

4. Create a new branch for your feature or bug fix (create a branch according to the issue working on):
   ```sh
   git switch -c your-branch-name
   ```

### Making Changes

5. Make your changes to the codebase. You can edit the files using your preferred code editor.

### Committing Changes

6. Add the changes to the staging area:
   ```sh
   git add .
   ```
7. Commit the changes with a descriptive message:
   ```sh
   git commit -m "Description of your changes"
   ```

### Pushing Changes

8. Push the changes to your forked repository:
   ```sh
   git push origin your-branch-name
   ```

### Creating a Pull Request

9. Create a pull request from your forked repository to the main repository. Go to the "Pull Requests" tab on the main repository, and click "New Pull Request". Follow the instructions to create your pull request.

## Contributors

Thanks to all our contributors who have helped make Fit-Track better! Check out our [Contributors](https://github.com/narainkarthikv/fit-track/graphs/contributors) page.

Let's build something great together and make Fit-Track the best it can be! ❤️🤝

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/narainkarthikv/Fit-Track/blob/main/MIT-LICENSE.txt) file for details.
