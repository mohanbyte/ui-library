import type { Meta, StoryObj } from '@storybook/angular';
import { PresetDateTimePickerComponent } from 'projects/components/src/public-api';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<PresetDateTimePickerComponent> = {
  title: 'Date Pickers/PresentDateTimePicker',
  component: PresetDateTimePickerComponent,
  tags: ['autodocs'],
  render: (args: PresetDateTimePickerComponent) => ({
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
type Story = StoryObj<PresetDateTimePickerComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'date',
  },
};

export const No_Labels: Story = {
  args: {
    type: 'date-time',
    showDurationLabels: false,
  },
};
