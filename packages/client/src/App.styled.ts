import styled from 'styled-components';
import Palette from 'theme/style';

export const Container = styled.div`
  background-color: ${Palette.BackgroundColor};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 5px;
  padding: 5px 10px;
  width: 100%;
  height: 100%;
  grid-template-rows: 40px 70px 1fr 250px 50px;
  grid-template-columns: 400px 1fr 400px;
  grid-template-areas:
    'header header header'
    'tickers tickers tickers'
    'market candles depth'
    'trades book depth'
    'footer footer footer'; 
`;

export const Header = styled.div`
  grid-area: header;
  color: ${Palette.White};
  font-family: FiraSans-MediumItalic;
  background-color: #2d3436;
  padding: 0 0 0 10px;
  font-size: 28px;
`;

export const MarketPanel = styled.div`
  grid-area: market;
`;

export const TradesPanel = styled.div`
  grid-area: trades;
`;

export const BookPanel = styled.div` 
  grid-area: book;
`
export const CandlesPanel = styled.div` 
  grid-area: candles;
`
