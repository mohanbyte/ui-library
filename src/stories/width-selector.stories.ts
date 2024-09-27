import type { Meta, StoryObj } from '@storybook/angular';

import { WidthSelectorComponent } from '../../projects/components/src/lib/width-selector/width-selector.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WidthSelectorComponent> = {
  title: 'Form Field/WidthSelector',
  excludeStories: ['WidthStories'],
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
export const Default: Story = {
  args: {
    placeholder: 'Primary',
    prefixIcon: 'lock',
    suffixIcon: 'visibility',
    type: 'text',
  },
};

export const Custom: Story = {
  args: {
    ...Default.args,
    suffixIcon: 'check',
  },
};
