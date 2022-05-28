import AddNumber from "../component/AddNumber";
import {connect} from "react-redux";

/* NOTE connect의 두번째 인자값
    reduxDispatch to ReactProps
 */
function mapDispatchToProps(dispatch){
    return {
        onClick(size) {
            dispatch({type: 'INCREMENT', size: size})
        }
    }
}
export default connect(null,mapDispatchToProps)(AddNumber);

// export default function Component(){
//     return <AddNumber onClick={(size)=>{
//         store.dispatch({type:'INCREMENT', size: size})
//     }}/>
// }