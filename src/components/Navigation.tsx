import React from "react"
import { Link } from "react-router-dom"
import { useWebnative } from "../context/webnative"

const Navigation = () => {
  const { logout } = useWebnative()
  return (
    <nav className="min-h-full flex flex-col">
      <div className="flex-none">
        <h1 className="text-xl">Blog</h1>
      </div>
      <div className="flex-grow py-8">
        <ul>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </div>
      <div className="flex-none">
        <button onClick={() => logout()}>Logout</button>
      </div>
    </nav>
  )
}

export default Navigation
