import {useState} from "react";
import AddNumber from "./AddNumber";

export default function AddNumberRoot(props){

    return (
        <div className="addNumberRoot">
            <h1>Add Number Root</h1>
            <AddNumber size={props.size} fn={props.fn}/>
        </div>
    )
}