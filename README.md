# React + TypeScript + Vite Project

This project demonstrates a modern web application setup using React, TypeScript, and Vite. It includes advanced configurations, tools, and best practices to ensure scalability, maintainability, and performance.

## Key Features

- **React with TypeScript**: Build type-safe and scalable React applications.
- **Vite**: Fast development server and optimized production builds.
- **Redux Toolkit**: State management with Redux Toolkit for predictable state handling.
- **React Router**: Client-side routing for navigation.
- **ESLint and Prettier**: Enforce code quality and formatting standards.
- **Unit Testing**: Comprehensive tests using `vitest` and `@testing-library/react`.

---

## Project Structure

- **`src/`**: Contains all application source code.
  - **`components/`**: Reusable UI components.
  - **`store/`**: Redux store setup.
  - **`hooks/`**: App hooks for custom use of dispatch and selectore function.
  - **`utils/`**: Helper functions and types.
  - **`utils/`**: Helper functions and types.
  - **`App.tsx`**: Main application component.
  - **`__tests__/`**: Unit and integration tests.
- **`coverage`**: The coverage report ...

---

## NPM Commands

Here are the key npm commands to manage and run the project:

### Development

- **Start the development server**:
  ```bash
  npm run dev

- **Build the project for production**:
  Build the application and optimize it for deployment. The output will be in the `dist` folder.  
  ```bash
  npm run build

- **Preview the production build**:
  Serve the production build locally to test it before deployment.
  ```bash
  npm run preview

- **Run tests in watch mode**:
  Continuously run tests as files are modified.
  ```bash
  npm run test

- **Generate test coverage report**:
  Generate a detailed report of test coverage for the project.
  ```bash
  npm run coverage