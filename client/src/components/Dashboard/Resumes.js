import React, { useEffect, useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import ResumeCard from "./ResumeCard";
import { AuthContext } from "../../App";
import { USER_RESUMES } from "../../queries";
import AddResume from "./AddResume";

function Resumes() {
  const { user } = useContext(AuthContext);

  const [userResumes, { data }] = useLazyQuery(USER_RESUMES);

  console.log({ data });

  useEffect(() => {
    user?.email && userResumes({ variables: { user: user.email } });
  }, [user, userResumes]);

  return (
    <div className="content">
      <AddResume />
      <div className="resumes">
        {data?.userResumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
}

export default Resumes;
