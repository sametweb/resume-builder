import React from "react";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_RESUME } from "../../mutations";

function ResumeCard({ resume }) {
  const [deleteResume] = useMutation(DELETE_RESUME, {
    refetchQueries: ["resumes"],
  });
  const { id, title } = resume;

  return (
    <div key={id} className="card">
      <span onClick={() => deleteResume({ variables: { id } })}>⛔</span>
      {title}
    </div>
  );
}

export default ResumeCard;
