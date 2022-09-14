import React, { FC } from 'react';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { DateTime } from 'luxon';
import { priceFormatter, isValueIncreased } from 'modules/ag-grid/formatter';
import { Ticker } from 'modules/ticker/types/Ticker';
import { Container } from './Market.styled';
import Palette from 'theme/style';
import OrderPopup from 'core/components/Order';
import OrderConfirmation from 'core/components/Order/OrderConfirmation';

export interface MarketProps {
  tickers?: Ticker[] | undefined;
}

export interface DispatchProps {
  onClick: ({ currency, openModal }: { currency: Ticker; openModal: boolean }) => void;
}

export type Props = MarketProps & DispatchProps;

const Market: FC<Props> = props => {
  const { tickers, onClick } = props;
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
      cellStyle: ({ data }) => ({
        color: `${isValueIncreased(data.bid, data.lastBid) ? Palette.Positive : Palette.Negative}`,
        display: 'flex',
        justifyContent: 'flex-end',
      }),
      valueFormatter: priceFormatter,
    },
    {
      headerName: 'Ask Price',
      field: 'ask',
      cellStyle: ({ data }) => ({
        color: `${isValueIncreased(data.ask, data.lastAsk) ? Palette.Positive : Palette.Negative}`,
      }),
      valueFormatter: priceFormatter,
    },
  ];

  const rowClassRules = {
    'selected-row': (params: any) => params.node.isSelected(),
  };

  const onRowClicked = (event: RowClickedEvent<any>) => {
    onClick({
      currency: event.data,
      openModal: true,
    });
  };

  return (
    <Container className="ag-theme-balham-dark">
      <AgGridReact
        rowStyle={{ cursor: 'pointer' }}
        columnDefs={columnDefs}
        rowData={tickers}
        animateRows={true}
        rowClassRules={rowClassRules}
        getRowId={({ data }) => data?.currency}
        rowSelection={'single'}
        onGridReady={event => {
          event.api.sizeColumnsToFit();
        }}
        onRowClicked={onRowClicked}
      ></AgGridReact>
      <OrderPopup />
      <OrderConfirmation />
    </Container>
  );
};

export default Market;
