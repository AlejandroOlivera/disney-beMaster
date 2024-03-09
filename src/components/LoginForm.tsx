import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { client } from '../supabase/client'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be at least  6 characters')
    .matches(/[a-zA-Z]/, 'Must contain at least one letter')
    .matches(/[0-9]/, 'Must contain at least one number'),
})

type Values = {
  email: string
  password: string
}

export const LoginForm = () => {
  const handleSubmit = async (values: Values) => {
    console.log('🚀 ~ handleSubmit ~ values:', values)
    const { email, password } = values

    const error = await client.auth.signUp({
      email: email,
      password: password,
    })

    console.log(error)
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col items-center h-32">
        <div className="flex"></div>
        <Field type="email" name="email" />
        <Field type="password" name="password" />

        <ErrorMessage component="a" className="" name="email" />
        <button type="submit">Sign In</button>
      </Form>
    </Formik>
  )
}
