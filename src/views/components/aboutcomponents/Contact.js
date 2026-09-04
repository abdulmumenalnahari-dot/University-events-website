import React from "react";

const Contact = ({ contacts }) => {
  if (!contacts) return null;
  return (
    <div className="section mb-4">
      <h2 className="h5">Contact</h2>
      <p>
        <strong>Email:</strong> {contacts.email}
      </p>
      <p>
        <strong>Phone:</strong> {contacts.phone}
      </p>
      <p>
        <strong>Address:</strong> {contacts.address}
      </p>
      {contacts.notes && <p className="small text-muted">{contacts.notes}</p>}
    </div>
  );
};

export default Contact;