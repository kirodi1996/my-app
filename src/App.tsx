import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { NewsProvider } from "./context/NewsContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <NewsProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </NewsProvider>
  );
}

export default App;