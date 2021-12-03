import React from "react"
import { Redirect } from "react-router-dom"
import { useWebnative } from "../context/webnative"

const Login = () => {
  const { state, login } = useWebnative()

  if (state?.authenticated) {
    return <Redirect to="/" />
  }

  //   wnContext.login() => wn.redirectToLobby()
  //  `redirectToLobby` redirects you to auth.fission.codes,
  //  our authentication lobby

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-6 flex flex-auto flex-col items-center justify-center py-12 text-center">
        <h1 className="text-2xl">Fission Blog</h1>
        <div className="max-w-xl mt-4 text-gray-300 dark:text-gray-400">
          A web native blogging engine.
        </div>
        <button onClick={() => login()} className="btn login">
          <div className="flex items-center pt-px">
            <span className="mr-2 opacity-30 text-white w-4">
              <svg height="100%" width="100%" viewBox="0 0 98 94">
                <path
                  d="M30 76a12 12 0 110 11H18a18 18 0 010-37h26l-4-6H18a18 18 0 010-37c6 0 11 2 15 7l3 5 10 14h33a8 8 0 000-15H68a12 12 0 110-11h11a18 18 0 010 37H53l4 6h22a18 18 0 11-14 30l-3-4-10-15H18a8 8 0 000 15h12zm41-6l2 4 6 2a8 8 0 000-15H65l6 9zM27 25l-3-5-6-2a8 8 0 000 15h15l-6-8z"
                  fill="currentColor"
                  fillRule="nonzero"
                ></path>
              </svg>
            </span>
            Sign in with Fission
          </div>
        </button>
      </div>
    </div>
  )
}

export default Login
