import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { SECTION_BLOCKS } from "../../queries";
import BlockForm from "./BlockForm";

function EditSection(props) {
  const { id } = useParams();
  const history = useHistory();

  const { data } = useQuery(SECTION_BLOCKS, {
    variables: { section: id },
  });

  const [newBlockForm, setNewBlockForm] = useState(false);
  const [editBlockForm, setEditBlockForm] = useState("");

  const toggleNewBlockForm = () => setNewBlockForm(!newBlockForm);
  const toggleEditBlockForm = (id) =>
    setEditBlockForm(editBlockForm === id ? "" : id);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  console.log({ editBlockForm });
  return (
    <div className="edit-section-modal" onClick={() => history.goBack()}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>{data?.sectionBlocks.section}</h2>
          <button onClick={toggleNewBlockForm}>
            {newBlockForm ? "Cancel" : "New Block"}
          </button>
        </div>
        <div className="section">
          {newBlockForm && (
            <BlockForm
              blocks={data?.sectionBlocks.blocks}
              toggleNewBlockForm={toggleNewBlockForm}
            />
          )}
          <div className="blocks">
            {data?.sectionBlocks.blocks.map((block) => (
              <div className="block" key={block.id}>
                <div className="actions">
                  <span
                    role="img"
                    aria-label="edit block"
                    onClick={() => toggleEditBlockForm(block.id)}
                  >
                    📝
                  </span>
                  <span role="img" aria-label="delete block">
                    ❌
                  </span>
                </div>
                {editBlockForm === block.id ? (
                  <BlockForm
                    blockToEdit={block}
                    blocks={data?.sectionBlocks.blocks}
                    toggleEditBlockForm={toggleEditBlockForm}
                  />
                ) : (
                  <div className="block-content">
                    <div className="title">
                      <h4>{block.title1}</h4>
                      <h4>{block.title2}</h4>
                    </div>
                    <div className="subtitle">
                      <h4>{block.subtitle1}</h4>
                      <h4>{block.subtitle2}</h4>
                    </div>
                  </div>
                )}
                <ul className="bullets">
                  {block.bullets.map((bullet) => (
                    <li>{bullet.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <span
          role="img"
          aria-label="close edit section"
          className="close"
          onClick={() => history.goBack()}
        >
          ✖
        </span>
      </div>
    </div>
  );
}

export default EditSection;
