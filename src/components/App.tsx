import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "../pages/main-page";
import ReactionsPage from "../pages/reactions-page";

function App() {
  return (
    <div className="w-dvw h-dvh bg-black">
      <BrowserRouter>
        <nav className="p-4 bg-gray-800 text-white">
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/reactions">Reactions</Link>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/reactions" element={<ReactionsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
