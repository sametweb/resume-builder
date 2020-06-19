import React, { useState, useContext, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import { USER_RESUMES } from "../queries";
import { ADD_RESUME, DELETE_RESUME } from "../mutations";
import { AuthContext } from "../App";
import ResumeCard from "./Dashboard/ResumeCard";

function Dashboard() {
  const [createInput, setCreateInput] = useState("");

  const { user, signIn, signOut } = useContext(AuthContext);

  const [userResumes, { error, data }] = useLazyQuery(USER_RESUMES);
  console.log({ error, data, user });

  const [addResume] = useMutation(ADD_RESUME, {
    variables: { title: createInput, user: user?.email },
    refetchQueries: ["resumes"],
    onCompleted: () => setCreateInput(""),
    onError: (err) => alert(err.message),
  });

  useEffect(() => {
    user?.email && userResumes({ variables: { user: user.email } });
  }, [user]);

  if (!error && !data) return "Loading";

  return (
    <section className="dashboard">
      <div className="content">
        <input
          placeholder="New Resume"
          value={createInput}
          onChange={(e) => setCreateInput(e.target.value)}
        />
        <button onClick={addResume}>Add</button>
        <div className="resumes">
          {data?.userResumes.map((resume) => <ResumeCard resume={resume} />)}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
