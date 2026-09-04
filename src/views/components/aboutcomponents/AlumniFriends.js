import React from "react";

const AlumniFriends = ({ alumni }) => {
  if (!alumni) return null;
  return (
    <div className="section mb-4">
      <h2 className="h5">Alumni & Friends</h2>
      <ul>
        {alumni.network_features.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
     </div>
  );
};

export default AlumniFriends;