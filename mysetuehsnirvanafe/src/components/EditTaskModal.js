import React, { useState } from 'react';
import { updateTask } from '../services/api';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';

const EditTaskModal = ({ task, setTasks, closeModal }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [targetDate, setTargetDate] = useState(task.target_date);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input
    if (!title || !priority || !targetDate) {
      setErrors({
        title: !title ? 'Title is required' : '',
        priority: !priority ? 'Priority is required' : '',
        targetDate: !targetDate ? 'Target Date is required' : ''
      });
      return;
    }
    try {
      const updatedTask = { title, description, priority, target_date: targetDate };
      await updateTask(task.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, ...updatedTask } : t))
      );
      closeModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Modal open onClose={closeModal}>
      <Box sx={{ ...modalStyle }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Edit Task</Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            error={!!errors.priority}
            helperText={errors.priority}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Target Date"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            error={!!errors.targetDate}
            helperText={errors.targetDate}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" color="primary">Save</Button>
          <Button variant="outlined" color="secondary" onClick={closeModal}>Cancel</Button>
        </form>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default EditTaskModal;
