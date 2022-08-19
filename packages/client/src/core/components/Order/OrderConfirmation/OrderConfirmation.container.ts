import { connect } from 'react-redux';
import { RootState } from 'modules/root';
import OrderConfirmation from './OrderConfirmation';
import { getTradeSelected } from 'modules/selection/selector';
import { getOrder } from '../PriceButton/selector';

const mapStateToProps = (state: RootState) => {
  const tradeSelected = getTradeSelected(state);
  const orderData = getOrder(state);

  return {
    orderData,
    tradeSelected,
  };
};

export default connect(mapStateToProps)(OrderConfirmation);
