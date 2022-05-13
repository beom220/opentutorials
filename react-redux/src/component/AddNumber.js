import store from "../store";
import {useState} from "react";

export default function AddNumber() {
    const [number, setNumber] = useState(1);
    const onChange = (e) => setNumber(Number(e.target.value));
    return (
        <div className="addNumber">
            <h1>Add Number</h1>
            <input type="button" value="+" onClick={()=>
                store.dispatch({type:'INCREMENT', size: number})
            }/>
            <input type="text" value={number} onChange={onChange}/>
        </div>
    )
}