import { useEffect, useState } from "react"
import { client } from "./supabase/client"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { SessionContext } from "./utils/sessionContext"
import { User } from "@supabase/supabase-js"
import { LoginPage } from "./pages/Login"

function App() {
  const [user, setUser] = useState<User | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    client.auth.onAuthStateChange((_event, session) => {
      console.log("🚀 ~ client.auth.onAuthStateChange ~ session:", session)
      if (!session) {
        navigate("/login")
      } else {
        setUser(session.user as User)
        navigate("/")
      }
    })
  }, [navigate])

  return (
    <SessionContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<LoginPage />} />
      </Routes>
    </SessionContext.Provider>
  )
}

export default App
