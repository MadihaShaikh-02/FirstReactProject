import React, { useState, useMemo, useCallback } from "react";
import { useTable } from "react-table";
import Table from "react-bootstrap/Table";
import { Modal } from "react-bootstrap";
import EditForm from "./EditForm";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";

const DataTable = ({ data, searchQuery, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = useCallback((row) => {
    setSelectedRow(row.original);
    setShowModal(true);
  }, []);

  const handleDeleteClick = useCallback(
    async (id) => {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/formData/${id}`);
        onEdit(); // Refresh the data
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Deletion failed. Please try again.");
      }
    },
    [onEdit]
  );

  const handleModalClose = () => setShowModal(false);

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "Message", accessor: "message" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <FaPen
              style={{ color: "rgb(181, 110, 220)", marginRight: "5px" }}
              onClick={() => handleEditClick(row)}
            />

            <FaTrash
              style={{ color: "rgb(255, 0, 0)", marginLeft: "20px"  }}
              onClick={() => handleDeleteClick(row.original.id)}
            />
          </>
        ),
      },
    ],
    [handleEditClick, handleDeleteClick]
  );

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredData,
    });

  return (
    <>
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {selectedRow && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm
              data={selectedRow}
              onSubmitSuccess={handleModalClose}
              onEdit={onEdit}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default DataTable;
