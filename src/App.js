import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../src/app.css'
function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    tableDataFunc()
    async function tableDataFunc() {
      try {
        const response = await fetch('https://api.instantwebtools.net/v1/passenger?page=0&size=10')
          .then((response => response.json()))
          .then(json => {
            setTableData(json.data)
          })
      } catch (error) {
        console.log(error)
        throw new Error('Data unable fetching')
      }
    }
  }, []);

  console.log(tableData)


  const columns = [
    { field: '_id', headerName: 'Id', width: 200 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'trips', headerName: 'Trips', type: 'number', width: 130 },
    {
      field: "airline",
      headerName: "country",
      width: 160,
      valueGetter: (params) => {
        let result = [];
        if (params.row) {
          if (params.row.airline) {
            result.push(params.row.airline[0].country);
          }

        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: "id",
      headerName: "id",
      width: 160,
      valueGetter: (params) => {
        let result = [];
        if (params.row) {
          if (params.row.airline) {
            result.push(params.row.airline[0].id);
          }

        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: "website",
      headerName: "website",
      width: 160,
      valueGetter: (params) => {
        let result = [];
        if (params.row) {
          if (params.row.airline) {
            result.push(params.row.airline[0].website);
          }

        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },
    {
      field: "slogan",
      headerName: "slogan",
      width: 160,
      valueGetter: (params) => {
        let result = [];
        if (params.row) {
          if (params.row.airline) {
            result.push(params.row.airline[0].slogan);
          }

        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      }
    },

  ];
  return (
    <div className='main-div'>
      <h1 className='table-heading'>API DATA MUI TABLE</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid sx={{ color: 'white' }}
          rows={tableData ? tableData : ''}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row?._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default App;

