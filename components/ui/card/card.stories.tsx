import type { Meta, StoryObj } from "@storybook/react"

import { Card } from "./index"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => (
    <Card className="w-[420px] p-6">
      <h3 className="text-2xl font-normal">Account</h3>
      <hr className="my-3 dark:opacity-30" />
      <div className="mt-3">
        <span className="mr-1 font-bold">Address:</span> 235345345345
      </div>
      <div className="mt-3">
        <span className="mr-1 font-bold">Balance:</span> 345345345345
      </div>
      <div className="mt-3">
        <span className="mr-1 font-bold">Nonce:</span> 345345353
      </div>
      <hr className="my-3 dark:opacity-30" />
    </Card>
  ),
}
