import { connect } from 'react-redux';
import { RootState } from 'modules/root';
import { getCurrencies } from 'modules/reference-data/selector';
import { getTradeSelected } from 'modules/selection/selector';
import { getDepth } from 'modules/book/selector';
import DepthChart from './DepthChart';

const mapStateToProps = (state: RootState) => {
  const currencies = getCurrencies(state);
  const tradeSelected = getTradeSelected(state);
  const currency = tradeSelected.currency?.currency ? (tradeSelected.currency?.currency as string) : currencies[0];
  const trades = getDepth(state)(currency);

  return {
    ...trades,
    currency,
  };
};

export default connect(mapStateToProps)(DepthChart);