/* eslint-disable no-alert */
import React, { ChangeEvent } from 'react';

interface formMetaData {
  touched: any;
  error: string;
  warning: string;
}
interface RenderFileInputProps {
  input: any;
  tips: any;
  meta: formMetaData;
  onImageChange: (file: any | null) => void;
}
const handleChange = (event: ChangeEvent<HTMLInputElement>, input: RenderFileInputProps['input'], onImageChange: RenderFileInputProps['onImageChange']) => {
  event.preventDefault();
  const imageFile = event.target.files?.[0];
  if (imageFile) {
    if (/\.(jpe?g|png)$/i.test(imageFile?.name) === false) {
      input.onChange(null);
      onImageChange(null);
      alert('Please select image file only!');
    } else {
      const fileSize = imageFile.size / 1024 / 1024; // in MB
      if (fileSize > 5) {
        alert(`Photo size must be less or equal to 5MB. Your photo size is ${fileSize}`);
      } else {
        input.onChange(imageFile);
        onImageChange(imageFile);
      }
    }
  } else {
    input.onChange(null);
    onImageChange(null);
  }
};

const renderFileInput = (props: RenderFileInputProps): JSX.Element => {
  const {
    input,
    onImageChange,
    tips,
    meta: { touched, error, warning },
  } = props;
  return (
    <>
      <div className="mb-3">
        <label className="form-label d-none" htmlFor={input.name}>
          {input.name}
        </label>
        <input
          type="file"
          name="formFile"
          className="form-control form-control-sm"
          id={input.name}
          accept="image/x-png,image/jpeg"
          onChange={(event) => handleChange(event, input, onImageChange)}
          required
        />
        <div className="d-flex">
          {tips && <div className="form-text">{tips}</div>}
          {touched &&
            ((error && <div className="invalid-feedback">{error}</div>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    </>
  );
};
export default renderFileInput;
