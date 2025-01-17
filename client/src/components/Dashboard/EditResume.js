import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useHistory, Route } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import { GET_RESUME_BY_ID } from "../../queries";
import { AuthContext } from "../../App";
import { DELETE_SECTION, UPDATE_SECTION_ORDER } from "../../mutations";
import AddSection from "./AddSection";
import EditSection from "./EditSection";

function EditResume() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [dragged, setDragged] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [droppedOn, setDroppedOn] = useState(null);
  const [resumeById, { data }] = useLazyQuery(GET_RESUME_BY_ID, {
    variables: { id, user: user?.email },
  });

  const { pathname } = useLocation();
  const history = useHistory();

  const [deleteSection] = useMutation(DELETE_SECTION, {
    refetchQueries: ["resumeById"],
  });

  const [updateSectionOrder] = useMutation(UPDATE_SECTION_ORDER, {
    refetchQueries: ["resumeById"],
  });

  const resetDrag = () => {
    setDragged(null);
    setDraggedOver(null);
    setDroppedOn(null);
  };

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
      resetDrag();
    } else if (dragged?.id === droppedOn?.id) {
      resetDrag();
    }
  }, [dragged, droppedOn, updateSectionOrder, id]);

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
          <Route
            path="/dashboard/edit-resume/:id/edit-section/:id"
            component={EditSection}
          />
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
                onDragEnd={(e) => {
                  if (droppedOn === null) {
                    setDraggedOver(null);
                  }
                }}
                key={section.id}
              >
                <h3
                  className={
                    draggedOver?.id === section.id ? "dragged-over" : ""
                  }
                >
                  {section.title}
                  <span className="section-actions">
                    <span
                      role="img"
                      aria-label="edit section title"
                      onClick={() =>
                        history.push(`${pathname}/edit-section/${section.id}`)
                      }
                    >
                      📝
                    </span>
                    <span
                      role="img"
                      aria-label="delete section"
                      onClick={() =>
                        deleteSection({ variables: { id: section.id } })
                      }
                    >
                      ⛔
                    </span>
                  </span>
                </h3>
                {section.blocks.map((block) => (
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
                        <li key={bullet.id}>{bullet.text}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className="right-sidebar">Right</div>
      </div>
    </div>
  );
}

export default EditResume;
