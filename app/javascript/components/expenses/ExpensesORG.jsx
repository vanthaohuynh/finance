import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
// import axios from 'axios';
// import NewExpense from './NewExpense';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import Header from '../Header';

// import EditExpense from './expense/EditExpense';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';

const apiExpenseEndpoint = '/api/v1/expenses'

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  // const handleClick = () => {
    // console.log('HandleClick');
    // const id = randomId();
    // setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    // setRowModesModel((oldModel) => ({
      //   ...oldModel,
      //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      // }));
    // };

    return (
      <GridToolbarContainer>
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button> */}
      {/* <h3>Expense</h3> */}
      {/* <Button color="primary" startIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClick}>
        Add Record
      </Button>
      <NewExpense
        refreshExpense={reloadExpenses}
      /> */}
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

function Expenses() {

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [openDialog, setOpenDialog] = React.useState(false);
  const [id, setID] = React.useState(null);
  // const [openBackdrop, setOpenBackdrop] = React.useState(false);
  // const [openNewExpense, setOpenNewExpense] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data: expenses } = await axios.get(apiExpenseEndpoint);
      setRows(expenses);
    }
    fetchData();
  } , []);

  // const handleNewExpenseOpen = () => {
  //   setOpenNewExpense(true);
  // };

  const reloadExpenses = async () => {
    const { data: expenses } = await axios.get(apiExpenseEndpoint);
    setRows(expenses);
    console.log('Reload successful');
  }
  // Not use
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
    const { id } = params;
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
    console.log('Params:', params);
    setID(id);
    console.log('ID now set:', id);
  };
  // Not use
  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  // Not use
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    // console.log('Edit Clicked');
    // Load modal update form

  };
  // Not use
  const updateRecord = async (id, record) => {
    const { data: updatedRecord } = await axios.patch(`${apiExpenseEndpoint}/${id}`, record);
    console.log('Updated record:', updatedRecord);
    reloadExpenses();
  }
  // Not use
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    // updateRecord(id, rows.find((row) => row.id === id)); not working
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    // setOpenBackdrop(true);
    // console.log('Backdrop is now: ', openBackdrop);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    // setOpenBackdrop(false);
    // console.log('Backdrop is now: ', openBackdrop);
    // console.log('Dialog Closed');
  };

  const handleUploadPDF = () => {
    // console.log('Upload PDF');
  };

  const deleteRecord = (id) => async () => {
    const { data } = await axios.delete(`${apiExpenseEndpoint}/${id}`);
    reloadExpenses();
  }

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    deleteRecord(id)();
    handleDialogClose();
  };
  // Not use
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  // Not use
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    // console.log('ProcessRowUpdate:', updatedRow);
    updateRecord(newRow.id, updatedRow);
    return updatedRow;
  };

  // const columns starts here
  columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'created_at',
      headerName: 'Create Date',
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        return moment(params.value).format('YYYY-MM-DD');
      }
    },
    {
      field: 'invoice_date',
      headerName: 'Invoice Date',
      width: 150,
      editable: false,
    },
    {
      field: 'invoice_num',
      headerName: 'Invoice Number',
      width: 150,
      editable: false,
    },
    {
      field: 'account_num',
      headerName: 'Study Number',
      width: 150,
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      editable: false,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      width: 100,
      editable: false,
    },
    {
      field: 'expense_category_name',
      headerName: 'Expense Category',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 350,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        // setID(id);
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              // icon={<SaveIcon />}
              // label="Save"
              // onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              // icon={<CancelIcon />}
              // label="Cancel"
              // className="textPrimary"
              // onClick={handleCancelClick(id)}
              // color="inherit"
            />,
          ];
        };
        // Return starts here
        return [
          // <Button color="primary" onClick={handleEditClick(id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
          //   Edit
          // </Button>,
          // <EditExpense />,
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={handleEditClick(id)}
          //   color="inherit"
          // />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        // ];
        <>
          <Tooltip title="Upload PDF Invoice" TransitionComponent={Zoom}>
            <Button
              // variant="outlined"
              startIcon={<CloudUploadIcon />}
              color="primary"
              component="label"
              // size="small"
              // onClick={handleUploadPDF(id)}
            >
              {/* Upload */}
              <input hidden accept="application/pdf" type="file" />
            </Button>
          </Tooltip>
          <Tooltip title="Download PDF Invoice" TransitionComponent={Zoom}>
            <Button
              // variant="outlined"
              startIcon={<DownloadIcon />}
              color="primary"
              // size="small"
              // onClick={handleUploadPDF(id)}
            >
              {/* Upload */}
            </Button>
          </Tooltip>
          <Tooltip title="Edit Expense" TransitionComponent={Zoom}>
            <Button
              // variant="outlined"
              startIcon={<EditIcon />}
              color="primary"
              // size="small"
              onClick={handleDeleteClick(id)}
              // onClick={handleDialogOpen}
            >
              {/* Delete */}
            </Button>
          </Tooltip>
          <Dialog
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete this record?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this record? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleDeleteClick(id)}>Delete</Button>
            </DialogActions>
          </Dialog>
        </>
        ];
        // Return ends here (line above)
      },
    },
  ];
  // const columns ends here (line above)

  return (

    <Box
    sx={{
      height: 500,
      width: '100%',
      '& .actions': {
        color: 'text.secondary',
      },
      '& .textPrimary': {
        color: 'text.primary',
      },
    }}
    >
      {/* <Button color="primary" startIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleClick}> */}
      {/* <h3>Expenses</h3> */}
      <Header header="Expenses" />
      {/* <Button color="primary" startIcon={<AddIcon />} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add Record
      </Button> */}
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleNewExpenseOpen}>
        Add Record
      </Button> */}
      <NewExpense
        reloadExpenses={reloadExpenses}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pageSize={100}
        rowsPerPageOptions={[100]}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Expenses;
