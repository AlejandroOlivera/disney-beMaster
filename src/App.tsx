import { useEffect, useState } from "react"
import { client } from "./supabase/client"
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { Home } from "./pages/Home"
import { SessionContext } from "./utils/sessionContext"
import { User } from "@supabase/supabase-js"
import { LoginPage } from "./pages/Login"
import { RecoveryPasswordPage } from "./pages/RecoveryPasswordPage"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data } = client.auth.onAuthStateChange((event, session) => {
      console.log(
        "🚀 ~ const{data}=client.auth.onAuthStateChange ~ event:",
        event,
      )
      if (session || event === "SIGNED_OUT") {
        if (location.pathname !== "/recovery") {
          setUser(null)
          navigate("/login")
        }
      } else if (event == "PASSWORD_RECOVERY") {
        navigate("/recovery")
      } else {
        setUser(session?.user as User)
        navigate("/")
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [location.pathname, navigate])

  return (
    <SessionContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<LoginPage />} />
        <Route path="/recovery/*" element={<RecoveryPasswordPage />} />
      </Routes>
    </SessionContext.Provider>
  )
}

export default App
