import { TextField } from "@/components/TextField"
import { client } from "@/supabase/client"
import { ErrorMessage, Form, Formik } from "formik"
import { useState } from "react"
import { validationSchema } from "./RecoveryPassword"

type Values = {
  email: string
  password: string
}

export const RecoveryPasswordSection: React.FC = () => {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null as string | null)

  const handleForgotPassword = async (values: Values) => {
    const { email, password } = values

    if (!email && !password) return

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: "/recovery",
    })

    if (error) setErrorMessage("There was an error updating your password.")
  }

  // useEffect(() => {
  //   client.auth.onAuthStateChange(async (event, session) => {
  //     console.log("🚀 ~ client.auth.onAuthStateChange ~ event:", event)
  //     if (event == "PASSWORD_RECOVERY") {
  //       const newPassword = prompt(
  //         "What would you like your new password to be?",
  //       )
  //       const { data, error } = await client.auth.updateUser({
  //         password: newPassword,
  //       })

  //       if (data) alert("Password updated successfully!")
  //       if (error) setErrorMessage("There was an error updating your password.")
  //     }
  //   })
  // }, [password])

  return (
    <div className="flex h-screen justify-center items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleForgotPassword}
      >
        <Form className=" w-96 h-[500px]  flex-col justify-center px-6 py-12 lg:px-8 rounded-md bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {"Recovery Password"}
            </h2>
          </div>

          <div>
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
              {"Reset Password"}
            </button>
          </div>

          {isError && (
            <div role="alert" className="alert alert-error">
              <div
                onClick={() => setIsError(!isError)}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <span>{errorMessage}</span>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  )
}
