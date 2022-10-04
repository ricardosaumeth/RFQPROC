import { connect } from 'react-redux';
import { RootState } from 'modules/root';
import Trades from './Trades';
import { getTrades } from 'modules/trades/selector';

const mapStateToProps = (state: RootState) => {
  console.log(state.trades)
  debugger
  const trades = getTrades(state);
  return {
    trades,
  };
};

export default connect(mapStateToProps)(Trades);
