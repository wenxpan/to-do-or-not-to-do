import React from "react"

const TaskFieldRadio = ({ props }) => {
  const { area, handleChange, editing, editedValue, initialValue, heading } =
    props
  if (!editing) {
    // view mode
    return (
      <p>
        {heading}: {initialValue ? "Yes" : "No"}
      </p>
    )
  } else {
    // edit mode
    return (
      <>
        <p>{heading}:</p>
        <label htmlFor={`${area}-yes`}>Yes</label>
        <input
          checked={editedValue}
          type="radio"
          name={area}
          id={`${area}-yes`}
          onChange={() => handleChange(area, true)}
        />
        <label htmlFor={`${area}-no`}>No</label>
        <input
          checked={!editedValue}
          type="radio"
          name={area}
          id={`${area}-no`}
          onChange={() => handleChange(area, false)}
        />
      </>
    )
  }
}

export default TaskFieldRadio
