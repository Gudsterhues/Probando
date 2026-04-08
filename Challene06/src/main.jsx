import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Mycontext.jsx";
import { TasksProvider } from "./context/TasksContext.jsx"
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <TasksProvider>
      <App />
      </TasksProvider>
    </AuthProvider>
  </BrowserRouter>
);