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
export const Primary: Story = {
  args: {
    label: 'This is a Label',
    type: 'text',
  },
};
export const Filled: Story = {
  args: {
    appearance: 'fill',
    label: 'This is a Label',
    type: 'text',
  },
};
export const WithIcon: Story = {
  args: {
    prefixIcon: 'add',
    suffixIcon: 'clear',
    label: 'With Suffix and Prefix',
    type: 'text',
  },
};
