# Memorix

![Last Commit](https://img.shields.io/github/last-commit/j0hanz/Memorix?label=Updated&style=for-the-badge)[![Deployed on Heroku](https://img.shields.io/badge/Live-2a2a2a?style=for-the-badge&logo=heroku&logoColor=79589f)](https://memorix-128e93e43ff7.herokuapp.com/)

Memorix is a memory game built with React. The goal is to match all pairs of cards with the least number of moves and time.

## Table of Contents

- [Memorix](#memorix)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Game Rules](#game-rules)
  - [Components](#components)
    - [Main Components](#main-components)
    - [Utility Components](#utility-components)
  - [Hooks](#hooks)
  - [Constants](#constants)
  - [API](#api)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [Acknowledgements](#acknowledgements)

## Features

- Interactive memory game with multiple categories
- Animated card flips and transitions
- Scoreboard with star ratings based on performance
- Sound effects for game actions
- Responsive design for various screen sizes
- Error boundaries for graceful error handling

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/j0hanz/Memorix.git
    cd Memorix
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables:
    - Create a `.env` file in the root directory of the project.
    - Add the following line to the `.env` file:
        ```properties
        VITE_GITHUB_TOKEN=your_github_token_here
        ```

4. Start the development server:
    ```sh
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Click "Play Game" to start a new game.
- Select a category for the cards.
- Match all pairs of cards with the least number of moves and time.
- View your score and restart or exit the game.

## Game Rules

- The game consists of 6 pairs of cards (12 cards in total).
- All cards will briefly reveal themselves for 3 seconds at the start.
- Click on two cards to reveal them.
- If the cards match, they remain revealed.
- If the cards do not match, they will be hidden again.
- The game ends when all pairs are matched.
- Your performance is rated based on the number of moves and time taken.

## Components

### Main Components

- `App.tsx`: The main application component.
- `MainMenu.tsx`: The main menu with options to start the game, view instructions, and latest updates.
- `Game.tsx`: The game component that handles the game logic and state.
- `Cards.tsx`: Displays the game cards.
- `GameCard.tsx`: Represents an individual game card.
- `Modal.tsx`: Various modals for instructions, updates, and category selection.

### Utility Components

- `Button.tsx`: Custom button component.
- `Image.tsx`: Enhanced image component with error handling.
- `Spinner.tsx`: Loading spinner component.
- `ErrorBoundary.tsx`: Error boundary component for handling errors gracefully.

## Hooks

- `useAppState.ts`: Manages the application state.
- `useGameState.ts`: Provides the game state from the context.
- `useGameReducer.ts`: Handles the game state using a reducer.
- `useCards.ts`: Manages card interactions and animations.
- `useMotions.ts`: Provides motion animations for components.
- `useSound.ts`: Manages sound effects.
- `useTimer.ts`: Manages the game timer.
- `useLinks.ts`: Handles external links and sound effects.

## Constants

- `constants.ts`: Contains various constants used throughout the application, such as game configuration, scoring thresholds, sound identifiers, and animation settings.

## API

- `github.ts`: Fetches the latest commits from the GitHub repository using the GitHub API.

## Configuration

- `.env`: Environment variables.
- `tsconfig.json`: TypeScript configuration.
- `vite.config.ts`: Vite configuration for the project.
- `eslint.config.mjs`: ESLint configuration for linting the code.
- `package.json`: Project dependencies and scripts.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Acknowledgements

- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Howler.js](https://howlerjs.com/)
- [Axios](https://axios-http.com/)
- [Material UI](https://mui.com/material-ui/material-icons/)

Special thanks to creators of GIFs used in the project from [Pixabay](https://pixabay.com/):
