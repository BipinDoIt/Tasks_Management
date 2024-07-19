import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTaskModal from './EditTaskModal';
import { deleteTask } from '../services/api';

const TaskList = ({ tasks, setTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Target Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Link href={`/tasks/${task.id}`} underline="hover">
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.target_date}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => setSelectedTask(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          setTasks={setTasks}
          closeModal={() => setSelectedTask(null)}
        />
      )}
    </Paper>
  );
};

export default TaskList;
