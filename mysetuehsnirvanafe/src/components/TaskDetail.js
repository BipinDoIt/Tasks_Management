import React, { useState, useEffect } from 'react';
import { getTask } from '../services/api';
import { useParams } from 'react-router-dom';

const TaskDetail = ({ token }) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTask(taskId, token);
      setTask(response.data);
    };
    fetchTask();
  }, [taskId, token]);

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>{task.priority}</p>
      <p>{new Date(task.target_date).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskDetail;
