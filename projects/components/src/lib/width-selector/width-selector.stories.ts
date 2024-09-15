import type { Meta, StoryObj } from '@storybook/angular';

import { WidthSelectorComponent } from './width-selector.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<WidthSelectorComponent> = {
  title: 'Example/Button',
  component: WidthSelectorComponent,
  tags: ['autodocs'],
  render: (args: WidthSelectorComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    placeholder: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<WidthSelectorComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    text: 'Button',
    placeholder: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Button',
    placeholder: 'accent',
  },
};

export const Large: Story = {
  args: {
    text: 'Button',
  },
};

export const Small: Story = {
  args: {
    text: 'Button',
  },
};
