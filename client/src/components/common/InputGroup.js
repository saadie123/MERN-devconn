import React from "react";
import classnames from "classnames";

const InputGroup = props => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <i className={props.icon} />
        </div>
      </div>
      <input
        type={props.type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
      />
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};
InputGroup.defaultProps = { type: "text" };

export default InputGroup;
