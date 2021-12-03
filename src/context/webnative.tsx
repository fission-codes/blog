import * as React from "react"
import * as wn from "webnative"
import FileSystem from "webnative/fs/filesystem"
import { Permissions } from "webnative/ucan/permissions"
wn.setup.debug({ enabled: true })

interface WebnativeContext {
  state: wn.State | undefined
  fs: FileSystem | undefined
  username: string | undefined
  error: Error | undefined
  login: () => void
  logout: () => void
}

const WebnativeCtx = React.createContext<WebnativeContext | null>(null)

interface Props {
  permissions?: Permissions
  loading?: React.ReactElement
  children: React.ReactNode
}

const WebnativeProvider: React.FC<Props> = ({
  permissions,
  loading,
  children,
}) => {
  const [state, setState] = React.useState<wn.State>()
  const [error, setError] = React.useState()
  let fs, username

  React.useEffect(() => {
    async function getState() {
      const result = await wn
        .initialise({
          permissions,
        })
        .catch((err) => {
          setError(err)
          return undefined
        })

      setState(result)
    }
    getState()
  }, [permissions])

  if (!state) {
    return loading || <div>Loading...</div>
  }

  const login = () => {
    wn.redirectToLobby(state.permissions)
  }

  const logout = () => {
    wn.leave()
  }

  switch (state.scenario) {
  case wn.Scenario.AuthCancelled:
    // User was redirected to lobby,
    // but cancelled the authorisation
    break

  case wn.Scenario.AuthSucceeded:
  case wn.Scenario.Continuation:
    fs = state.fs
    username = state.username
    break
  }

  return (
    <WebnativeCtx.Provider
      value={{ state, fs, username, error, login, logout }}
    >
      {children}
    </WebnativeCtx.Provider>
  )
}

const useWebnative = () => React.useContext(WebnativeCtx) as WebnativeContext

export { WebnativeProvider, useWebnative }
export type { WebnativeContext }
