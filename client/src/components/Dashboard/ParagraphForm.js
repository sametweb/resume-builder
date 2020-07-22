import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_PARAGRAPH } from "../../mutations";

function ParagraphForm({ section }) {
  const [text, setText] = useState("");

  const [createParagraph] = useMutation(ADD_PARAGRAPH);

  const handleSubmit = (e) => {
    e.preventDefault();
    createParagraph({ variables: { text, section: section.id } });
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="paragraph-form"
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

// Create typeDefs for paragraph
// Create resolvers for creating/updating/deleting paragraph

export default ParagraphForm;
