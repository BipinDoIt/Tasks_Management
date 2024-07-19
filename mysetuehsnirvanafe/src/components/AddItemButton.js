import React, { useState } from 'react';
import { createTask } from '../services/api';
import { Button, Modal, TextField, Box, Typography } from '@mui/material';

const AddItemButton = ({ setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [targetDate, setTargetDate] = useState('');
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
      const newTask = { title, description, priority, target_date: targetDate };
      const response = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setPriority('');
      setTargetDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setPriority('');
    setTargetDate('');
    setErrors({});
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>Add Item</Button>
      <Modal open={isModalOpen} onClose={handleCancel}>
        <Box sx={{ ...modalStyle }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add Task</Typography>
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
            <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
          </form>
        </Box>
      </Modal>
    </div>
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

export default AddItemButton;
