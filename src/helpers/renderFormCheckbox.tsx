import React from 'react';


interface metaDetails {
  touched: any;
  error: string;
  warning: string;
}
interface formCheckbox {
  input: any;
  label: string;
  id: any;
  meta: metaDetails;
}

const renderFormCheckbox = (props: formCheckbox): JSX.Element => {
  const {
    input,
    label,
    id,
    // value,
    meta: { touched, error, warning },
  } = props;
  return (
    <div className="form-check form-check-inline">
      <input
        {...input}
        {...props}
        className="form-check-input"
        type="checkbox"
        // value={value}
        // id={id}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
      {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span>{warning}</span>))}
    </div>
  );
};
export default renderFormCheckbox;
