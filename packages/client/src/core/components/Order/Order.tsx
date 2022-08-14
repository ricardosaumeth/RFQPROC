import React, { FC, useState, useEffect } from 'react';
import {
  Container,
  Panel,
  HeaderWrapper,
  TileSymbol,
  DeliveryDate,
  PriceControlWrapper,
  PriceControlsStyle,
  InputTimerStyle,
} from './Order.styled';
import { format } from 'date-fns';
import PriceButton from './PriceButton';
import { Direction } from 'modules/trades/types';
import NotionalInput from './Notional';
import { Provider } from '../Order/Order.context';
import { Ticker } from 'modules/ticker/types/Ticker';
import { SelectionState } from 'modules/selection/reducer';

export interface OrderProps {
  order: SelectionState;
}

export interface DispatchProps {
  onCloseModal: (order: Ticker, openModal: boolean) => void;
}

export type Props = OrderProps & DispatchProps;

const Order: FC<Props> = props => {
  const { order, onCloseModal } = props;
  const [open, setOpen] = useState(order?.isModalOpen);
  const openModal = order?.isModalOpen;
  const handleClose = () => {
    setOpen(!openModal);
    order?.currency && onCloseModal({}, false);
  };

  useEffect(() => {
    if (order?.isModalOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [order?.isModalOpen]);

  const InputTimerWrapper = () => {
    return (
      <Provider value={{ currency: order?.currency }}>
        <InputTimerStyle>
          <NotionalInput />
        </InputTimerStyle>
      </Provider>
    );
  };

  return (
    <Container
      open={open || false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Panel>
        <HeaderWrapper>
          <TileSymbol data-qa="tile-header__tile-symbol">{order?.currency?.currency}</TileSymbol>
          <DeliveryDate data-qa="tile-header__delivery-date">
            {`SPT (${format(new Date(), 'dd MMM').toUpperCase()})`}
          </DeliveryDate>
        </HeaderWrapper>
        <PriceControlWrapper>
          <PriceControlsStyle>
            <PriceButton direction={Direction.Sell} />
            <PriceButton direction={Direction.Buy} />
          </PriceControlsStyle>
        </PriceControlWrapper>
        <InputTimerWrapper />
      </Panel>
    </Container>
  );
};

export default Order;
