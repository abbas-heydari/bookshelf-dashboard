import "./App.css";
import Categories from "./Pages/Categories";
import Discover from "./Pages/Discover";
import MyLibrary from "./Pages/MyLibrary";
import Favorite from "./Pages/Favorite";
import Help from "./Pages/Help";
import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Discover />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Discover" element={<Discover />} />
          <Route path="/MyLibrary" element={<MyLibrary />} />
          <Route path="/Favorites" element={<Favorite />} />
          <Route path="/Help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
