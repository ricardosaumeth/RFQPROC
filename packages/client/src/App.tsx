import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'modules/redux/store';
import { AppAction } from 'modules/app/actions';
import { BookPanel, Container, Content, Header, MarketPanel, TradesPanel } from 'App.styled';
import Widget from 'core/components/Widget';
import Market from 'modules/ticker/components/Market';
import Trades from 'modules/trades/components';
import Book from 'modules/book/components';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'theme/fonts.css';

function App() {
  const store = configureStore();

  useEffect(() => {
    store.dispatch(AppAction.bootstrapApp());
  }, []);

  return (
    <Provider store={store}>
      <Container>
        <Content>
          <Header>RFQPROC</Header>
          <MarketPanel>
            <Widget title="Market">
              <Market />
            </Widget>
          </MarketPanel>
          <TradesPanel>
            <Widget title="Trades Log">
              <Trades />
            </Widget>
          </TradesPanel>
          <BookPanel>
            <Widget title="Book">
              <Book />
            </Widget>
          </BookPanel>
        </Content>
      </Container>
    </Provider>
  );
}

export default App;
