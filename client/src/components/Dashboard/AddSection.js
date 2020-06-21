import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SECTION } from "../../mutations";

function AddSection({ resume }) {
  const [sectionTitle, setSectionTitle] = useState("");

  const [addSection] = useMutation(ADD_SECTION, {
    variables: {
      title: sectionTitle,
      resume: resume?.id,
      order: resume?.sections.length,
    },
    onCompleted: () => setSectionTitle(""),
    refetchQueries: ["resumeById"],
  });

  const handleAddSection = (e) => {
    e.preventDefault();
    addSection();
  };

  return (
    <div className="add-section">
      <form onSubmit={handleAddSection}>
        <input
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="section title"
        />
        <button>+</button>
      </form>
    </div>
  );
}

export default AddSection;
