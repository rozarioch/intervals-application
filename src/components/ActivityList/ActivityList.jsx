import React, { useState, useEffect } from "react";
import ActivityCard from "../ActivityCard/ActivityCard";
import { ButtonsWrapper, ListWrapper } from "./ActivityList.styles";
import { Button } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ActivityList = ({ list, onAddItem, setIsStarted, isStarted }) => {
  const [activityList, setActivityList] = useState(list);
  const [spokenFlags, setSpokenFlags] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    // Initialize the activity list with remaining time
    setActivityList(
      list.map((item) => ({
        ...item,
        remainingTime: item.seconds,
      }))
    );
    // Initialize spokenFlags to false for each activity
    setSpokenFlags(Array(list.length).fill(false));

    // Fetch available voices
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[1]);
        // setSelectedVoice(availableVoices[15]);
      }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    } else {
      fetchVoices();
    }
  }, [list, selectedVoice]);

  useEffect(() => {
    activityList.forEach((item, index) => {
      if (item.status === "active" && !spokenFlags[index]) {
        const utterance = new SpeechSynthesisUtterance(item.name);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        window.speechSynthesis.speak(utterance);
        setSpokenFlags((prevFlags) => {
          const newFlags = [...prevFlags];
          newFlags[index] = true;
          return newFlags;
        });
      }
    });
  }, [activityList, spokenFlags, selectedVoice]);

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
    setIsStarted(true);
    for (const [index, value] of activityList.entries()) {
      await showMessageWithDelay(value, index);
    }
    setSpokenFlags(Array(activityList.length).fill(false));
  }

  async function onFinishWorkout() {
    setIsStarted(false);
    // for (const [index, value] of activityList.entries()) {
    //   await showMessageWithDelay(value, index);
    // }
    // setSpokenFlags(Array(activityList.length).fill(false));
  }

  return (
    <ListWrapper>
      <h2>Your workout plan</h2>
      {activityList.map((item, index) => (
        <ActivityCard key={index} item={item} />
      ))}
      {isStarted ? (
        <>
          <Button variant="outlined" color="warning" onClick={onFinishWorkout}>
            Pause your workout
          </Button>
          <Button variant="contained" color="error" onClick={onFinishWorkout}>
            Finish your workout
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={onStartWorkout}>
          Start your workout
        </Button>
      )}
    </ListWrapper>
  );
};

export default ActivityList;
