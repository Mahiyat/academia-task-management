import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";

const drawerWidth = 250;

const WorkflowDrawer = ({ open, onClose }) => {
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
        <Typography variant="body2">
          Stuck with tons of work? Get an optimal workflow suggestion
        </Typography>
        <Button variant="contained" sx={{ marginTop: "16px" }}>
          Generate
        </Button>
      </Box>
    </Drawer>
  );
};

export default WorkflowDrawer;
