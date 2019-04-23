import React from 'react';
import { Formik } from 'formik';
import { UikFormInputGroup, UikInput, UikButton } from '../../@uik';
import { navigate } from '@reach/router';

export const LoginForm = props => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={values => {
        props.onLogin(values);
        navigate('/');
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <UikFormInputGroup>
            <UikInput
              label='Email'
              type='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <UikInput
              label='Password'
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <UikButton primary type='submit' disabled={isSubmitting}>
              Login
            </UikButton>
          </UikFormInputGroup>
        </form>
      )}
    </Formik>
  );
};
