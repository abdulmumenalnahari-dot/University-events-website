import React from "react";
import Kalendr from "../../pages/kalendr"; // افترض أن لديك هذا الملف

const EventTimeline = ({ events }) => {
  if (!events) return null;

  return (
    <div className="section mb-4">
      <h2 className="h5">Event Timeline (Monthly Calendar)</h2>
      <Kalendr events={events} />
    </div>
  );
};

export default EventTimeline;