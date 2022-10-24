import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { signUpStart } from '../../store/user/user.action';

import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'; 

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try { 
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log('user creation encountered an error', error);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Display Name'
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          required
        />
        <FormInput 
          label='Email'
          type='email' 
          name='email' 
          value={email} 
          onChange={handleChange}
          required 
        />

        <FormInput 
          label='Password'
          type='password' 
          name='password' 
          value={password}
          onChange={handleChange}
          required 
        />

        <FormInput
          label='Confirm Password' 
          type='password' 
          name='confirmPassword' 
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;