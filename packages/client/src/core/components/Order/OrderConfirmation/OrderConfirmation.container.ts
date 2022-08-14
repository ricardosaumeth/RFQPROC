import { connect } from 'react-redux';
import { RootState } from 'modules/root';
import OrderConfirmation from './OrderConfirmation';

// add reselect
const mapStateToProps = (state: RootState) => {
  return {
    orderData: state?.sendOrder,
    tradeSelected: state.tradeSelected,
  };
};

export default connect(mapStateToProps)(OrderConfirmation);
