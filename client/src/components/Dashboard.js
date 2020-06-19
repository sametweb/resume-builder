import React, { useState, useContext, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import { USER_RESUMES } from "../queries";
import { ADD_RESUME, DELETE_RESUME } from "../mutations";
import { AuthContext } from "../App";

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

  const [deleteResume] = useMutation(DELETE_RESUME, {
    refetchQueries: ["resumes"],
  });

  useEffect(() => {
    user?.email &&
      userResumes({
        variables: { user: user.email },
      });
  }, [user]);

  if (!error && !data) return "Loading";

  return (
    <div>
      <input
        placeholder="New Resume"
        value={createInput}
        onChange={(e) => setCreateInput(e.target.value)}
      />
      <button onClick={addResume}>Add</button>
      {data?.userResumes.map(({ id, title }) => (
        <p key={id}>
          <span onClick={() => deleteResume({ variables: { id } })}>⛔</span>
          {title}
        </p>
      ))}
    </div>
  );
}

export default Dashboard;
