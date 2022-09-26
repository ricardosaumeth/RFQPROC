import { RootState } from 'modules/root';
import { connect } from 'react-redux';
import { getRawBook } from '../selector';
import Book from './Book';

const mapStateToProps = (state: RootState) => {
  const book = getRawBook(state);

  return {
    orders: book.orders,
  };
};

export default connect(mapStateToProps)(Book);
