import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'modules/redux/store';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Order from './Order';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Order',
  component: Order,
  decorators: [
    Story => (
      <Provider store={configureStore()}>
        <Story />
      </Provider>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Order>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Order> = args => <Order {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  order: {
    currency: {
      id: 1,
      currency: 'AUD Curcy',
      ask: 76.22,
      bid: 76.22,
      lastAsk: 76.22,
      lastBid: 76.22,
      timestamp: 20170324,
    },
    isModalOpen: true,
  },
};
