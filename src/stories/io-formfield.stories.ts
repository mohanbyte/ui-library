import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import type { Meta, StoryObj } from '@storybook/angular';
import { IoFormFieldComponent } from 'projects/components/src/lib/io-form-field/io-form-field.component';

const meta: Meta<IoFormFieldComponent> = {
  title: 'Components/Input Field/Text Input',
  component: IoFormFieldComponent,

  render: (args: IoFormFieldComponent) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [BrowserAnimationsModule],
    },
  }),

  //tags: ['autodocs'],
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
    showLabel: {
      control: 'boolean',
      defaultValue: true,
    },
    label: {
      name: 'Label',
      control: 'text',
      if: { arg: 'showLabel', truthy: true },
    },

    // Conditional hint
    showHint: {
      control: 'boolean',
      defaultValue: false,
    },
    hint: {
      control: 'text',
      if: { arg: 'showHint', truthy: true }, // This ensures 'hint' is only available when showHint is true
    },
    errorText: {
      control: 'text',
    },
    // Counter-related props
    showCounter: {
      control: 'boolean',
      defaultValue: false,
    },
    counterLimit: {
      control: 'number',
      defaultValue: 20,
      if: { arg: 'showCounter', truthy: true },
    },

    requiredField: {
      control: 'boolean',
      defaultValue: false,
    },

    // Suffix-related props
    suffixType: {
      control: 'select',
      options: ['text', 'icon', 'none'],
      defaultValue: 'none',
    },
    suffixText: {
      control: 'text',
      if: { arg: 'suffixType', eq: 'text' }, // Only display when suffixType is 'text'
    },
    suffixIcon: {
      control: 'select',
      options: [
        'account_circle',
        'keyboard_capslock',
        'lock',
        'download_2',
        'cloud_download',
        'arrow_drop_down',
        'visibility',
      ],
      if: { arg: 'suffixType', eq: 'icon' }, // Only display when suffixType is 'icon'
    },

    // Prefix-related props
    prefixType: {
      control: 'select',
      options: ['text', 'icon', 'none'],
      defaultValue: 'none',
    },
    prefixText: {
      control: 'text',
      if: { arg: 'prefixType', eq: 'text' }, // Only display when prefixType is 'text'
    },
    prefixIcon: {
      control: 'select',
      options: [
        'account_circle',
        'keyboard_capslock',
        'lock',
        'download_2',
        'cloud_download',
        'arrow_drop_down',
        'visibility',
      ],
      if: { arg: 'prefixType', eq: 'icon' }, // Only display when prefixType is 'icon'
    },
  },
};

export default meta;
type Story = StoryObj<IoFormFieldComponent>;
export const Default: Story = {
  name: 'Text Input - Default State',
  args: {
    showLabel: true,
    label: 'Label',
    type: 'text',
    requiredField: true,
  },
};
export const disabled: Story = {
  name: 'Text Input - Disable State',
  args: {
    disabled: true,
    showLabel: true,
    label: 'Password',
    type: 'password',
    requiredField: true,
    prefixType: 'icon',
    suffixType: 'icon',
    prefixIcon: 'lock',
    suffixIcon: 'visibility',
  },
};
// export const errorState: Story = {
//   name: 'Text Input - Error State',
//   args: {
//     showLabel: true,
//     label: 'Password',
//     type: 'password',
//     requiredField: true,
//   },
// };
export const withLabel: Story = {
  name: 'Text Input With Supporting Text',
  args: {
    showLabel: true,
    label: 'Label',
    type: 'text',
    requiredField: true,
    hint: 'This is a supporting text',
    showHint: true,
  },
};

export const numberCounter: Story = {
  name: 'Text Input With Text/Number Counter',
  args: {
    showLabel: true,
    label: 'Label',
    type: 'text',
    requiredField: true,
    showCounter: true,
    counterLimit: 20,
  },
};

export const withPlaceholder: Story = {
  name: 'Text Input With PlaceHolder',
  args: {
    showLabel: true,
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
  name: 'Text Input With Prefix',
  args: {
    label: 'Label',
    type: 'text',
    showLabel: true,
    prefixType: 'icon',
    requiredField: true,
    prefixIcon: 'lock',
  },
};
// export const withPrefixText: Story = {
//   name: 'Text Input with Prefix Text',
//   args: {
//     label: 'Label',
//     type: 'text',
//     showLabel: true,
//     prefixType: 'text',
//     requiredField: true,
//     prefixText: 'textdasdasdas',
//   },
// };

export const withSuffix: Story = {
  name: 'Text Input With Suffix',
  args: {
    label: 'Label',
    type: 'text',
    showLabel: true,
    suffixType: 'icon',
    requiredField: true,
    suffixIcon: 'clear',
  },
};

export const bothIcons: Story = {
  name: 'Text Input With Prefix & Suffix',
  args: {
    label: 'Label',
    type: 'text',
    requiredField: true,
    prefixType: 'icon',
    suffixType: 'icon',
    prefixIcon: 'lock',
    showLabel: true,
    suffixIcon: 'clear',
  },
};
export const password: Story = {
  name: 'Password Input',
  args: {
    showLabel: true,
    label: 'Password',
    type: 'password',
    requiredField: true,
    prefixType: 'icon',
    suffixType: 'icon',
    prefixIcon: 'lock',
    suffixIcon: 'visibility',
  },
};
