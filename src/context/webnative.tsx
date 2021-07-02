import * as React from "react";
import * as wn from "webnative";

wn.setup.debug({ enabled: true });

interface WebnativeContextInterface {
  state: wn.State | undefined;
  error: Error | undefined;
  login: Function;
  logout: Function;
}

const WebnativeContext = React.createContext<WebnativeContextInterface | null>(
  null
);

const WebnativeProvider: React.FC = (props) => {
  const [state, setState] = React.useState<wn.State>();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    async function getState() {
      const result = await wn
        .initialise({
          permissions: {
            app: {
              name: "Blog",
              creator: "Fission",
            },
            fs: {
              public: [wn.path.directory("Apps", "Fission", "Blog")],
            },
          },
        })
        .catch((err) => {
          setError(err);
          return undefined;
        });

      setState(result);
    }
    getState();
  }, []);

  if (!state) {
    return <h1>Loading...</h1>;
  }

  const login = () => {
    wn.redirectToLobby(state.permissions);
  };

  const logout = () => {
    wn.leave();
  };

  return (
    <WebnativeContext.Provider
      value={{ state, error, login, logout }}
      {...props}
    />
  );
};

const useWebnative = () =>
  React.useContext(WebnativeContext) as WebnativeContextInterface;

export { WebnativeProvider, useWebnative };
