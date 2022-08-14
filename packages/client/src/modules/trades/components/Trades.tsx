import React, { FC } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { DateTime } from 'luxon';
import { priceFormatter, isValueIncreased } from 'modules/ag-grid/formatter';
import { Ticker } from 'modules/ticker/types/Ticker';
import { Container } from './Trades.styled';
import Palette from 'theme/style';

export interface TradesProps {
  trades: Ticker[] | undefined;
}

const Trades: FC<TradesProps> = props => {
  const { trades } = props;
  const columnDefs: ColDef[] = [
    {
      headerName: 'Ccy',
      field: 'currency',
    },
    {
      headerName: 'Time',
      field: 'timestamp',
      valueFormatter: params => DateTime.fromISO(params.value).toLocaleString(DateTime.TIME_24_WITH_SECONDS),
    },
    {
      headerName: 'Bid Price',
      field: 'bid',
      enableCellChangeFlash: true,
      cellStyle: ({ data }) => ({
        color: `${isValueIncreased(data.bid, data.lastBid) ? Palette.Positive : Palette.Negative}`,
        display: 'flex',
        justifyContent: 'flex-end',
      }),
      type: 'numericColumn',
      valueFormatter: priceFormatter,
    },
    {
      headerName: 'Ask Price',
      field: 'ask',
      enableCellChangeFlash: true,
      cellStyle: ({ data }) => ({
        color: `${isValueIncreased(data.ask, data.lastAsk) ? Palette.Positive : Palette.Negative}`,
      }),
      valueFormatter: priceFormatter,
    },
  ];

  return (
    <Container className="ag-theme-balham-dark">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={trades}
        animateRows={false}
        asyncTransactionWaitMillis={4000}
        getRowId={({ data }) => data?.id}
        rowSelection={'single'}
        onGridReady={event => {
          event.api.sizeColumnsToFit();
        }}
      ></AgGridReact>
    </Container>
  );
};

export default Trades;
