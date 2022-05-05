import React from "react";

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const style = {
        textAlign: "center"
    }


    return <div className="item" 
                style = {styles}
                onClick={props.holdDice}>
        <p>{props.value === 1? <span className="dot"></span>:
            props.value ===2?  <div style={style}>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>: 
          props.value ===3?
          <div style={style}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          </div>
          : props.value ===4 ?
          <div style={style}>
            <div className="dot--4">
          <span className="dot"></span>
          <span className="dot"></span>
          </div>
          <div className="dot--4">
          <span className="dot"></span>
          <span className="dot"></span>
          </div>
          </div>
          :props.value === 5 ?
          <div style={style}>
              <div className="dot--5">
          <span className="dot"></span>
          <span className="dot"></span>
          </div>
          <span className="dot dot--1"></span>
          <div className="dot--5">
          <span className="dot"></span>
          <span className="dot"></span>
          </div>
          </div>
          :props.value === 6?
          <div style={style}>
              <div className="dot--4">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          </div>
          <div className="dot--4">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          </div>
          </div>:props.value}</p>
    </div>
}