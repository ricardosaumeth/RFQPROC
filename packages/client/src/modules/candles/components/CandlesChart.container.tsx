import { connect } from 'react-redux';
import CandlesChart from './CandlesChart';
import { RootState } from 'modules/root';
import { getCandles } from '../selectors';
import { getCurrentCurrency } from 'modules/reference-data/selector';

const mapStateToProps = (state: RootState) => {
  const currency = getCurrentCurrency(state);
  const candles = getCandles(state)(currency);

  return {
    candles,
    currency,
  };
};

export default connect(mapStateToProps)(CandlesChart);
