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
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
          rel="stylesheet"
        ></link>
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
      </body>
    </QueryClientProvider>
  );
}

export interface RouterContext {
  url?: string;
}
