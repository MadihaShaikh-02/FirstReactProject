import React, { useState } from 'react';
import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';
import { Button, Modal } from 'react-bootstrap';
import EditForm from './EditForm';

const DataTable = ({ data, searchQuery, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row.original);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Message', accessor: 'message' },
      {
        Header: 'Edit',
        Cell: ({ row }) => (
          <Button  style={{ backgroundColor: "rgb(181, 110, 220)",borderColor: "rgb(128, 0, 128)",}}
           onClick={() => handleEditClick(row)}>
            Edit
          </Button>
        ),
      },
    ],
    []
  );

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
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
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {selectedRow && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm data={selectedRow} onSubmitSuccess={handleModalClose} onEdit={onEdit} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default DataTable;
