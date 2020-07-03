import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_RESUME } from "../../mutations";

function ResumeCard({ resume }) {
  const [deleteResume] = useMutation(DELETE_RESUME, {
    refetchQueries: ["resumes"],
  });
  const { id, title } = resume;

  return (
    <Link to={`/dashboard/edit-resume/${id}`}>
      <div key={id} className="card">
        <div className="header">
          <h4>{title}</h4>
          <span
            onClick={(e) => {
              e.preventDefault();
              deleteResume({ variables: { id } });
            }}
          >
            <span role="img" aria-label="delete">
              ⛔
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ResumeCard;
