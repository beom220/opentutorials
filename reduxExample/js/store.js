/* NOTE
*   Redux NPM import Error
*   이유를 찾지 못하여서 CDN 통해 호출...
*   바닐라형식으로 진행하느라 겪는 에러로 예상 */
const createStore = Redux.createStore;

const _contents = [
    {id:1,title:'HTML',desc:'HTML is ..'},
    {id:2,title:'CSS', desc:'CSS is ..'}
]

function reducer(state, action){

    // INITIALIZE ...
    if(state === undefined) {
        return  {
            max_id : 2,
            mode : 'read',
            selcted_id : 2,
            contents : _contents,
        }
    }

    let newState = {};
    // READ ...
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
    // CREATE ...
    if(action.type === 'CREATE'){
        const newMaxId = state.max_id + 1;
        const newContents = state.contents.concat();
        newContents.push({id: newMaxId,title: action.title,desc: action.desc});
        newState = Object.assign({},state,
            {
                max_id: newMaxId,
                mode: 'read',
                selcted_id : newMaxId,
                contents: newContents,
            }
        );
    }
    // TODO REMOVE ...
    if(action.type === 'REMOVE'){
        console.log('actionType : remove');
    }
    // CHANGE_MODE ...
    if(action.type === 'CHANGE_MODE') {
        newState = Object.assign({}, state, {
            mode: action.mode
        });
    }
    console.log(newState);
    return newState;
}

const store = createStore(reducer);

export { store }