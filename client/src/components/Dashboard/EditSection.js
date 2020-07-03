import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { SECTION_BLOCKS } from "../../queries";
import { CREATE_BLOCK } from "../../mutations";

function EditSection(props) {
  const { id } = useParams();
  const history = useHistory();

  const { data } = useQuery(SECTION_BLOCKS, {
    variables: { section: id },
  });

  const [newBlock, setNewBlock] = useState({
    title1: "",
    title2: "",
    subtitle1: "",
    subtitle2: "",
    order: 0,
    section: id,
  });

  const [createBlock] = useMutation(CREATE_BLOCK, {
    variables: { ...newBlock },
    refetchQueries: ["sectionBlocks"],
    onCompleted: () => console.log("completed"),
    onError: () => console.log("error"),
  });

  const [newBlockForm, setNewBlockForm] = useState(false);

  const toggleNewBlockForm = () => setNewBlockForm(!newBlockForm);

  const onBlockFormChange = (e) =>
    setNewBlock({ ...newBlock, [e.target.name]: e.target.value });

  const onNewBlockSubmit = (e) => {
    e.preventDefault();
    if (newBlock.title1) {
      createBlock();
      setNewBlockForm(false);
    } else {
      alert("You must enter a title");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {
    setNewBlock({ ...newBlock, order: data?.sectionBlocks.blocks.length + 1 });
  }, [data]);

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
            <form className="new-block-form" onSubmit={onNewBlockSubmit}>
              <div className="title">
                <input
                  required
                  minLength={10}
                  name="title1"
                  value={newBlock.title1}
                  onChange={onBlockFormChange}
                  placeholder="Title"
                />
                <input
                  name="title2"
                  value={newBlock.title2}
                  onChange={onBlockFormChange}
                  placeholder="Location"
                />
              </div>
              <div className="subtitle">
                <input
                  name="subtitle1"
                  value={newBlock.subtitle1}
                  onChange={onBlockFormChange}
                  placeholder="Subtitle"
                />
                <input
                  name="subtitle2"
                  value={newBlock.subtitle2}
                  onChange={onBlockFormChange}
                  placeholder="Years"
                />
              </div>
              <button>Save</button>
            </form>
          )}
          <div className="blocks">
            {data?.sectionBlocks.blocks.map((block) => (
              <div className="block" key={block.id}>
                <div className="title">
                  <h4>{block.title1}</h4>
                  <h4>{block.title2}</h4>
                </div>
                <div className="subtitle">
                  <h4>{block.subtitle1}</h4>
                  <h4>{block.subtitle2}</h4>
                </div>
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
