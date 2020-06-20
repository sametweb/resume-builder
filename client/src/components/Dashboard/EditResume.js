import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import { GET_RESUME_BY_ID } from "../../queries";
import { AuthContext } from "../../App";
import { UPDATE_RESUME } from "../../mutations";

function EditResume() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [resumeTitle, setResumeTitle] = useState("");

  const [resumeById, { loading, error, data }] = useLazyQuery(
    GET_RESUME_BY_ID,
    { variables: { id, user: user?.email } }
  );

  const [updateResume] = useMutation(UPDATE_RESUME, {
    variables: { id, title: resumeTitle },
    refetchQueries: ["resumeById"],
  });

  useEffect(() => {
    user?.email && resumeById();
  }, [user]);

  useEffect(() => {
    data?.resumeById.title && setResumeTitle(data.resumeById.title);
  }, [data]);

  return (
    <div className="editor">
      <div className="header">
        <input
          className="title"
          value={resumeTitle}
          onBlur={updateResume}
          onChange={(e) => setResumeTitle(e.target.value)}
        />
      </div>
      <div className="edit-resume">
        <div className="left-sidebar">Left</div>
        <div className="paper">
          <br />
          {data?.resumeById.sections.map((section) => (
            <p key={section.id}>{section.title}</p>
          ))}
        </div>
        <div className="right-sidebar">Right</div>
      </div>
    </div>
  );
}

export default EditResume;
