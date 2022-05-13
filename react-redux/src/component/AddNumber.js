import {useState} from "react";

export default function AddNumber(props) {
    const [size, setSize] = useState(1);
    const onChange = (e) => setSize(Number(e.target.value));
    return (
        <div className="addNumber">
            <h1>Add Number</h1>
            <input type="button" value="+" onClick={()=>
                props.onClick(size)
            }/>
            <input type="text" value={size} onChange={onChange}/>
        </div>
    )
}