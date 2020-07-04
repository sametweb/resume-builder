import React, { useState, useEffect } from "react";
import { CREATE_BLOCK, UPDATE_BLOCK } from "../../mutations";
import { useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

function BlockForm({
  blockToEdit,
  toggleNewBlockForm,
  toggleEditBlockForm,
  blocks,
}) {
  const { id } = useParams();

  const [newBlock, setNewBlock] = useState({
    title1: "",
    title2: "",
    subtitle1: "",
    subtitle2: "",
    order: 0,
    section: id,
  });

  console.log({ newBlock });

  const [createBlock] = useMutation(CREATE_BLOCK, {
    variables: { ...newBlock },
    refetchQueries: ["sectionBlocks", "resumeById"],
    onCompleted: () => console.log("completed"),
    onError: () => console.log("error"),
  });

  const [updateBlock] = useMutation(UPDATE_BLOCK, {
    variables: { ...newBlock, order: undefined, section: undefined },
    refetchQueries: ["sectionBlocks", "resumeById"],
    onCompleted: () => console.log("completed"),
    onError: () => console.log("error"),
  });

  const onBlockFormChange = (e) =>
    setNewBlock({ ...newBlock, [e.target.name]: e.target.value });

  const onNewBlockSubmit = (e) => {
    e.preventDefault();

    if (blockToEdit) {
      console.log("update called");
      updateBlock();
      toggleEditBlockForm(blockToEdit.id);
    } else {
      console.log("create called");
      createBlock();
      toggleNewBlockForm();
    }
  };

  useEffect(() => {
    setNewBlock((n) => {
      return {
        ...n,
        order: blocks.length + 1,
      };
    });
  }, [blocks]);

  useEffect(() => {
    blockToEdit && setNewBlock({ ...blockToEdit });
  }, [blockToEdit]);

  return (
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
      {blockToEdit && (
        <button onClick={() => toggleEditBlockForm(blockToEdit.id)}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default BlockForm;
