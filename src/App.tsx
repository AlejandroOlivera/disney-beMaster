import { useEffect, useState } from "react"
import { client } from "./supabase/client"
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { Home } from "./pages/Home"
import { SessionContext } from "./context/sessionContext"
import { User } from "@supabase/supabase-js"
import { LoginPage } from "./pages/Login"
import { RecoveryPasswordPage } from "./pages/RecoveryPasswordPage"
import { MoviesPage } from "./pages/MoviesPage"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data } = client.auth.onAuthStateChange((event, session) => {
      if (!session || event === "SIGNED_OUT") {
        if (!location.pathname.startsWith("/categories")) {
          setUser(null)
          navigate("/login")
        }
      } else {
        setUser(session?.user as User)
        if (!location.pathname.startsWith("/categories")) {
          navigate("/")
        }
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
        <Route path="/categories/:categoryId/*" element={<MoviesPage />} />
      </Routes>
    </SessionContext.Provider>
  )
}

export default App
