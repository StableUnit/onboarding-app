import React from "react";
import { ComponentMeta } from "@storybook/react";

import ButtonGray from "./ButtonGray";

export default {
    title: "Example/ButtonGray",
    component: ButtonGray,
} as ComponentMeta<typeof ButtonGray>;

export const Enabled = () => <ButtonGray text="Some text" />;

export const Disabled = () => <ButtonGray disabled>Statistics</ButtonGray>;
