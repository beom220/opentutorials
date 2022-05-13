import DisplayNumber from "../component/DisplayNumber";
import store from "../store";
import {useState} from "react";

export default function Component(){
    const [state, setState] = useState({number : store.getState().number})

    store.subscribe(()=>{
        setState({number: store.getState().number})
    })

    return <DisplayNumber number={state.number}/>
}