import React, { ReactChild } from "react"
import Navigation from "./Navigation"

interface Props {
  children?: ReactChild[]
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-auto min-h-screen">
      <div className="w-1/6 p-4 br">
        <Navigation />
      </div>
      <main className="w-5/6 p-4 bg-base-100">{children}</main>
    </div>
  )
}

export default Layout
