import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Chip,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { AccessTime as AccessTimeIcon } from "@mui/icons-material";
import { API_URL_TASKS } from "../constants";
import axios from "axios";

const colorTitle = {
    red: "urgent",
    orange: "important",
    yellow: "moderate",
    green: "completed",
    purple: "info",
    blue: "optional",
  };

const CustomCardLayout = ({
  onAdd,
  onCancel,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!title) return; 
    const newCard = {
      title,
      description,
      deadline,
      tags: [{title: colorTitle[priority], bgcolor: priority}, {title: category, bgcolor: '#009688'}],
    };
    onAdd(newCard); 
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, textAlign: "justify" }}>
      <CardContent sx={{display: "flex", flexDirection: "column"}}>
        {/* Title */}
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Description */}
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
          sx={{ marginTop: 2 }}
        />
        {/* Deadline */}
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <AccessTimeIcon sx={{ fontSize: 18, marginRight: 1 }} />
          <TextField
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            sx={{ width: "150px" }}
          />
        </Box>
        {/* Tags */}
        <TextField
        name="category"
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        select
      >
        <MenuItem value="Class">Class</MenuItem>
        <MenuItem value="Tutorial">Tutorial</MenuItem>
        <MenuItem value="Others">Others</MenuItem>
      </TextField>
      <TextField
        name="priority"
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        select
      >
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="orange">Orange</MenuItem>
        <MenuItem value="yellow">Yellow</MenuItem>
        <MenuItem value="green">Green</MenuItem>
        <MenuItem value="purple">Purple</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
      </TextField>
        {/* Save and Cancel Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button onClick={onCancel} color="secondary" sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCardLayout;
