import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import AddItemButton from './components/AddItemButton';
import TaskList from './components/TaskList';
import { getTasks } from './services/api';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (token) {
        try {
          const response = await getTasks(token);
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <Router>
      <Layout>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
        {token ? (
          <>
            <AddItemButton setTasks={setTasks} />
            <TaskList tasks={tasks} setTasks={setTasks} />
          </>
        ) : (
          <Navigate to="/login" />
        )}
        <Routes>
          {/* <Route path="/" element={<HomePage token={token} />} /> */}
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
