import csvToJSON from 'csvtojson';
import { Currency } from '../marketdata/types';

export const sortByTimeStamp = (response: Currency[]) =>
  response.sort((x, y) => {
    const a = new Date(x.timestamp);
    const b = new Date(y.timestamp);
    if (a > b) return 1;
    if (a < b) return -1;

    return 0;
  });

/**
 *
 * @param data And array of string with the path of the csv files to process
 * @param name The name of the currency
 * mergeCsvFiles
 * adds the header to the file including contract name
 * @returns the merged files
 */
export const getJsonFiles = async (data: string[], name: string): Promise<Currency[]> => {
  const promises = data.map(path => {
    return new Promise<Currency[]>(async resolve => {
      const source = await csvToJSON({
        noheader: true,
        headers: ['timestamp', 'price', 'type', 'volume', 'contract_name'],
        trim: true,
      }).fromFile(path);

      const s: Currency[] = source.map(s => {
        return {
          ...s,
          ['contract_name']: name,
        };
      });

      addBidAskHeader(s, resolve);
    });
  });

  return Promise.all(promises).then(responses => {
    return responses.flat();
  });
};

/**
 *
 * @param source
 * @param callback
 * add the bid and the ask price in a string format . e.g. 76.22,76.23
 */
export const addBidAskHeader = (
  source: Currency[],
  callback: (value: Currency[] | PromiseLike<Currency[]>) => void
) => {
  let lastBid = source[0].price;
  let lastAsk = source[0].price;
  const updatedSource = source.map(s => {
    if (s.type === 'B') {
      lastBid = s.price;
    } else if (s.type === 'A') {
      lastAsk = s.price;
    }
    s.bid = lastBid;
    s.ask = lastAsk;

    return {
      ...s,
    };
  });
  callback(updatedSource);
};
