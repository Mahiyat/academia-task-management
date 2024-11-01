import React from "react";
import { Card, CardContent, Typography, Chip, Grid2 } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PropTypes from "prop-types";

const CustomCard = ({ title, description, tags, deadline }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, textAlign: "justify" }}>
      <CardContent>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Grid2 container alignItems="center" sx={{ marginTop: 1 }}>
          <Grid2 item>
            <AccessTimeIcon fontSize="small" sx={{ marginRight: 1 }} />
          </Grid2>
          <Grid2 item>{deadline ? formatDate(deadline) : "Not set"}</Grid2>
        </Grid2>
        <div style={{ marginTop: 10 }}>
          {tags &&
            tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag.title}
                sx={{
                  backgroundColor: tag.bgcolor,
                  color: "white",
                  marginRight: 1,
                }}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.array,
  deadline: PropTypes.string,
};

export default CustomCard;
