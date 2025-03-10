import { Meta, StoryObj } from "@storybook/react";
import Button from "./Btn"; // 컴포넌트 불러오기

const meta: Meta<typeof Button> = {
  title: "Components/Button",  // Storybook UI에서 보여질 경로
  component: Button,  // 테스트할 컴포넌트
  tags: ["autodocs"], // 자동 문서화 활성화
  argTypes: {
    onClick: { action: "clicked" }, // 이벤트 확인 가능
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "Click Me",
    size: "medium",
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
};
