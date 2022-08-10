import React from "react";
import * as Sentry from "@sentry/react";

import { addErrorNotification } from "utils/notification";

interface Props {
    children: any;
}

class ErrorBoundary extends React.Component<Props> {
    componentDidCatch(error: Error) {
        Sentry.captureException(error);
        addErrorNotification("Internal Error", error.message);
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

export default ErrorBoundary;
