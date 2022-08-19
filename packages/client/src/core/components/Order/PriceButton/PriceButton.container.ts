import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Direction } from 'modules/trades/types';
import { RootState } from 'modules/root';
import PriceButton from './PriceButton';
import { Ticker } from 'modules/ticker/types/Ticker';
import { SendOrderActions } from './action';
import { SelectionActions } from 'modules/selection/action';
import { getTradeSelected } from 'modules/selection/selector';
import { getNotionalValue } from '../Notional/selector';

const mapStateToProps = (state: RootState) => {
  const tradeSelected = getTradeSelected(state);
  const notionalValue = getNotionalValue(state);
  return {
    order: tradeSelected,
    notionalValue,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSendOrder: (currency: Ticker, direction: Direction, notionalValue: { value: string }) =>
      dispatch(
        SendOrderActions.sendOrder({
          currency,
          direction,
          notionalValue,
        })
      ),
    onCloseModal: (currency: Ticker, openModal: boolean) =>
      dispatch(
        SelectionActions.selectCurrency({
          currency,
          openModal,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceButton);
