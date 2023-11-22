import React from 'react';

interface RadioProps {
  input: { value: string};
  label: string;
  id: string;
  value: string;
}
const renderFormRadio = (props: RadioProps): JSX.Element => {
  const { input, label, id } = props;
  return (
    <div className="form-check form-check-inline">
      <input {...input} {...props} checked={input.value === props.value} className="form-check-input" type="radio" />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
export default renderFormRadio;
