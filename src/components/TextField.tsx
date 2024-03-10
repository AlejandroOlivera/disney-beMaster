import { Field } from "formik"

interface CustomFieldProps {
  name: string
  id: string
  type: string
  className: string
}
/**
 * Renders a `Field` component from the `formik` library with the specified props.
 * @param className - The CSS class name to be applied to the rendered `Field` component.
 * @param id - The unique identifier for the rendered `Field` component.
 * @param name - The name attribute for the rendered `Field` component.
 * @param type - The type attribute for the rendered `Field` component.
 * @returns The rendered `Field` component.
 */
export const TextField: React.FC<CustomFieldProps> = ({
  className,
  id,
  name,
  type,
}) => <Field className={className} id={id} name={name} type={type} />
