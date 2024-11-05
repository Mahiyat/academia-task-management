import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  CircularProgress,
} from "@mui/material";
import MuiMarkdown from 'mui-markdown';
import { API_URL_WORKFLOW } from "../constants";

const drawerWidth = 500;

const WorkflowDrawer = ({ open, onClose }) => {
  const [responseText, setResponseText] = useState("");
  const [doneState, setDoneState] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGeneration = async () => {
    try {
      setResponseText("");
      setLoading(true);
      const response = await fetch(API_URL_WORKFLOW, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      const loopRunner = true;
      let accumulatedResponse = "";
      console.log("Entering loop!");
      while (loopRunner) {
        setLoading(false);
        const { value, done: isDone } = await reader.read();
        let done = isDone;
        setDoneState(done);
        console.log(value);

        if (done) {
          break;
        }
        const chunkText = decoder.decode(value, { stream: true });
        accumulatedResponse += chunkText;
        const splitChunks = accumulatedResponse
          .split("\n")
          .filter((line) => line);
        accumulatedResponse = "";

        // eslint-disable-next-line no-loop-func
        splitChunks.forEach((chunk) => {
          try {
            const parsedChunk = JSON.parse(chunk);
            if (parsedChunk.response) {
              setResponseText((prev) => prev + parsedChunk.response);
            }
          } catch (error) {
            accumulatedResponse += chunk;
          }
        });
      }
    } catch (error) {
      console.error("Error during generation:", error);
      setResponseText("Failed to generate workflow suggestions.");
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">
          Stuck with tons of work? Get an optimal workflow suggestion
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: "16px" }}
          onClick={handleGeneration}
        >
          Generate
        </Button>
        <Box sx={{ marginTop: "16px", width: "100%", textAlign: "center" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="body2" style={{ textAlign: "justify" }}>
              <MuiMarkdown>{responseText}</MuiMarkdown>
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default WorkflowDrawer;
