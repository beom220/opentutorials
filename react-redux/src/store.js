import {createStore} from "redux";

// 2번째 인자값은 Redux DevTools 이용하기 위한 값
export default createStore(function(state, action){
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())