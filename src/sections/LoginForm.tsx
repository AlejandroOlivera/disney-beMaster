import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { client } from "../supabase/client"
import { TextField } from "@/components/TextField"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Must be at least  6 characters")
    .matches(/[a-zA-Z]/, "Must contain at least one letter")
    .matches(/[0-9]/, "Must contain at least one number"),
})

type Values = {
  email: string
  password: string
}
export const LoginForm = () => {
  const handleSubmit = async (values: Values) => {
    const { email, password } = values

    if (!email && !password) return

    const data = await client.auth.signUp({
      email: email,
      password: password,
    })
    console.log("🚀 ~ handleSubmit ~ data:", data)
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 rounded-md bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email adress
          </label>
          <TextField
            id="email"
            type="email"
            name="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <ErrorMessage component="a" className="text-error" name="email" />
        </div>
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <TextField
            id="password"
            type="password"
            name="password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <ErrorMessage component="a" className="text-error" name="password" />
        </div>

        <button className="btn w-32" type="submit">
          Sign In
        </button>
      </Form>
    </Formik>
  )
}
