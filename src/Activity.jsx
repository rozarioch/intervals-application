import React from "react";

function Activity({ activity, isActive }) {
  return (
    <div className={`activity ${isActive ? "active" : ""}`}>
      <h2>{activity.name}</h2>
      <p>Time Remaining: {activity.duration}s</p>
      {isActive && <span className="label">Active</span>}
    </div>
  );
}

export default Activity;
