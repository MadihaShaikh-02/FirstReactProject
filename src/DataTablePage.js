import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import DataTable from './DataTable';
import axios from 'axios';

const DataTablePage = () => {
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFormData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/formData`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Form Data</h1>
      <Form className="d-flex justify-content-end mb-3">
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ maxWidth: "300px" }}
        />
      </Form>
      <DataTable data={formData} searchQuery={searchQuery} />
    </Container>
  );
};

export default DataTablePage;
