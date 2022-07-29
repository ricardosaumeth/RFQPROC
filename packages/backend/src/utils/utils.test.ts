import { AD1MockFiles } from './../marketdata/__mocks__/pathtoMockFiles';
import { Currency } from './../marketdata/types';
import { getJsonFiles, sortByTimeStamp } from './utils';

test('should sort by TimeStamp', () => {
  const timestamp: Currency[] = [
    {
      type: 'A',
      price: 1,
      volume: 2,
      timestamp: '2017-03-27T17:54:18.000',
      bid: 1,
      ask: 2,
    },
    {
      type: 'A',
      price: 1,
      volume: 2,
      timestamp: '2017-03-24T17:54:18.000',
      bid: 1,
      ask: 2,
    },
  ];

  const sortedTimestamp = sortByTimeStamp(timestamp);
  expect(sortedTimestamp).toEqual([
    {
      type: 'A',
      price: 1,
      volume: 2,
      timestamp: '2017-03-24T17:54:18.000',
      bid: 1,
      ask: 2,
    },
    {
      type: 'A',
      price: 1,
      volume: 2,
      timestamp: '2017-03-27T17:54:18.000',
      bid: 1,
      ask: 2,
    },
  ]);
});

test('should return a json file', async () => {
  const results = await getJsonFiles(['./src/marketdata/__mocks__/files/AD1_Curncy/2017_03_24_2.csv'], 'AUD Curcy');
  expect(results).toEqual([
    {
      timestamp: '2017-03-24T00:00:00.000',
      price: '76.22',
      type: 'B',
      volume: '2',
      contract_name: 'AUD Curcy',
      bid: '76.22',
      ask: '76.22',
    },
    {
      timestamp: '2017-03-24T00:00:00.000',
      price: '76.22',
      type: 'A',
      volume: '8',
      contract_name: 'AUD Curcy',
      bid: '76.22',
      ask: '76.22',
    },
  ]);
});

test('should add bid and ask price', async () => {
  const results = await getJsonFiles(['./src/marketdata/__mocks__/files/AD1_Curncy/2017_03_24_2.csv'], 'AUD Curcy');
  expect(results[0].bid).toEqual('76.22');
});
