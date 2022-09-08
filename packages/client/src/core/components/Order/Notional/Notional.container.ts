import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NotionalValueActions } from './action';
import NotionalInput from './Notional';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onClick: (notionValue: string) =>
      dispatch(
        NotionalValueActions.notionalValue({
          value: notionValue,
        })
      ),
  };
};

export default connect(undefined, mapDispatchToProps)(NotionalInput);
