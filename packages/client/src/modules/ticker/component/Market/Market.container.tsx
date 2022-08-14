import { RootState } from 'modules/root';
import { getTickers } from 'modules/ticker/selector';
import { connect } from 'react-redux';
import Market from './Market';

const mapStateToProps = (state: RootState) => {
  const tickers = getTickers(state);
  return {
    tickers,
  };
};

export default connect(mapStateToProps)(Market);
