import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function TablePaginationDemo() {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const HandleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const HandleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <TablePagination
    rowsPerPageOptions={[10, 15, 20]}
      component="div"
      count={100}
      page={page}
      onChangePage={HandleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={HandleChangeRowsPerPage}
    />
  );
}