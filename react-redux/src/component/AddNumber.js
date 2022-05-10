import { useState} from "react";

export default function AddNumber(props) {

    return (
        <div className="addNumber">
            <h1>Add Number</h1>
            <input type="button" value="+" onClick={props.fn}/>
            <input type="text" value={props.size} readOnly/>
        </div>
    )
}