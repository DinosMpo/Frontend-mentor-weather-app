import React from 'react'
import "./TopNav.css";

export default function TopNav() {
    return (
        <div className="top-nav">
            <div className="top-wrapper">
                <img src="/logo.svg" />
                {/* <div id="logo">Weather Now</div>
          */}
                <div id="units">Units</div>
            </div>
            <div id="title">How's the sky looking today?</div>
            <div id="search-wrapper">
                <div id="search-text">
                    {/* <div>img</div> */}
                    <img id="search-img" src="/icon-search.svg" />
                    <input type="text" placeholder="Search for a place..." />
                </div>
                <div id="search-button">Search</div>
            </div>
        </div>
    )
}
