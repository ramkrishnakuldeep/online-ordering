import "./styles/App.scss";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import History from "./pages/History";

function App() {
  return (
    <div className="app-home">
      <Header />
      <section className="home-main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </section>
    </div>
  );
}

export default App;
