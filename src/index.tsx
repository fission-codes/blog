import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { WebnativeProvider } from "./context/webnative"
import * as wn from "webnative"

const PERMISSIONS = {
  app: {
    name: "Blog",
    creator: "Fission",
  },
  fs: {
    public: [wn.path.directory("Apps", "Fission", "Blog")],
  },
}

ReactDOM.render(
  <React.StrictMode>
    <WebnativeProvider permissions={PERMISSIONS}>
      <App />
    </WebnativeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
