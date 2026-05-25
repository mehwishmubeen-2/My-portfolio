import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
//import Projects from "./pages/Projects"; 

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />


        <Route path="/chat" element={<Chatbot />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;