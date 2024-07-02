import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MyForm from "./MyForm";
import DataTablePage from "./DataTablePage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/datatable">Data</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<MyForm onSubmitSuccess={() => window.location.reload()} />} />
            <Route path="/datatable" element={<DataTablePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

