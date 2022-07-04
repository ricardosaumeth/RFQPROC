export interface FileTypes {
  name: string;
  path: string[];
}

export const AD1Files: FileTypes = {
  name: 'AUD Curcy',
  path: [
    './src/marketdata/files/AD1_Curncy/2017_03_24.csv',
    './src/marketdata/files/AD1_Curncy/2017_03_27.csv',
    './src/marketdata/files/AD1_Curncy/2017_03_28.csv',
    './src/marketdata/files/AD1_Curncy/2017_03_29.csv',
    './src/marketdata/files/AD1_Curncy/2017_03_30.csv',
    './src/marketdata/files/AD1_Curncy/2017_03_31.csv',
  ],
};

export const GX1Files: FileTypes = {
  name: 'GX1 Index',
  path: [
    './src/marketdata/files/GX1_Index/2017_03_24.csv',
    './src/marketdata/files/GX1_Index/2017_03_27.csv',
    './src/marketdata/files/GX1_Index/2017_03_28.csv',
    './src/marketdata/files/GX1_Index/2017_03_29.csv',
    './src/marketdata/files/GX1_Index/2017_03_30.csv',
    './src/marketdata/files/GX1_Index/2017_03_31.csv',
  ],
};

export const Z1Files: FileTypes = {
  name: 'Z1 Index',
  path: [
    './src/marketdata/files/Z1_Index/2017_03_24.csv',
    './src/marketdata/files/Z1_Index/2017_03_27.csv',
    './src/marketdata/files/Z1_Index/2017_03_28.csv',
    './src/marketdata/files/Z1_Index/2017_03_29.csv',
    './src/marketdata/files/Z1_Index/2017_03_30.csv',
    './src/marketdata/files/Z1_Index/2017_03_31.csv',
  ],
};
