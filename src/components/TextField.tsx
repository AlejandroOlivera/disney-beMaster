import { Field } from "formik"

interface CustomFieldProps {
  name: string
  id: string
  type: string
  className: string
}
export const TextField = ({ className, id, name, type }: CustomFieldProps) => {
  return <Field className={className} id={id} name={name} type={type} />
}
