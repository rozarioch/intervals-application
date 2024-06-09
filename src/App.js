import React, { useState, useEffect } from "react";
import Activity from "./Activity";
import styles from "./App.module.css";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import ActivityList from "./components/ActivityList/ActivityList";
import TextToSpeech from "./components/TextToSpeech";

function App() {
  const [activityList, setActivityList] = useState([]);

  const onAddItem = (props) => {
    setActivityList((prev) => [
      ...prev,
      { name: props.name, seconds: props.seconds },
    ]);
  };

  return (
    <div className={styles.root}>
      <h1>Activity Timer App</h1>
      <ActivityForm onAddItem={onAddItem} />
      <ActivityList list={activityList} />
      {/* <TextToSpeech text={"asd"} /> */}
    </div>
  );
}

export default App;
