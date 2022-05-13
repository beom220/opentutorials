import store from "../store";
import {useState} from "react";
export default function DisplayNumber(props){
    const [state, setState] = useState({number : store.getState().number})

    store.subscribe(()=>{
        setState({number: store.getState().number})
    })

    return (
        <div className="displayNumber">
            <h1>DisplayNumber</h1>
            <input type="text" value={state.number} readOnly/>
        </div>
    )
}