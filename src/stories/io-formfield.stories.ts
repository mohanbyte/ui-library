import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { Meta, StoryObj } from '@storybook/angular';
import { IoFormFieldComponent } from 'projects/components/src/lib/io-form-field/io-form-field.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<IoFormFieldComponent> = {
  title: 'Components/Input Field',

  component: IoFormFieldComponent,

  render: (args: IoFormFieldComponent) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [BrowserAnimationsModule],
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
    actions: { argTypesRegex: '^on[A-Z].*' },
    previewTabs: {
      'storybook/docs/panel': { index: -1 },
      canvas: { title: 'Story' },
    },
  },

  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'number', 'email', 'password', 'tel', 'url'],
    },
    placeholder: {
      control: 'text',
    },
    label: {
      name: 'Label',
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
    suffixType: {
      control: 'select',
      options: ['text', 'icon', 'none'],
      defaultValue: 'none',
    },

    suffixText: {
      control: 'text',
      defaultValue: '@gmail.com',
      //if: { arg: 'suffixType', eq: 'text' },
    },
    suffixIcon: {
      control: 'text',
      defaultValue: 'edit',
      //  if: { arg: 'suffixType', eq: 'icon' },
    },

    prefixType: {
      control: 'select',
      options: ['text', 'icon', 'none'],
    },
    prefixText: {
      control: 'text',
      defaultValue: '+91',
      // if: { arg: 'prefixType', eq: 'text' },
    },
    prefixIcon: {
      control: 'text',
      defaultValue: '@gmail.com',
      // if: { arg: 'prefixType', eq: 'icon' },
    },
  },
};

export default meta;
type Story = StoryObj<IoFormFieldComponent>;
export const Default: Story = {
  name: 'Text Input',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
  },
};

export const withLabel: Story = {
  name: 'Text Input with Help Text',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
    hint: 'This is a supporting text',
    showHint: true,
  },
};

export const numberCounter: Story = {
  name: 'Text Input with Text/Number Counter',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
    showCounter: true,
    counterLimit: 20,
  },
};

export const withPlaceholder: Story = {
  name: 'Text Input with Placeholder',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
    placeholder: 'Placeholder',
  },
};

export const withoutLabel: Story = {
  name: 'Text Input Without Label',
  args: {
    hint: 'This is a supporting text',
    showHint: true,
  },
};

export const withPrefix: Story = {
  name: 'Text Input with Prefix Icon',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
    prefixIcon: 'lock',
  },
};

export const withSuffix: Story = {
  name: 'Text Input with Suffix Icon',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
    suffixIcon: 'clear',
  },
};

export const bothIcons: Story = {
  name: 'Text Input with Prefix & Suffix Icon',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
    prefixIcon: 'lock',
    suffixIcon: 'clear',
  },
};
