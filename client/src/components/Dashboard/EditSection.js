import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { SECTION_BLOCKS, SECTION_PARAGRAPH } from "../../queries";
import { DELETE_BLOCK, ADD_BULLET } from "../../mutations";
import BlockForm from "./BlockForm";
import ParagraphForm from "./ParagraphForm";

function EditSection(props) {
  const { id } = useParams();
  const history = useHistory();

  const { data } = useQuery(SECTION_BLOCKS, {
    variables: { section: id },
  });

  const { data: paragraphData } = useQuery(SECTION_PARAGRAPH, {
    variables: { section: id },
  });

  const [newBlockForm, setNewBlockForm] = useState(false);
  const [editBlockForm, setEditBlockForm] = useState("");
  const [newParagraphForm, setNewParagraphForm] = useState(false);
  const [newBulletForm, setNewBulletForm] = useState("");

  const [bulletInput, setBulletInput] = useState("");

  const onBulletInputChange = (e) => setBulletInput(e.target.value);

  const onBulletInputSubmit = (e) => {
    e.preventDefault();
    createBullet({
      variables: {
        text: bulletInput,
        block: newBulletForm,
        order: parseInt(e.target.order.value),
      },
    });
  };

  const [createBullet] = useMutation(ADD_BULLET, {
    refetchQueries: ["sectionBlocks", "resumeById"],
    onCompleted: () => setBulletInput(""),
  });

  const toggleNewBlockForm = () => setNewBlockForm(!newBlockForm);

  const toggleNewParagraphForm = () => setNewParagraphForm(!newParagraphForm);

  const toggleEditBlockForm = (id) =>
    setEditBlockForm(editBlockForm === id ? "" : id);

  const [deleteBlock] = useMutation(DELETE_BLOCK, {
    refetchQueries: ["sectionBlocks", "resumeById"],
    onCompleted: () => console.log("completed"),
    onError: () => console.log("error"),
  });
  const toggleNewBulletForm = (id) =>
    setNewBulletForm(newBulletForm === id ? "" : id);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="edit-section-modal" onClick={() => history.goBack()}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>{data?.sectionBlocks.section.title}</h2>
          <button onClick={toggleNewBlockForm}>
            {newBlockForm ? "Cancel" : "New Block"}
          </button>
          <button onClick={toggleNewParagraphForm}>
            {newParagraphForm ? "Cancel" : "New Paragraph"}
          </button>
        </div>
        <div className="section">
          {newBlockForm && (
            <BlockForm
              blocks={data?.sectionBlocks.blocks}
              toggleNewBlockForm={toggleNewBlockForm}
            />
          )}
          {newParagraphForm && (
            <ParagraphForm
              section={data?.sectionBlocks.section}
              toggle={toggleNewParagraphForm}
            />
          )}
          {paragraphData?.sectionParagraph ? (
            <p>{paragraphData.sectionParagraph.text}</p>
          ) : (
            "Show blocks"
          )}
          <div className="blocks">
            {data?.sectionBlocks.blocks.map((block) => (
              <div className="block" key={block.id}>
                <div className="actions">
                  <span
                    role="img"
                    aria-label="add bullets under block"
                    onClick={() => toggleNewBulletForm(block.id)}
                  >
                    ➕
                  </span>
                  <span
                    role="img"
                    aria-label="edit block"
                    onClick={() => toggleEditBlockForm(block.id)}
                  >
                    ✏️
                  </span>
                  <span
                    role="img"
                    aria-label="delete block"
                    onClick={() => deleteBlock({ variables: { id: block.id } })}
                  >
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
                  {newBulletForm === block.id && (
                    <li className="bullet-form">
                      <form onSubmit={onBulletInputSubmit}>
                        <input
                          required
                          minLength={10}
                          value={bulletInput}
                          onChange={onBulletInputChange}
                          placeholder="Add New Bullet"
                        />
                        <input
                          name="order"
                          hidden
                          onChange={() => {}}
                          value={
                            data?.sectionBlocks.blocks.find(
                              (b) => b.id === newBulletForm
                            ).bullets.length
                          }
                        />
                        <button>Add</button>
                        <button onClick={() => setNewBulletForm("")}>
                          Cancel
                        </button>
                      </form>
                    </li>
                  )}
                  {block.bullets
                    .sort((a, b) => a.order - b.order)
                    .map((bullet) => (
                      <li key={bullet.id}>{bullet.text}</li>
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
