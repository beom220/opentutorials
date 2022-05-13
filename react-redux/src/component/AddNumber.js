import store from "../store";

export default function AddNumber(props) {
    const onChange = (e) => props.onChange(Number(e.target.value));
    return (
        <div className="addNumber">
            <h1>Add Number</h1>
            <input type="button" value="+" onClick={()=>
                store.dispatch({type:'INCREMENT', size: props.size})
            }/>
            <input type="text" value={props.size} onChange={onChange}/>
        </div>
    )
}