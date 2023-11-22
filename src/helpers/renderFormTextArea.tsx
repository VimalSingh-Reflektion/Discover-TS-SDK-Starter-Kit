import React from 'react';

interface textMetaData {
  touched: any;
  error: string;
  warning: string;
}
interface textAreaProps {
  input: any;
  tips: any;
  label: string;
  placeholder: string;
  required: boolean;
  meta: textMetaData;
}

const renderFormTextArea = (props: textAreaProps): JSX.Element => {
  const {
    input,
    label,
    placeholder,
    tips,
    required,
    meta: { touched, error, warning },
  } = props;
  return (
    <>
      <label className={`form-label ${required ? 'required' : ''}`} htmlFor={input.name}>
        {label}
      </label>
      <textarea {...input} {...props} id={input.name} className="form-control" placeholder={placeholder} />
      {tips && <div className="form-text">{tips}</div>}
      {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span>{warning}</span>))}
    </>
  );
};
export default renderFormTextArea;
