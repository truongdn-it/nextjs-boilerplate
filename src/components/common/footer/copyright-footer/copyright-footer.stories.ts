import type { Meta, StoryObj } from '@storybook/react';

import CopyrightFooter from '.';

const meta = {
  title: 'components/common/copyright-footer',
  component: CopyrightFooter,
} satisfies Meta<typeof CopyrightFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
