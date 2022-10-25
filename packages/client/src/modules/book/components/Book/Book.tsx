import React, { FC } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Container } from './Book.styled';
import { ColDef } from 'ag-grid-community';
import { priceFormatter } from 'modules/ag-grid/formatter';
import { Order } from '../../types/order';

export interface BookProps {
  orders: Order[];
  showGridStoryBook?: boolean;
}

const Book: FC<BookProps> = props => {
  const { orders, showGridStoryBook } = props;
  const defaultColDef = {
    filter: true,
  };
  const columnDefs: ColDef[] = [
    {
      headerName: 'Trade Id',
      field: 'id',
    },
    {
      headerName: 'Status',
      field: 'status',
    },
    {
      headerName: 'Trade Date',
      field: 'tradeDate',
    },
    {
      headerName: 'Direction',
      field: 'direction',
    },
    {
      headerName: 'Ccy',
      field: 'InstrumentName',
    },
    {
      headerName: 'Notional',
      field: 'notionalAmount',
      valueFormatter: priceFormatter,
    },
    {
      headerName: 'Price',
      field: 'clientPrice',
      valueFormatter: priceFormatter,
    },
  ];
  return (
    <Container className="ag-theme-balham-dark">
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={orders}
        deltaRowDataMode={true}
        getRowNodeId={data => data.id}
        onGridReady={event => {
          event.api.sizeColumnsToFit();
        }}
        domLayout={showGridStoryBook ? 'autoHeight' : 'normal'}
      ></AgGridReact>
    </Container>
  );
};

export default Book;
