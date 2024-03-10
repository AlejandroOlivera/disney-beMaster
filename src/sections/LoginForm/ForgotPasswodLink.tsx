import { client } from "@/supabase/client"
import { useFormikContext } from "formik"

export const ForgotPasswordLink: React.FC = () => {
  const info = useFormikContext()

  const handleForgotPassword = async () => {
    if (!info?.values?.email) {
      alert("Se requiere correo")
      return
    }

    await client.auth.resetPasswordForEmail(info?.values.email)
  }
  return (
    <div className="text-sm cursor-pointer">
      <a
        onClick={handleForgotPassword}
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Forgot password?
      </a>
    </div>
  )
}
