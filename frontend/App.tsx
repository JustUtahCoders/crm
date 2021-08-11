import { StaticRouter, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { CreateNoun } from "./Nouns/CreateNoun";
import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "./Auth/Login";

const queryClient = new QueryClient();

export function App(props) {
  const inBrowser = typeof window !== "undefined";

  const Router = inBrowser ? BrowserRouter : StaticRouter;

  return (
    <QueryClientProvider client={queryClient}>
      <head>
        <link rel="stylesheet" href="http://localhost:7700/main.css"></link>
        <meta
          name="google-signin-client_id"
          content="437751451243-do7cqgls9rooar4q430cr57nu24cgb5n.apps.googleusercontent.com"
        ></meta>
      </head>
      <body>
        <Router context={props.routerContext} location={props.reqUrl}>
          <Route path="/create-noun" component={CreateNoun} />
          <Route path="/login" component={Login} />
        </Router>

        <script src="http://localhost:7700/flax.js"></script>
        {/* <script>
    
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'width': 240,
        'height': 50
      });
    }
  </script> */}
        <script src="https://apis.google.com/js/platform.js?onload=renderButton"></script>
      </body>
    </QueryClientProvider>
  );
}

export interface RouterContext {
  url?: string;
}
