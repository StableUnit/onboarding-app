import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";

import "react-notifications-component/dist/theme.css";

import App from "./components/App/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { initialState, StateContext, DispatchContext } from "./reducer/constants";
import reducer from "./reducer";

import "./index.scss";

const AppContainer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ErrorBoundary>
            <ReactNotification />
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    <App />
                </DispatchContext.Provider>
            </StateContext.Provider>
        </ErrorBoundary>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <AppContainer />
    </React.StrictMode>,
    document.getElementById("root")
);
