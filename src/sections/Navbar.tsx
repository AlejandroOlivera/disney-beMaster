import { client } from "@/supabase/client"
import { Link } from "react-router-dom"

export const NavBar = () => {
  const handleLogout = async () => {
    await client.auth.signOut()
  }

  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content  ">
      <div className="px-2 mx-2 navbar-start">
        <span className="text-lg font-bold">DaisyUI</span>
      </div>
      <div className="hidden px-2 mx-2 navbar-center lg:flex">
        <div className="flex items-stretch">
          <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
            Home
          </Link>
        </div>
      </div>
      <div className="navbar-end">
        <button onClick={handleLogout} className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  )
}
