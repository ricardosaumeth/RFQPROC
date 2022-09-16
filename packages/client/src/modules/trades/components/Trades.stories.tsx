import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import configureStore from 'modules/redux/store';
import Trades from './Trades';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Ag-Grid/Trades',
  component: Trades,
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
} as ComponentMeta<typeof Trades>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Trades> = args => <Trades {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  trades: [
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
      currency: 'AUD Curcy',
      ask: 76.21,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.2,
      timestamp: 20170329,
    },
    {
      id: 3,
      currency: 'AUD Curcy',
      ask: 76.21,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.2,
      timestamp: 20170329,
    },
    {
      id: 4,
      currency: 'GX1 Index',
      ask: 12094.5,
      bid: 12095.5,
      lastAsk: 12094.5,
      lastBid: 12095,
      timestamp: 20170324,
    },
    {
      id: 5,
      currency: 'Z1 Index',
      ask: 7279,
      bid: 7278,
      lastAsk: 7278,
      lastBid: 7279,
      timestamp: 20170324,
    },
    {
      id: 6,
      currency: 'Z1 Index',
      ask: 7279,
      bid: 7278,
      lastAsk: 7278,
      lastBid: 7279,
      timestamp: 20170324,
    },
  ],
};
