import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ArticleDetails from "../pages/ArticleDetails";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  );
};

export default AppRoutes;