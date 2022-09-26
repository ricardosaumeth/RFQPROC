import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import configureStore from 'modules/redux/store';
import Market from './Market';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Ag-Grid/Market',
  component: Market,
  args: {
    showGridStoryBook: true
  },
  decorators: [
    Story => (
      <Provider store={configureStore()}>
        <Story />
      </Provider>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Market>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Market> = args => <Market {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  tickers: [
    {
      id: 1,
      currency: 'AUD Curcy',
      ask: 76.21,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.2,
      timestamp: 20170329,
    },
    {
      id: 2,
      currency: 'GX1 Index',
      ask: 12094.5,
      bid: 12095.5,
      lastAsk: 12094.5,
      lastBid: 12095,
      timestamp: 20170324,
    },
    {
      id: 3,
      currency: 'Z1 Index',
      ask: 7279,
      bid: 7278,
      lastAsk: 7278,
      lastBid: 7279,
      timestamp: 20170324,
    },
  ],
};
