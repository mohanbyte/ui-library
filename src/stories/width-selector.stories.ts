import type { Meta, StoryObj } from '@storybook/angular';

import { WidthSelectorComponent } from '../../projects/components/src/lib/width-selector/width-selector.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WidthSelectorComponent> = {
  title: 'Example/WidthSelector',
  component: WidthSelectorComponent,
  tags: ['autodocs'],
  render: (args: WidthSelectorComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    // placeholder: {
    //   control: 'number', //Specifies the type of control
    // },
  },
};

export default meta;
type Story = StoryObj<WidthSelectorComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'text',
    placeholder: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    type: 'number',
    placeholder: 'accent',
  },
};
