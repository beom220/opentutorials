import AddNumber from "../component/AddNumber";
import store from "../store";

export default function Component(){
    return <AddNumber onClick={(size)=>{
        store.dispatch({type:'INCREMENT', size: size})
    }}/>
}