import { RefDataAction } from 'modules/reference-data/actions';
import refData from './reducer';

describe('RefDataReducer', () => {
  it('should set ref data', () => {
    const currencies = ['Z1 Index'];
    const action = RefDataAction.refDataLoadAck({
      currencies,
    });
    const result = refData(undefined, action);
    expect(result).toEqual({
      currencies,
    });
  });
});
