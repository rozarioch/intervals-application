import React, { useEffect, useState } from "react";
import { ActivityName, ActivityTime, CardWrapper } from "./ActivityCard.styles";

const ActivityCard = ({ item }) => {
  const minutes = Math.floor(item.remainingTime / 60);
  const seconds = item.remainingTime % 60;

  return (
    <CardWrapper
      fullTime={item.seconds}
      timeLeft={item.remainingTime}
      status={item.status}
      percentage={(item.remainingTime / item.seconds) * 100}
    >
      <ActivityName>{item.name}</ActivityName>
      <ActivityTime>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </ActivityTime>
      {/* <div>Status: {item.status}</div> */}
    </CardWrapper>
  );
};

export default ActivityCard;
