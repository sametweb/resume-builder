import React, { useState, useContext } from "react";
import { ADD_RESUME } from "../../mutations";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../App";

function AddResume() {
  const [createInput, setCreateInput] = useState("");
  const { user } = useContext(AuthContext);

  const [addResume] = useMutation(ADD_RESUME, {
    variables: { title: createInput, user: user?.email },
    refetchQueries: ["resumes"],
    onCompleted: () => setCreateInput(""),
    onError: (err) => alert(err.message),
  });

  const handleAddResume = (e) => {
    e.preventDefault();
    addResume();
  };

  return (
    <form className="resume-form" onSubmit={handleAddResume}>
      <input
        placeholder="New Résumé"
        value={createInput}
        onChange={(e) => setCreateInput(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

export default AddResume;
