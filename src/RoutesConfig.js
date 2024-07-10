import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

const RoutesConfig = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/AboutUs" element={<AboutUs/>} />
      </Routes>
    </Router>
  )
}

export default RoutesConfig;