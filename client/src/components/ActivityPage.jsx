import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import KanbanBoard from "./KanbanBoard";
import WorkflowDrawer from "./WorkflowDrawer";

export default function ActivityPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="h4">Academic Management System</Typography>
      <KanbanBoard />
      <IconButton
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Right Collapsible Drawer */}
      <WorkflowDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Box>
  );
}
