import React, { useState, useEffect } from "react";
import axios from "axios";
import Board from "react-trello";

import { API_URL_TASKS } from "../constants";
import CustomCard from "./CustomCard";
import CustomCardLayout from "./CustomCardLayout";

const KanbanBoard = () => {
  const [data, setData] = useState({ lanes: [] });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardLaneId, setNewCardLaneId] = useState(null);
  const colorTitle = {
    red: "urgent",
    orange: "important",
    yellow: "moderate",
    green: "completed",
    purple: "info",
    blue: "optional",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(API_URL_TASKS);
        console.log(result);
        const lanes = [
          {
            id: "todo",
            title: "To Do",
            style: {
              backgroundColor: "#bbdefb",
              margin: "25px",
            },
            cardStyle: { backgroundColor: "#e3f2fd" },
            cards: [],
          },
          {
            id: "doing",
            title: "Doing",
            style: { backgroundColor: "#bbdefb", margin: "25px" },
            cardStyle: { backgroundColor: "#e3f2fd" },
            disallowAddingCard: true,
            cards: [],
          },
          {
            id: "done",
            title: "Done",
            style: { backgroundColor: "#bbdefb", margin: "25px" },
            cardStyle: { backgroundColor: "#e3f2fd" },
            disallowAddingCard: true,
            cards: [],
          },
        ];

        result.data.forEach((task) => {
          const card = {
            id: task._id,
            title: task.title,
            description: task.description,
            label: task.category,
            tags: [
              { title: colorTitle[task.priority], bgcolor: task.priority },
              { title: task.category, bgcolor: "#009688" },
            ],
            deadline: task.deadline,
          };
          lanes.find((lane) => lane.id === task.status).cards.push(card);
        });

        setData({ lanes });
      } catch (error) {
        console.log(error);
        alert("System error – unable to load Kanban board");
      }
    };
    fetchData();
  }, []);

  const handleAddCard = (laneId) => {
    setIsAddingCard(true);
    setNewCardLaneId(laneId);
  };

  // Function to save the new card
  const handleSaveNewCard = (newCard) => {
    const updatedData = { ...data };
    const laneIndex = updatedData.lanes.findIndex(
      (lane) => lane.id === newCardLaneId
    );
    updatedData.lanes[laneIndex].cards.push({
      id: `Card${Date.now()}`, // Create a unique ID for the new card
      ...newCard,
    });

    setData(updatedData);
    setIsAddingCard(false); // Close the form after saving
  };

  // Function to cancel adding the card
  const handleCancelNewCard = () => {
    setIsAddingCard(false);
  };

  // Function to handle card drag between lanes
  const handleDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    console.log("Card moved:", cardId, sourceLaneId, targetLaneId);
  };

  return (
    <Board
      style={{
        backgroundColor: "#fafafa",
        display: "flex",
        justifyContent: "center",
      }}
      data={data}
      draggable
      editable
      customCardLayout
      hideCardDeleteIcon={false}
      addCardLink="Click to add card"
      onLaneAdd={(laneId) => handleAddCard(laneId)}
      laneDraggable={false}
      onCardMoveAcrossLanes={handleDragEnd}
      components={{ Card: CustomCard, NewCardForm: CustomCardLayout }}
    />
  );
};

export default KanbanBoard;
