import React from 'react'
import './Error.css';

export default function Error({setRetry}) {
    return (
        <div id="error-container">
            {/* <div></div> */}
            <img id="error-img" alt="error" src="./icon-error.svg" />
            <div id="error-title">Something went wrong</div>
            <div id="error-description">We couldn't connect to the server (API error). Please try again in a few moments.</div>
            <div id="error-retry-button" onClick={() => setRetry(true)}>
                <img alt="error" src="./icon-retry.svg" />
                Retry
            </div>
        </div>
    )
}
