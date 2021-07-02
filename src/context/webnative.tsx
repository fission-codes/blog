import * as React from "react";
import * as wn from "webnative";
import { Permissions } from "webnative/dist/ucan/permissions";
wn.setup.debug({ enabled: true });

interface WebnativeContext {
  state: wn.State | undefined;
  error: Error | undefined;
  login: Function;
  logout: Function;
}

const WebnativeCtx = React.createContext<WebnativeContext | null>(null);

interface Props {
  permissions?: Permissions;
  loading?: React.ReactElement;
  children: React.ReactNode;
}

const WebnativeProvider: React.FC<Props> = ({
  permissions,
  loading,
  children,
}) => {
  const [state, setState] = React.useState<wn.State>();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    async function getState() {
      const result = await wn
        .initialise({
          permissions,
        })
        .catch((err) => {
          setError(err);
          return undefined;
        });

      setState(result);
    }
    getState();
  }, [permissions]);

  if (!state) {
    return loading || <div>Loading...</div>;
  }

  const login = () => {
    wn.redirectToLobby(state.permissions);
  };

  const logout = () => {
    wn.leave();
  };

  return (
    <WebnativeCtx.Provider value={{ state, error, login, logout }}>
      {children}
    </WebnativeCtx.Provider>
  );
};

const useWebnative = () => React.useContext(WebnativeCtx) as WebnativeContext;

export { WebnativeProvider, useWebnative };
