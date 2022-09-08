import React, { FC } from 'react';
import { Direction } from 'modules/trades/types';
import { customNumberFormatter } from 'utils/formatNumber';
import { Big, CenteringContainer, DirectionLabel, Pip, Price, Tenth, TradeButton } from './PriceButton.styled';
import { Ticker } from 'modules/ticker/types/Ticker';
import { SelectionState } from 'modules/selection/reducer';
import { OrderConfirmationState } from '../OrderConfirmation/reducer';
import { ExecutionAction } from 'services/executions/actions';

const formatSimple = customNumberFormatter();

interface IPriceButtonProps {
  direction: Direction;
  order: SelectionState;
  onClick: () => void;
}

const PriceButtonInner: FC<IPriceButtonProps> = ({ direction, order, onClick }) => {
  let pip = '';
  let tenth = '';
  let bigFigureNumber = 1;
  const [pipsPosition] = [2];
  let rateString = direction === Direction.Buy ? order?.currency?.bid?.toString() : order?.currency?.ask?.toString();
  if (rateString !== undefined) {
    const [wholeNumber, fractions_] = rateString?.split('.');
    const fractions = fractions_ || '00000';

    const formatToMin2IntDigits = customNumberFormatter({
      minimumIntegerDigits: 2,
    });

    pip = formatToMin2IntDigits(Number(fractions.substring(pipsPosition - 2, pipsPosition)));
    tenth = formatSimple(Number(fractions.substring(pipsPosition, pipsPosition + 1)));

    bigFigureNumber = Number(wholeNumber + '.' + fractions.substring(0, pipsPosition - 2));
  }

  return (
    <TradeButton direction={direction} onClick={onClick}>
      <Price disabled={false}>
        <CenteringContainer>
          <DirectionLabel>{direction.toUpperCase()}</DirectionLabel>
          <Big>{rateString ? bigFigureNumber + '.' : '-'}</Big>
        </CenteringContainer>
        {rateString && (
          <>
            <Pip>{pip}</Pip>
            <Tenth>{tenth}</Tenth>
          </>
        )}
      </Price>
    </TradeButton>
  );
};

const PriceButtonContainer: FC<IPriceButtonProps> = ({ direction, order, onClick }) => {
  return <PriceButtonInner direction={direction} order={order} onClick={onClick} />;
};

interface PriceButton {
  direction: Direction;
  order: SelectionState;
  notionalValue: { value: string };
}

export interface DispatchProps {
  onSendExecution: (currency: Ticker, direction: Direction, notionalValue: { value: string }) => void;
  onCloseModal: (currency: Ticker, openModal: boolean) => void;
}

export type Props = PriceButton & DispatchProps;

const PriceButton: FC<Props> = ({ direction, order, notionalValue, onCloseModal, onSendExecution }) => {
  const onSendOrderFn = () => {
    onSendExecution(order?.currency as Ticker, direction, notionalValue);
    order?.currency && onCloseModal(order?.currency, false);
  };

  return <PriceButtonContainer direction={direction} order={order} onClick={onSendOrderFn} />;
};

export default PriceButton;
