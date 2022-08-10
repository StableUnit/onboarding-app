import React from "react";
import { ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
    title: "Example/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

export const Enabled = () => <Button text="Connect wallet" />;

export const Disabled = () => <Button disabled>SWAP</Button>;
