import type { Meta, StoryObj } from '@storybook/angular';
import { IoFormFieldComponent } from 'projects/components/src/lib/io-form-field/io-form-field.component';
import { PresetDateTimePickerComponent } from 'projects/components/src/public-api';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<IoFormFieldComponent> = {
  title: 'Form Field/FormField',
  component: IoFormFieldComponent,
  tags: ['autodocs'],
  render: (args: IoFormFieldComponent) => ({
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
type Story = StoryObj<IoFormFieldComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
