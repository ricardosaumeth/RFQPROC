import FileSystem from 'fs';
import Papa from 'papaparse';
import { Currency } from './marketdata/types';
import { getJsonFiles, sortByTimeStamp } from './utils/utils';
import { AD1Files, GX1Files, Z1Files } from './marketdata/pathtoFiles';
import { AD1MockFiles, GX1MockFiles, Z1MockFiles } from './marketdata/__mocks__/pathtoMockFiles';

let csvFilesToProcessCounter = 1;
const allJsonFiles: Currency[][] = [];
const allCsvFilesToProcess = [AD1Files, GX1Files, Z1Files];
/**
 * loop through all cvs path and return a json file
 */
allCsvFilesToProcess.forEach(file => {
  getJsonFiles(file.path, file.name).then((response: Currency[]) => {
    mergeAllJsonFiles(response);
  });
});

const mergeAllJsonFiles = (file: Currency[]) => {
  allJsonFiles.push(file);

  if (allCsvFilesToProcess.length === csvFilesToProcessCounter) {
    convertFilesToCsv();
  }
  csvFilesToProcessCounter++;
};

const convertFilesToCsv = () => {
  const opts = { quotes: false, header: true, columns: ['contract_name', 'timestamp', 'bid', 'ask'] };
  let csv = Papa.unparse(sortByTimeStamp(allJsonFiles.flat()), opts);
  csv += '\r\n';
  printOutCsvFile(csv);
};

const printOutCsvFile = (sortedCsv: string) => {
  (async () => {
    const writeStream = FileSystem.createWriteStream(`./2013-05-21-futures_ticks.csv`);
    const overWaterMark = writeStream.write(sortedCsv);

    if (!overWaterMark) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
    writeStream.end(() => {
      console.log('File created');
    });
  })();
};
