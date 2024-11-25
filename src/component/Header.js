import "./Header.css"
import React
 from "react";
const Header=()=>{
    console.log("Header Update");
    return (
    <div className="Header">
        <h2> 오늘은 📆</h2>
        <h1>{new Date().toDateString()}</h1>

    </div>
    );
};
export default React.memo(Header);