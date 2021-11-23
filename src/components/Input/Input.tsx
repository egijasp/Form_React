import { ChangeEvent, FC } from 'react';
import './Input.scss';

type InputProps = {
  type: string,
  name?: string,
  value?: string,
  placeholder?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  label?: string,
  id?: string,
  errorMessage?: string,
  checked?: boolean,

}

const Input:FC<InputProps> = ({
  type, name, value, placeholder,
  onChange, label, id, errorMessage, checked,
}) => (
  <div className="form__input-wrapper">
    <label htmlFor={id}>
      {label}
      <input
        className="form__input"
        checked={checked}
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
    <span className="form__errorMessage">{errorMessage}</span>
  </div>
);

export default Input;
