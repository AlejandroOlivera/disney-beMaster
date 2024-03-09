import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { client } from "../supabase/client"
import { TextField } from "@/components/TextField"
import { useState } from "react"

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
  const [isLogin, setLogin] = useState(false)
  console.log("🚀 ~ LoginForm ~ isLogin:", isLogin)

  const handleSignIn = async (values: Values) => {
    const { email, password } = values

    if (!email && !password) return

    if (!isLogin) {
      const data = await client.auth.signUp({
        email: email,
        password: password,
      })
      console.log("🚀 ~ handleSubmit ~ data:", data)
    } else {
      const data = await client.auth.signInWithPassword({
        email: email,
        password: password,
      })
      console.log("🚀 ~ handleSubmit ~ data:", data)
    }
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSignIn}
    >
      <Form className=" w-96 h-96  flex-col justify-center px-6 py-12 lg:px-8 rounded-md bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? "Login to your account" : "Create a new account"}
          </h2>
        </div>

        <div className=" ">
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
          <ErrorMessage
            component="a"
            className="text-error text-sm"
            name="email"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <TextField
              id="password"
              type="password"
              name="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <ErrorMessage
              component="a"
              className="text-error text-sm"
              name="password"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <button
            type="submit"
            className="btn mt-5  w-full  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLogin ? "Login" : "Create a new account"}
          </button>
          <div className="text-sm " onClick={() => setLogin(true)}>
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              You have acount?
            </a>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
