import type { Meta, StoryObj } from '@storybook/angular';
import { HighchartsComponent } from 'projects/components/src/lib/highcharts/highcharts.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<HighchartsComponent> = {
  title: 'Components/Highcharts',

  component: HighchartsComponent,
  render: (args: HighchartsComponent) => ({
    props: {
      ...args,
    },
  }),
  tags: ['autodocs'], // Enables automatic docs generation with props
  // parameters: {
  //   // Controls the order or behavior of docs/props
  //   docs: {
  //     description: {
  //       component: 'This is a button component used for actions.',
  //     },
  //   },
  // },
  parameters: {
    controls: {
      exclude: ['ngOnInit', 'ngOnDestroy', 'ngAfterViewInit'],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    previewTabs: {
      'storybook/docs/panel': { index: -1 },
      canvas: { title: 'Story' },
    },
  },

  argTypes: {
    title: {
      control: 'text',
    },
    data: {
      control: 'select',
      options: [
        [
          73, 55, 6, 82, 4, 44, 14, 15, 59, 3, 52, 72, 42, 6, 37, 86, 36, 21,
          97, 73, 95, 47, 64, 56, 24, 6, 24, 5, 96, 21, 63, 33, 23, 50, 86, 96,
          29, 35, 1, 13, 84, 98, 91, 69, 66, 91, 51, 20, 13, 83,
        ],
        [
          24, 10, 34, 80, 5, 89, 33, 72, 68, 18, 25, 26, 94, 52, 1, 51, 13, 35,
          81, 47,
        ],
        [22, 44, 55, 99, 33],
      ],
    },
    type: {
      name: 'Type',
      control: 'select',
      options: ['area', 'line', 'column', 'bar', 'pie'],
    },
  },
};

export default meta;
type Story = StoryObj<HighchartsComponent>;
export const LineChart: Story = {
  name: 'Line Chart',
  args: {
    title: 'This is a chart title',
    type: 'line',
  },
};
export const ColumnChart: Story = {
  name: 'Column Chart',
  args: {
    title: 'Column Chart',
    type: 'column',
  },
};
export const barChart: Story = {
  name: 'Bar Chart',
  args: {
    title: 'Bar Chart',
    type: 'bar',
  },
};
export const areaChart: Story = {
  name: 'Area Chart',
  args: {
    title: 'Area Chart',
    type: 'area',
  },
};
export const pieChar: Story = {
  name: 'Pie Chart',
  args: {
    title: 'Pie Chart',
    type: 'pie',
  },
};
