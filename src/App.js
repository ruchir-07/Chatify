import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Application from "./Components/Application.js";
import Chat from "./Components/Chat.js";
import Login from "./Components/SignUp.js";
import Home from "./Components/Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./Firebase/Firebase.js";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uName = user.displayName.split(" ")[0];
        const details = {
          name: user.displayName,
          displayName: uName,
          photoURL: user.photoURL,
          email: user.email,
        };
        localStorage.setItem("userDetails", JSON.stringify(details));
        setUser(user.refreshToken);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className={classes.root}>
            <Application />
            <main className={classes.content}>
              <div className={classes.toolbar} style={{ minHeight: "50px" }} />
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/channel/:id">
                  <Chat />
                </Route>
              </Switch>
            </main>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;