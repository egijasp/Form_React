import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import Input from '../Input/Input';
import './Form.scss';

const initialValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  gender: '',
  botsCheck: false,
  errors: {
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    botsCheck: '',
  },
};

const emailReg = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
const phoneNumberReg = /^[0-9]*$/;

const Form = () => {
  const [values, setValues] = useState(initialValues);
  const ref = useRef<HTMLInputElement>(null);
  const { errors } = values;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const validation = () => {
    if (!values.fullName) {
      errors.fullName = 'Full name field is required';
    }

    if (!values.email) {
      errors.email = 'E-mail is required';
    } else if (!emailReg.test(values.email)) {
      errors.email = 'Please enter valid e-mail address';
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number ir required';
    } else if
    (!phoneNumberReg.test(values.phoneNumber)) {
      errors.phoneNumber = 'Please enter valid phone number';
    }
    return errors;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  return (
    <div className="form__container">
      <form onSubmit={(e) => {
        e.preventDefault();
        validation();
        setValues(initialValues);
      }}
      >
        <Input
          type="text"
          name="fullName"
          value={values.fullName}
          label="Full Name"
          placeholder="Full Name"
          onChange={onChange}
          errorMessage={errors.fullName}
        />
        {errors.fullName && <span>{errors.fullName}</span>}
        <Input
          type="email"
          name="email"
          value={values.email}
          label="E-mail"
          placeholder="E-mail"
          onChange={onChange}
          errorMessage={errors.email}
        />
        <Input
          type="tel"
          name="phoneNumber"
          value={values.phoneNumber}
          label="Phone number"
          placeholder="Phone number"
          onChange={onChange}
          errorMessage={errors.phoneNumber}
        />
        <Input type="radio" name="gender" checked={values.gender === 'male'} value="male" label="Male" onChange={onChange} />
        <Input
          type="radio"
          name="gender"
          checked={values.gender === 'female'}
          value="female"
          label="Female"
          onChange={onChange}
          errorMessage="You need choose one"
        />
        <Input
          type="checkbox"
          name="botsCheck"
          checked={values.botsCheck}
          label="I am not robot"
          onChange={onChange}
          errorMessage=""
        />
        <button
          className="form__button"
          type="submit"
          onClick={() => {
            validation();
            if (!validation) {
              setValues(initialValues);
            }
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
