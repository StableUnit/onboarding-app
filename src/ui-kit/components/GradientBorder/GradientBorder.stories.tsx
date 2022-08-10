import React from "react";
import { ComponentMeta } from "@storybook/react";

import GradientBorder from "./GradientBorder";

export default {
    title: "Example/GradientBorder",
    component: GradientBorder,
} as ComponentMeta<typeof GradientBorder>;

export const Default = () => (
    <GradientBorder>
        <div style={{ width: 200, height: 200, background: "black" }} />
    </GradientBorder>
);

export const WithBorder = () => (
    <GradientBorder borderRadius={24}>
        <div style={{ width: 200, height: 200, background: "black" }} />
    </GradientBorder>
);
