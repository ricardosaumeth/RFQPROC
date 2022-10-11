import React, { FC, useState, useEffect, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Direction } from 'modules/trades/types';
import { OrderConfirmationState } from './reducer';
import { SelectionState } from 'modules/selection/reducer';
import { isEmpty } from 'lodash';
import { addDecimalPointsToNumberString } from 'modules/ag-grid/formatter';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface OrderConfirmationProps {
  orderData: OrderConfirmationState;
  tradeSelected: SelectionState;
}

const OrderConfirmation: FC<OrderConfirmationProps> = props => {
  const {
    orderData: { currency, direction, notionalValue },
    tradeSelected,
  } = props;
  const [openConfirmationMsg, setConfirmatinMsg] = useState(false);
  const symbol = currency?.currency;
  const price = direction === Direction.Buy ? currency?.bid : currency?.ask;
  const execution = direction === Direction.Buy ? 'bought' : 'sold';
  const notionalAmount = notionalValue?.value ? notionalValue.value : '';

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setConfirmatinMsg(false);
  };

  useEffect(() => {
    if (!tradeSelected.isModalOpen && !isEmpty(tradeSelected?.currency) && !isEmpty(currency)) {
      setConfirmatinMsg(true);
    }
  }, [tradeSelected, currency]);

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      <Snackbar
        open={openConfirmationMsg}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          You {execution} {symbol} {addDecimalPointsToNumberString(notionalAmount)} at a price of {price}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default OrderConfirmation;
