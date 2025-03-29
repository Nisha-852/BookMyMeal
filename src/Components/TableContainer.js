import React from 'react';

const TableContainer = ({ columns, data, className }) => {
  console.log(data)
  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead>
          <tr>

            <th>EmpId</th>
            <th>Name</th>
            <th>Department</th>
            <th>Total Meals Booked</th>
            <th>Meal Dates</th>
            <th>Emp Type</th>
          </tr>
        </thead>
        <tbody>

          {
            data.length > 0 && data.map((row, rowIndex) => <tr key={'empytable=' + rowIndex}>
              <th>{row.employeeId || 'N/A'}</th>
              <th>{(row?.firstname || 'Guest') + ' ' + (row?.lastname || '')}</th>
              <th>{row?.department || 'N/A'}</th>
              <th>{row?.totalMealsBooked}</th>
              <th>{row?.dateRange}</th>
              <th>{row?.employeeId === 'other' ? 'Non-Employee' : 'Employee'}</th>
            </tr>
            )
          }


          {/* {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col, idx) => (
                  <td key={idx}>{row[col.key] || 'NA'}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                No Data Available
              </td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
  );
};

export default TableContainer;
