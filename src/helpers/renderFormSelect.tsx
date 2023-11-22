import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}
const renderSelectOptions = (item: SelectOption): JSX.Element => (
  <option key={item.value} value={item.value}>
    {item.label}
  </option>
);
interface textMetaData {
  touched: any;
  error: string;
  warning: string;
}
interface renderFormSelectProps {
  input: any;
  tips: any;
  label: string;
  options: SelectOption[];
  required: boolean;
  meta: textMetaData;
}
// export default function renderFormSelect({
const renderFormSelect = (props: renderFormSelectProps): JSX.Element => {
  const {
    input,
    label,
    tips,
    options,
    required,
    meta: { touched, error, warning },
  } = props;
  return (
    <>
      <label className={`form-label ${required ? 'required' : ''}`} htmlFor={input.name}>
        {label}
      </label>
      <select {...input} {...props} id={input.name} className="form-select">
        {options?.map(renderSelectOptions)}
      </select>
      {tips && <div className="form-text">{tips}</div>}
      {touched && ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span>{warning}</span>))}
    </>
  );
};
export default renderFormSelect;
