import React from "react";
import classnames from "classnames";

const TextFieldGroup = props => {
  return (
    <div className="form-group">
      <input
        type={props.type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        disabled={props.disabled}
      />
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
