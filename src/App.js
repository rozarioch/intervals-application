import React, { useState, useEffect } from "react";
import Activity from "./Activity";
import styles from "./App.module.css";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import ActivityList from "./components/ActivityList/ActivityList";

function App() {
  const [activityList, setActivityList] = useState([]);

  const [isStarted, setIsStarted] = useState(false);

  const onAddItem = (props) => {
    setActivityList((prev) => [
      ...prev,
      { name: props.name, seconds: props.seconds },
    ]);
  };

  return (
    <div className={styles.root}>
      <h1>Activity Timer App</h1>
      <ActivityForm onAddItem={onAddItem} isStarted={isStarted} />
      {activityList.length !== 0 && (
        <ActivityList
          list={activityList}
          setIsStarted={setIsStarted}
          isStarted={isStarted}
        />
      )}
    </div>
  );
}

export default App;
