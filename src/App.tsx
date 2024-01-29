import CatServ from "./pages/superadmin/service-category";
import AccessibleTable from "./pages/provider/provider-table";
import AdministrationTable from "./pages/customer/customer-table";
import { Route, Routes } from "react-router-dom";
import Toastify from "./components/toaster/Toaster";
import "./App.css";
import NotFound from "./pages/notFound/not-found";
import DataNotFound from "./pages/notFound/dataNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CatServ />} />
        <Route path="dashboard/:id" element={<AccessibleTable />} />
        <Route path="customer" element={<AdministrationTable />} />
        <Route path="*" element={<NotFound />} />
        <Route path="not" element={<DataNotFound />} />
      </Routes>
      <Toastify />
    </>
  );
}

export default App;
