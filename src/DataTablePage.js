import React, { useState, useEffect } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import DataTable from './DataTable';
import { FaSearch } from "react-icons/fa";
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
        <InputGroup style={{ maxWidth: "300px" }}>
          <InputGroup.Text>
            <FaSearch  style={{ height:"15px", width:"15px" }} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form>
      <DataTable data={formData} searchQuery={searchQuery} onEdit={fetchFormData} />
    </Container>
  );
};

export default DataTablePage;
