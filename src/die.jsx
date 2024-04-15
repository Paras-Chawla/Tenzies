/* eslint-disable react/prop-types */
// import React from "react";

export default function Die(props){
    const styles={backgroundColor: props.isHeld? "#59E391" :"white"}
    return(
    <div onClick={props.dieHold} className="dice" style={styles}>
        <h2 className="die-num">{props.dieValue}</h2>
    </div>
    );
}