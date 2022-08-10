import React from "react";
import { ComponentMeta } from "@storybook/react";

import GradientHref from "./GradientHref";

export default {
    title: "Example/GradientHref",
    component: GradientHref,
} as ComponentMeta<typeof GradientHref>;

export const Default = () => <GradientHref href="https://stableunit.org/">Borrow</GradientHref>;

export const Disabled = () => (
    <div style={{ background: "black", width: 400, height: 400 }}>
        <GradientHref href="https://stableunit.org/" disabled>
            Borrow
        </GradientHref>
    </div>
);

export const Text = () => <GradientHref>Some text</GradientHref>;
