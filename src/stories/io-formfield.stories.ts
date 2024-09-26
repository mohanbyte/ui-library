import type { Meta, StoryObj } from '@storybook/angular';
import { IoFormFieldComponent } from 'projects/components/src/lib/io-form-field/io-form-field.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<IoFormFieldComponent> = {
  title: 'COMPONENTS/Input Field',

  component: IoFormFieldComponent,
  tags: ['autodocs'],
  render: (args: IoFormFieldComponent) => ({
    props: {
      ...args,
    },
  }),

  argTypes: {
    label: {
      control: 'text',
    },
    showLabel: {
      control: 'boolean',
      defaultValue: false,
    },
    hint: {
      control: 'text', //Specifies the type of control
    },
    showHint: {
      control: 'boolean',
      defaultValue: false,
    },

    showCounter: {
      control: 'boolean',
      defaultValue: false,
    },
    counterLimit: {
      control: 'number',
      defaultValue: 20,
    },
    requiredField: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<IoFormFieldComponent>;
export const Default: Story = {
  args: {
    label: 'Label',
  },
};
export const withPrefix: Story = {
  args: {
    ...Default.args,
    prefixIcon: 'lock',
  },
};
export const withSuffix: Story = {
  args: {
    ...Default.args,
    suffixIcon: 'clear',
  },
};
export const bothIcons: Story = {
  args: {
    ...withPrefix.args,
    ...withSuffix.args,
  },
};
export const textarea: Story = {
  args: {
    ...Default.args,
    type: 'textarea',
  },
};
