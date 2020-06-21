import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import { GET_RESUME_BY_ID } from "../../queries";
import { AuthContext } from "../../App";
import { DELETE_SECTION, UPDATE_SECTION_ORDER } from "../../mutations";
import AddSection from "./AddSection";

function EditResume() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [dragged, setDragged] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [droppedOn, setDroppedOn] = useState(null);
  const [resumeById, { data }] = useLazyQuery(GET_RESUME_BY_ID, {
    variables: { id, user: user?.email },
  });

  const [deleteSection] = useMutation(DELETE_SECTION, {
    refetchQueries: ["resumeById"],
  });

  const [updateSectionOrder] = useMutation(UPDATE_SECTION_ORDER, {
    refetchQueries: ["resumeById"],
  });

  useEffect(() => {
    user?.email && resumeById();
  }, [user, resumeById]);

  useEffect(() => {
    if (droppedOn !== null && dragged?.id !== droppedOn?.id) {
      updateSectionOrder({
        variables: {
          id: dragged?.id,
          resume_id: id,
          order: dragged?.order,
          new_order: droppedOn?.order,
        },
      });
      setDragged(null);
      setDraggedOver(null);
      setDroppedOn(null);
    } else if (dragged?.id === droppedOn?.id) {
      setDragged(null);
      setDraggedOver(null);
      setDroppedOn(null);
    }
  }, [dragged, droppedOn]);

  return (
    <div className="editor">
      <div className="header">
        <h2 className="title">{data?.resumeById.title}</h2>
      </div>
      <div className="edit-resume">
        <div className="left-sidebar">
          <AddSection resume={data?.resumeById} />
        </div>
        <div className="paper">
          {data?.resumeById.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div
                className="section"
                draggable
                onDragStart={(e) => {
                  setDragged({ id: section.id, order: section.order });
                }}
                onDragOver={(e) => {
                  setDraggedOver({ id: section.id, order: section.order });
                  e.preventDefault();
                }}
                onDrop={(e) => {
                  setDroppedOn({ id: section.id, order: section.order });
                }}
                key={section.id}
              >
                <h3
                  className={
                    draggedOver?.id === section.id ? "dragged-over" : ""
                  }
                >
                  {section.title} (Order: {section.order})
                  <span
                    role="img"
                    aria-label="delete section"
                    onClick={() =>
                      deleteSection({ variables: { id: section.id } })
                    }
                  >
                    ⛔
                  </span>
                </h3>
              </div>
            ))}
        </div>
        <div className="right-sidebar">Right</div>
      </div>
    </div>
  );
}

export default EditResume;
