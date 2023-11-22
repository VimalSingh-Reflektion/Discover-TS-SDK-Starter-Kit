import React from 'react';

interface formMetaData {
  touched: any;
  error: string;
  warning: string;
}
interface formFieldsProps {
  input: any;
  tips: any;
  label: string;
  required: any;
  meta: formMetaData;
}

const renderFormField = (props: formFieldsProps): JSX.Element => {
  const {
    input,
    tips,
    label,
    required,
    meta: { touched, error, warning },
  } = props;
  return (
    <>
      {label && (
        <label className={`form-label ${required ? 'required' : ''}`} htmlFor={input.name}>
          {label}
        </label>
      )}
      <input {...input} {...props} id={input.name} className="form-control" />
      {tips && <div className="form-text">{tips}</div>}
      {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span>{warning}</span>))}
    </>
  );
};
export default renderFormField;
