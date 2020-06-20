import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { GET_RESUME_BY_ID } from "../../queries";
import { AuthContext } from "../../App";

function EditResume() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_RESUME_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    user?.email && console.log("log here");
  }, [user]);

  return (
    <div className="editor">
      <div className="edit-resume">
        <div className="left-sidebar">Left</div>
        <div className="paper">{data?.resumeById.title}</div>
        <div className="right-sidebar">Right</div>
      </div>
    </div>
  );
}

export default EditResume;
