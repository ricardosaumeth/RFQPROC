import React, { FC } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { DateTime } from 'luxon';
import { priceFormatter } from 'modules/ag-grid/formatter';
import { Ticker } from 'modules/ticker/types/Ticker';
import { Container } from './Market.styled';
import Palette from 'theme/style';
import { isEmpty } from 'lodash';

export interface StateProps {
  tickers: Ticker[] | undefined;
}

export type Props = StateProps;

const Market: FC<Props> = props => {
  const { tickers } = props;
  const updatedTickers = tickers?.filter(ticker => !isEmpty(ticker));
  const columnDefs: ColDef[] = [
    {
      headerName: 'Ccy',
      field: 'currency',
      cellStyle: () => ({
        fontSize: '15px'
      }),
    },
    {
      headerName: 'Time',
      field: 'timestamp',
      valueFormatter: params => DateTime.fromISO(params.value).toLocaleString(DateTime.TIME_24_WITH_SECONDS),
      cellStyle: () => ({
        fontSize: '16px',
      }),
    },
    {
      headerName: 'Bid Price',
      field: 'bid',
      cellStyle: () => ({
        color: Palette.Bid,
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '16px',
      }),
      type: 'numericColumn',
      valueFormatter: priceFormatter,
    },
    {
      headerName: 'Ask Price',
      field: 'ask',
      cellStyle: () => ({
        color: Palette.Ask,
        fontSize: '16px',
      }),
      valueFormatter: priceFormatter,
    },
  ];

  const rowClassRules = {
    'selected-row': (params: any) => params.node.isSelected(),
  };

  const showRowData = (data: Ticker) => {
    console.log(data);
    return data?.currency;
  };

  return (
    <Container className="ag-theme-balham-dark">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={updatedTickers}
        rowClassRules={rowClassRules}
        getRowId={({ data }) => showRowData(data)}
        rowSelection={'single'}
        onGridReady={event => {
          event.api.sizeColumnsToFit();
        }}
      ></AgGridReact>
    </Container>
  );
};

export default Market;
