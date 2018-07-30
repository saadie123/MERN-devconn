import React from "react";
import classnames from "classnames";

const SelectListGroup = props => {
  const selectOptions = props.options.map(opt => (
    <option key={opt.label} value={opt.value}>
      {opt.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": props.error
        })}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
      >
        {selectOptions}
      </select>
      {props.info && (
        <small className="form-text text-muted">{props.info}</small>
      )}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
};

export default SelectListGroup;
