import React, { useEffect, useState } from "react";
import { ActivityName, ActivityTime, CardWrapper } from "./ActivityCard.styles";

const ActivityCard = ({ item }) => {
  // const totalMinutes = Math.floor(item.seconds / 60);
  // const totalSeconds = item.seconds % 60;

  // const minutes = totalMinutes - Math.floor(item.remainingTime / 60);
  // const seconds = totalSeconds - (item.remainingTime % 60);

  const secondsToGo = item.seconds % 60;
  const minutesToGo = Math.floor(item.seconds / 60);

  const doneTime = item.seconds - item.remainingTime;
  const secondsDone = doneTime % 60;
  const minutesDone = Math.floor(doneTime / 60);

  return (
    <CardWrapper
      fullTime={item.seconds}
      timeLeft={item.remainingTime}
      status={item.status}
      percentage={(item.remainingTime / item.seconds) * 100}
    >
      <ActivityName>{item.name}</ActivityName>
      <ActivityTime>
        {String(minutesDone).padStart(2, "0")}:
        {String(secondsDone).padStart(2, "0")}/
        {String(minutesToGo).padStart(2, "0")}:
        {String(secondsToGo).padStart(2, "0")}
      </ActivityTime>
      {/* <div>Status: {item.status}</div> */}
    </CardWrapper>
  );
};

export default ActivityCard;
