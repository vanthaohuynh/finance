import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {
  SummaryState,
  IntegratedSummary,
  DataTypeProvider,
  // ExportPanel,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableSummaryRow,
  Toolbar,
  ExportPanel,
  TableColumnResizing,
  TableEditRow,
} from '@devexpress/dx-react-grid-material-ui';
import { styled } from '@mui/material/styles';
// DO NOT enable the following line. It will cause the error.
// We are usiing Blob but no need to import it.
// Sometimes we need to IGNORE the error from eslint.
// import Blob from 'buffer';
import saveAs from 'file-saver';

const Billable2 = ({ billable }) => {
  // const total = billable.reduce((acc, cur) => acc + cur.revenue_total, 0);
  // const formattedTotal = Number(total).toLocaleString('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // });

  const rows = [...billable].sort((a, b) => (a.account_num > b.account_num ? 1 : -1));

  const getCellStyle = ({ OrderDate, SaleAmount }, column) => {
    const style = {};
    if (OrderDate < new Date(2014, 2, 3)) {
      style.color = '#AAAAAA';
    }
    if (SaleAmount > 15000) {
      if (column.name === 'OrderNumber') {
        style.fontWeight = 'bold';
      }
      if (column.name === 'SaleAmount') {
        style.backgroundColor = '#FFBB00';
        style.color = '#000000';
      }
    }
    return style;
  };

  const PREFIX = 'Demo';
  const classes = {
    cell: `${PREFIX}-cell`,
  };
  const StyledVirtualTableCell = styled(VirtualTable.Cell)(({ row, column }) => ({
    [`&.${classes.cell}`]: getCellStyle(row, column),
  }));

  const Cell = props => (
    <StyledVirtualTableCell {...props} className={classes.cell} />
  );

  const DateFormatter = ({ value }) => (
    <span>
      {value.toLocaleDateString()}
    </span>
  );

  const DateTypeProvider = props => (
    <DataTypeProvider {...props} formatterComponent={DateFormatter} />
  );

  // worksheet customization
  /* eslint-disable no-param-reassign */
  const customizeCell = (cell, row, column) => {
    // if (row.OrderDate < new Date(2014, 2, 3)) {
    //   cell.font = { color: { argb: 'AAAAAA' } };
    // }
    if (row.SaleAmount > 15000) {
      if (column.name === 'SaleAmount') {
        cell.font = { color: { argb: '000000' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
      }
    }
    if (column.name === 'revenue_total') {
      cell.numFmt = '$0';
    }
  };

  const customizeSummaryCell = (cell) => {
    // cell.font = { italic: true };
    cell.font = { bold: true };
  };

  // const customizeHeader = (worksheet) => {
  //   const generalStyles = {
  //     font: { bold: true },
  //     fill: {
  //       type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
  //     },
  //     alignment: { horizontal: 'left' },
  //   };
  //   for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
  //     worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
  //     worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
  //     Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
  //     Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
  //   }
  //   worksheet.getRow(1).height = 20;
  //   worksheet.getRow(1).getCell(1).font = { bold: true, size: 16 };
  //   worksheet.getRow(1).getCell(4).numFmt = 'd mmmm yyyy';
  //   worksheet.getRow(1).getCell(4).font = { bold: true, size: 16 };
  //   worksheet.getColumn(1).values = ['Sale Amounts:', 'Company Name:', 'Address:', 'Phone:', 'Website:'];
  //   worksheet.getColumn(4).values = [new Date(), 'K&S Music', '1000 Nicllet Mall Minneapolis Minnesota', '(612) 304-6073', 'www.nowebsitemusic.com'];
  //   worksheet.addRow({});
  // };

  const customizeHeader = (worksheet) => {
    const generalStyles = {
      font: { bold: true },
      // fill: {
      //   type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
      // },
      alignment: { horizontal: 'left' },
    };
    // for (let rowIndex = 1; rowIndex < 6; rowIndex += 1) {
    //   worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
    //   worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
    //   Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
    //   Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
    // }
    Object.assign(worksheet.getRow(1).getCell(1), generalStyles);
    // Object.assign(worksheet.getRow(1).getCell(4), generalStyles);
    worksheet.getRow(1).height = 20;
    worksheet.getRow(1).getCell(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).getCell(4).numFmt = 'mmmm d, yyyy';
    worksheet.getRow(1).getCell(4).font = { bold: true, size: 12 };
    // worksheet.getColumn(1).values = ['Sale Amounts:', 'Company Name:', 'Address:', 'Phone:', 'Website:'];
    worksheet.getColumn(1).values = ['Billable Activities for all Current Studies'];
    // worksheet.getColumn(4).values = [new Date(), 'K&S Music', '1000 Nicllet Mall Minneapolis Minnesota', '(612) 304-6073', 'www.nowebsitemusic.com'];
    worksheet.addRow({});
  };

  // const customizeFooter = (worksheet) => {
  //   const { lastRow } = worksheet;
  //   let currentRowIndex = lastRow.number + 2;
  //   for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
  //     worksheet.mergeCells(currentRowIndex + rowIndex, 1, currentRowIndex + rowIndex, 6);
  //     Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), { font: { bold: true }, alignment: { horizontal: 'right' } });
  //   }
  //   worksheet.getRow(currentRowIndex).getCell(1).value = 'If you have any questions, please contact John Smith.';
  //   currentRowIndex += 1;
  //   worksheet.getRow(currentRowIndex).getCell(1).value = 'Phone: +111-111';
  //   currentRowIndex += 1;
  //   worksheet.getRow(currentRowIndex).getCell(1).value = 'For demonstration purposes only';
  //   worksheet.getRow(currentRowIndex).getCell(1).font = { italic: true };
  // };
  /* eslint-enable no-param-reassign */

  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer()
      .then((buffer) => {
        // Please ignore this eslint error about Blob.
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Billable2.xlsx');
      });
  };

  const columns = [
    // { name: 'Employee', title: 'Employee' },
    // { name: 'OrderNumber', title: 'Invoice Number' },
    // { name: 'OrderDate', title: 'Order Date' },
    // { name: 'CustomerStoreCity', title: 'City' },
    // { name: 'CustomerStoreState', title: 'State' },
    // { name: 'SaleAmount', title: 'Sale Amount' },
    { name: 'study_name', title: 'Study Name' },
    { name: 'revenue_total', title: 'Amount' },
  ];

  // const dateColumns = ['OrderDate'];
  const totalSummaryItems = [
    // { columnName: 'OrderNumber', type: 'count' },
    { columnName: 'revenue_total', type: 'sum', valueFormat: 'currency', displayFormat: 'Total: {0}' },
  ];

  const exporterRef = useRef(null);
  const startExport = useCallback((options) => {
    exporterRef.current.exportGrid(options);
  }, [exporterRef]);

  const renderGrid = () => {
    console.log('renderGrid');
    // const onRowPrepared = (e) => {
    //   e.rowElement.css({ height: 50 });
    // };

    return (
      <Box
        sx={{
          height: 350,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#b7d7f4',
            color: 'black',
            fontVariantCaps: 'all-small-caps',
            fontStyle: 'bold',
            fontSize: 18,
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            '& .MuiDataGrid-row': {
              '&:nth-child(2n)': { backgroundColor: 'rgba(235, 235, 235, .7)' },
              '&:hover': { backgroundColor: '#d1e6f9' },
            },
          },
        }}
      >
        <Grid
          rows={rows}
          columns={columns}
          // onRowPrepared={onRowPrepared}
          // columnMaxWidth={50}
        >
          {/* <DateTypeProvider for={dateColumns} /> */}
          <SummaryState
            totalItems={totalSummaryItems}
          />
          <IntegratedSummary />
          <VirtualTable cellComponent={Cell} />
          <TableHeaderRow />
          <TableSummaryRow />
          <Toolbar />
          <ExportPanel
            startExport={startExport}
          />
        </Grid>

        <GridExporter
          ref={exporterRef}
          rows={rows}
          columns={columns}
          totalSummaryItems={totalSummaryItems}
          onSave={onSave}
          customizeCell={customizeCell}
          customizeSummaryCell={customizeSummaryCell}
          customizeHeader={customizeHeader}
          // customizeFooter={customizeFooter}
        />
      </Box>
    );
  };

  return (
    <section>
      <Stack spacing={2}>
        <div className="eventList">
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: 18,
              fontWeight: 'bold',
              fontVariantCaps: 'all-small-caps',
              backgroundColor: '#76b1e8',
            }}
            variant="button"
            display="block"
            align="center"
          >
            Billable Activities for Current Studies
          </Typography>
          {/* {renderGrid()} */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontVariantCaps: 'all-small-caps',
                }}
                variant="button"
                display="block"
              >
                Total:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{
                  color: 'text.primary',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontVariantCaps: 'all-small-caps',
                }}
                variant="button"
                display="block"
              >
                {/* {formattedTotal} */}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Stack>
    </section>
  );
};

Billable2.propTypes = {
  billable: PropTypes.arrayOf(PropTypes.shape({
    account_num: PropTypes.string,
    revenue_total: PropTypes.number,
  })).isRequired,
};

export default Billable2;
