import "./styles/App.scss";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "./utils/constants";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import History from "./pages/History";

const App = () => {
  return (
    <div className="app-home" role="application">
      <Header />
      <main className="home-main">

        <Routes>
          <Route
            path={ROUTES.HOME}
            element={<Home />}
          />
          <Route
            path={ROUTES.CART}
            element={<Cart />}
          />
          <Route
            path={ROUTES.HISTORY}
            element={<History />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
