import React from "react";
import { useParams } from "react-router-dom";

function EditSection(props) {
  const { id } = useParams();

  return <div className="edit-section-modal">Edit Section {id}</div>;
}

export default EditSection;
