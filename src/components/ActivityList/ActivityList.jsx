import React, { useState, useEffect } from "react";
import ActivityCard from "../ActivityCard/ActivityCard";
import { ButtonsWrapper, ListWrapper } from "./ActivityList.styles";

const ActivityList = ({ list, onAddItem }) => {
  const [activityList, setActivityList] = useState(list);
  const [spokenFlags, setSpokenFlags] = useState([]);

  useEffect(() => {
    setActivityList(
      list.map((item) => ({ ...item, remainingTime: item.seconds }))
    );
    // Initialize spokenFlags to false for each activity
    setSpokenFlags(Array(list.length).fill(false));
  }, [list]);

  useEffect(() => {
    activityList.forEach((item, index) => {
      const minutes = Math.floor(item.remainingTime / 60);
      const seconds = item.remainingTime % 60;
      if (item.status === "active" && !spokenFlags[index]) {
        const utterance = new SpeechSynthesisUtterance(
          `${item.name} for ${minutes} minutes and ${seconds} seconds`
        );
        window.speechSynthesis.speak(utterance);
        setSpokenFlags((prevFlags) => {
          const newFlags = [...prevFlags];
          newFlags[index] = true;
          return newFlags;
        });
      }
    });
  }, [activityList, spokenFlags]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivityList((prevItems) =>
        prevItems.map((item) =>
          item.status === "active" && item.remainingTime > 0
            ? { ...item, remainingTime: item.remainingTime - 1 }
            : item
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [activityList]);

  function showMessageWithDelay(item, index) {
    return new Promise((resolve) => {
      setActivityList((prevItems) =>
        prevItems.map((item, indexItem) => ({
          ...item,
          status: index === indexItem ? "active" : item.status,
        }))
      );
      setTimeout(() => {
        setActivityList((prevItems) =>
          prevItems.map((item, indexItem) => ({
            ...item,
            status: index === indexItem ? "done" : item.status,
            remainingTime: index === indexItem ? 0 : item.remainingTime, // Set remaining time to 0 when activity is done
          }))
        );
        resolve();
      }, item.seconds * 1000);
    });
  }

  async function onStartWorkout() {
    for (const [index, value] of activityList.entries()) {
      await showMessageWithDelay(value, index);
    }
    // Reset spokenFlags after workout is completed
    setSpokenFlags(Array(activityList.length).fill(false));
  }

  return (
    <ListWrapper>
      <h2>Your workout plan</h2>
      {activityList.map((item, index) => (
        <ActivityCard key={index} item={item} />
      ))}

      <ButtonsWrapper>
        <button onClick={onStartWorkout}>Start workout</button>
      </ButtonsWrapper>
    </ListWrapper>
  );
};

export default ActivityList;
