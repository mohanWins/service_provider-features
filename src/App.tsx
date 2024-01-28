import CatServ from "./View.tsx/service-category";
import AccessibleTable from "./View.tsx/Table";
import AdministrationTable from "./View.tsx/Administration";
import { Route, Routes } from "react-router-dom";
import Toastify from "./toaster/Toaster";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CatServ />} />
        <Route path="dashboard/:id" element={<AccessibleTable />} />
        <Route path="customer" element={<AdministrationTable />} />
      </Routes>
      <Toastify />
    </>
  );
}

export default App;
