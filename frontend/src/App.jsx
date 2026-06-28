import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { TaskProvider, useTasks } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import StatsBar from "./components/StatsBar";

// Inner component so it can use useTasks (which needs to be inside the Provider)
const AppInner = () => {
  const { fetchTasks, filters } = useTasks();

  // Load tasks on mount
  useEffect(() => {
    fetchTasks(filters);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="app-header__inner">
            <h1 className="app-title">
              <span className="app-title__icon">✅</span> Task Tracker
            </h1>
            <p className="app-subtitle">Stay on top of what matters</p>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section">
          <h2 className="section-title">Add New Task</h2>
          <TaskForm />
        </section>

        <StatsBar />

        <section className="section">
          <FilterBar />
          <TaskList />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React + Node + MongoDB</p>
      </footer>
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <AppInner />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "#1e2030",
          color: "#cdd6f4",
          border: "1px solid #313244",
        },
      }}
    />
  </TaskProvider>
);

export default App;
