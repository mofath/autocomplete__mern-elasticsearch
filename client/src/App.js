import {Navbar, Footer} from "./components";
import Home from "./screens/home/Home";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <div className="app">
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
    <Footer />
  </div>
);

export default App;
