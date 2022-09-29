import { connect } from 'react-redux';
import CandlesChart from './CandlesChart';
import { RootState } from 'modules/root';
import { getCandles } from '../selectors';
import { getCurrencies } from 'modules/reference-data/selector';
import { getTradeSelected } from 'modules/selection/selector';

const mapStateToProps = (state: RootState) => {
  const currencies = getCurrencies(state);
  const tradeSelected = getTradeSelected(state);
  const currency = tradeSelected.currency?.currency ? (tradeSelected.currency?.currency as string) : currencies[0];
  const candles = getCandles(state)(currency);

  return {
    data: candles,
    currency,
  };
};

export default connect(mapStateToProps)(CandlesChart);
