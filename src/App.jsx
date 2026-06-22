import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GamesList from "./pages/GamesList";
import About from "./pages/About";
import WhoSaidPage from "./pages/games/WhoSaidPage";






export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/about" element={<About />} />
          <Route path="/games/who-said" element={<WhoSaidPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}