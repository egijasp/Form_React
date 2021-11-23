import { toast, ToastContainer } from 'react-toastify';
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

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneNumberReg = /^[0-9]*$/;
const nameReg = /^[A-Za-z]+$/;

const Form = () => {
  const [values, setValues] = useState(initialValues);
  const ref = useRef<HTMLInputElement>(null);
  const { errors } = values;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const notification = () => toast('Form has been submitted!');

  const validation = () => {
    if (!values.fullName) {
      errors.fullName = 'Full name field is required';
    } else if (!nameReg.test(values.fullName)) {
      errors.fullName = 'Full name should contain only letters';
    }

    if (!values.email) {
      errors.email = 'E-mail is required';
    } else if (!emailReg.test(values.email)) {
      errors.email = 'Please enter valid e-mail address';
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if
    (!phoneNumberReg.test(values.phoneNumber)) {
      errors.phoneNumber = 'Please enter valid phone number';
    } else if (values.phoneNumber.length < 8) {
      errors.phoneNumber = 'Phone number needs to be 8 numbers or more';
    }

    if (!values.gender) {
      errors.gender = 'You need choose one';
    }

    if (!values.botsCheck) {
      errors.botsCheck = 'You need to confirm that you are not a robot';
    }
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
        notification();
      }}
      >
        <Input
          type="text"
          name="fullName"
          value={values.fullName}
          placeholder="Full Name"
          onChange={onChange}
          errorMessage={errors.fullName}
        />
        <Input
          type="text"
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
        <Input
          type="radio"
          name="gender"
          checked={values.gender === 'male'}
          value="male"
          label="Male"
          onChange={onChange}
        />

        <Input
          type="radio"
          name="gender"
          checked={values.gender === 'female'}
          value="female"
          label="Female"
          onChange={onChange}
          errorMessage={errors.gender}
        />
        <Input
          type="checkbox"
          name="botsCheck"
          checked={values.botsCheck}
          label="I am not robot"
          onChange={onChange}
          errorMessage={errors.botsCheck}
        />
        <button
          className="form__button"
          type="submit"
          onClick={() => {
            validation();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
