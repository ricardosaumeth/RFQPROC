import { RootState } from 'modules/root';
import { SelectionActions } from 'modules/selection/action';
import { getTradeSelected } from 'modules/selection/selector';
import { getTickers } from 'modules/ticker/selector';
import { Ticker } from 'modules/ticker/types/Ticker';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Market, { DispatchProps } from './Market';

const mapStateToProps = (state: RootState) => {
  const tickers = getTickers(state);
  const tradeSelected = getTradeSelected(state);
  return {
    tickers,
    tradeSelected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onClick: ({ currency, openModal }: { currency: Ticker; openModal: boolean }) =>
      dispatch(
        SelectionActions.selectCurrency({
          currency,
          openModal,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);
