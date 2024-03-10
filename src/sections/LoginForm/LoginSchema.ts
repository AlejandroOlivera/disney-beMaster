import * as Yup from "yup"

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Must be at least  6 characters")
    .matches(/[a-zA-Z]/, "Must contain at least one letter")
    .matches(/[0-9]/, "Must contain at least one number"),
})
