import { createSelector } from 'reselect';
import { RootState } from 'modules/root';

const bookSelector = (state: RootState) => state.book;

export const getRawBook = createSelector(bookSelector, book => book);
