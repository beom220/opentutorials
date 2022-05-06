/* FIXME
*   Redux NPM import Error
*   이유를 찾지 못하여서 CDN 통해 호출...
*   바닐라형식으로 진행하느라 겪는 에러로 예상 */
const createStore = Redux.createStore;

const _contents = [
    {id:1,title:'HTML',desc:'HTML is ..'},
    {id:2,title:'CSS', desc:'CSS is ..'}
]

function reducer(state, action){

    if(state === undefined) {
        return  {
            max_id : 2,
            mode : 'welcome',
            selcted_id : 2,
            contents : _contents,
        }
    }

    let newState = {};
    if(action.type === 'SELECT'){
        newState = Object.assign(
            {},
            state,
            {
                selcted_id:action.id,
                mode:'read'
            }
        );
    }
    if(action.type === 'CREATE'){

    }
    if(action.type === 'REMOVE'){

    }
    // console.log(`action : ${action}`);
    // console.log(`state : ${state}`);
    // console.log(`newState : ${newState}`);
    // console.log(action);
    // console.log(state);
    // console.log(newState);
    console.log(newState);
    return newState;
}

const store = createStore(reducer);

export { store }