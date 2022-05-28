import DisplayNumber from "../component/DisplayNumber";
import {connect} from "react-redux";

/* NOTE connect의 첫번째 인자값
    mapReduxState To ReactProps
*/
function mapStateToProps(state){
    // Note Redux의 state값을 인자로 받음.
    return {
        number:state.number
    }
}


// NOTE connect 리턴값이 함수,그 리턴된 함수를 실행 && Redux의 store값이 변경될때마다 호출
export default connect(mapStateToProps)(DisplayNumber);

// import store from "../store";
// import {useState} from "react";
//
// export default function Component(){
//     const [state, setState] = useState({number : store.getState().number})
//
//     store.subscribe(()=>{
//         setState({number: store.getState().number})
//     })
//
//     return <DisplayNumber number={state.number}/>
// }