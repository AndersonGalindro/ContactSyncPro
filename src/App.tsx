import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Form from "./pages/form";
import Header from "./Components/Header";
import { CustomTable } from "./pages/Table";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contacts" element={<CustomTable />} />
        <Route path="add-contacts" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
