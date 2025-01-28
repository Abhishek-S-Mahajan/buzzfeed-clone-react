# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<hr />
- Changed to the port from 5173 (default of Vite) to 3000 (front-end specific). <br />
- The app uses state and refs to manage a dynamic quiz interface where questions are hosted locally and answers (options chosen by the user) are also tracked. <br />
- You are using "chosenAnswerItems" and "unansweredQuesIDs" effectively to track the user's progress. The logic for managing the state of these is clear and ensures that once an answer is chosen, it is no longer available for selection, and the corresponding question is marked as answered.
- The component listens for user interactions and adjusts the display by scrolling to the next unanswered question or to the answer block if all the questions are answered. <br />
- useEffect is used extensively to handle side effects like data fetching, updating unanswered questions, and triggering scroll behavior based on user actions.
