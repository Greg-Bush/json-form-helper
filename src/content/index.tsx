import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

window.onload = async () => {
    const body = document.getElementsByTagName('body')[0]
    const rootDiv = document.createElement('div')
    body.appendChild(rootDiv)

    const root = ReactDOM.createRoot(rootDiv);

    root.render(
        // <React.StrictMode>
        <App />
        // </React.StrictMode>
    );
};
