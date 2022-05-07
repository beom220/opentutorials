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
            mode : 'welcome',
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
    // REMOVE ...
    if(action.type === 'REMOVE'){
        const newMaxId = state.max_id - 1;
        const newContents = state.contents.filter(v => v.id !== state.selcted_id);
        newState = Object.assign({}, state, {
            max_id: newMaxId,
            mode: 'welcome',
            contents : newContents
        })
    }
    // UPDATE ...
    if(action.type === 'UPDATE'){
        const newContents = state.contents.concat();
        newContents[action.id -1] = Object.assign({}, newContents[action.id -1], {desc: action.desc, title: action.title});
        // newContents[action.id -1] = {...newContents[action.id -1], desc: action.desc, title: action.title};
        newState = Object.assign({}, state, {mode : 'read', contents: newContents});
    }
    // CHANGE_MODE ...
    if(action.type === 'CHANGE_MODE') {
        newState = Object.assign({}, state, {
            mode: action.mode
        });
    }
    return newState;
}

const store = createStore(reducer);

export { store }