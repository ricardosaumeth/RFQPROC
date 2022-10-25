import React from 'react';
import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import configureStore from 'modules/redux/store';
import Book from './Book';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Ag-Grid/Book',
  component: Book,
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
} as ComponentMeta<typeof Book>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Book> = args => <Book {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  orders: [{
    id: '632',
    InstrumentName: 'Z1 Index',
    clientId: 'morgan stanley',
    clientPrice: 7268.5,
    direction: 'Buy',
    notionalAmount: 1000000,
    clientTicketId: '1216400',
    status: 'Done',
    tradeDate: '20-Sep-2022',
  },
  {
    id: '633',
    InstrumentName: 'Z1 Index',
    clientId: 'morgan stanley',
    clientPrice: 7268.5,
    direction: 'Buy',
    notionalAmount: 1000000,
    clientTicketId: '1216402',
    status: 'Done',
    tradeDate: '20-Sep-2022',
  }]
};
