import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'modules/root';
import { Ticker } from '../../../modules/ticker/types/Ticker';
import { SelectionActions } from 'modules/selection/action';
import Order from './Order';
import { getTradeSelected } from 'modules/selection/selector';

const mapStateToProps = (state: RootState) => {
  return {
    order: getTradeSelected(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onCloseModal: (currency: Ticker, openModal: boolean) =>
      dispatch(
        SelectionActions.selectCurrency({
          currency,
          openModal,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
