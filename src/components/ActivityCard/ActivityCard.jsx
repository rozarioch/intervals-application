import React, { useEffect, useState } from "react";
import { ActivityName, CardWrapper } from "./ActivityCard.styles";

const ActivityCard = ({ item }) => {
  const minutes = Math.floor(item.remainingTime / 60);
  const seconds = item.remainingTime % 60;

  return (
    <CardWrapper>
      <ActivityName>{item.name}</ActivityName>
      <p>
        Remaining Time: {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </p>
      <p>Status: {item.status}</p>
    </CardWrapper>
  );
};

export default ActivityCard;
