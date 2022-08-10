import React from "react";
import { ComponentMeta } from "@storybook/react";

import ButtonGradient from "./ButtonGradient";

export default {
    title: "Example/ButtonGradient",
    component: ButtonGradient,
} as ComponentMeta<typeof ButtonGradient>;

export const Enabled = () => (
    <div style={{ width: "400px" }}>
        <ButtonGradient width={400} text="SWAP" />
    </div>
);

export const Disabled = () => (
    <div style={{ width: "400px" }}>
        <ButtonGradient width={400} disabled>
            SWAP
        </ButtonGradient>
    </div>
);
