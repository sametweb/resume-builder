import React from "react";
import resumeImage from "../img/resume.png";

function Home(props) {
  return (
    <section className="content">
      <div className="home">
        <img src={resumeImage} />
        <h1>Welcome!</h1>
        <p>
          Résumé Builder is an online tool for creating resume templates with a
          piece-to-whole approach.
        </p>
        <p>
          You may craft your ultimate resume and select what pieces to show
          everytime you export to PDF!
        </p>
        <p>Here is how it works:</p>
        <ul>
          <li>Fill out all the information you might have in your resume</li>
          <li>Select what you want to show</li>
          <li>Export to PDF!</li>
        </ul>
        <p>No more editing and re-saving tens of documents!</p>
      </div>
    </section>
  );
}

export default Home;
