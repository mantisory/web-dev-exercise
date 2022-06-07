import React, { useState } from "react";

export default function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { label, onChange, id, htmlFor, errorMessage, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <>
      {inputProps.type === "checkbox" ? (
        <div className="form__checkbox-container">
          <label htmlFor={htmlFor} className="form__checkbox--label">
            {label}
            <input
              className="form__checkbox"
              {...inputProps}
              id={id}
              onChange={onChange}
            />
            <span className="form__custom-checkbox"></span>
          </label>
        </div>
      ) : (
        <div className="form__input-container">
          <label htmlFor={htmlFor} className="form__input--label">
            {label}
            <input
              {...inputProps}
              className="form__input"
              onChange={onChange}
              onBlur={handleFocus}
              required
              focused={focused.toString()}
            />{" "}
            <span className="error-span">{errorMessage}</span>
          </label>
        </div>
      )}
    </>
  );
}
