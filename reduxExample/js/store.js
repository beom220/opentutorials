/* NOTE
*   Redux NPM import Error
*   이유를 찾지 못하여서 CDN 통해 호출...
*   바닐라형식으로 진행하느라 겪는 에러로 예상 */
const createStore = Redux.createStore;

const _contents = [
    {
        id: 1,
        title: 'Lorem ipsum dolor sit amet,',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in consectetur ante. Sed condimentum orci et lectus sagittis, ut sodales nisi imperdiet. Nulla facilisi. Maecenas mattis massa sed enim malesuada, in maximus justo efficitur. Donec vel risus hendrerit, posuere lorem id, volutpat ante. Donec in sem eget nisl posuere accumsan ac eu ligula. Vestibulum sit amet felis sit amet nulla lacinia blandit ut vel tellus. Pellentesque mollis fermentum egestas. Aenean non elit at ligula semper ornare. Morbi pellentesque neque sed lacus faucibus efficitur. Praesent eu nisi a dolor fringilla tincidunt condimentum id est. Nulla facilisi. Etiam sagittis, justo sed efficitur maximus, arcu dolor dignissim justo, ac interdum magna massa in orci. Pellentesque hendrerit erat magna, vel porttitor enim tempor ut.'
    },
    {
        id: 2,
        title: 'quis tincidunt dapibus.',
        desc: 'Donec pharetra diam risus, non aliquet tellus vehicula a. Donec finibus aliquam purus sed sagittis. Curabitur pharetra metus nec ex ultrices vulputate. Nunc sed tortor mauris. Proin sed arcu magna. Praesent ac feugiat leo. Mauris condimentum felis quis tincidunt dapibus. Aenean ac dolor vel odio sagittis auctor quis sed turpis. Sed sed orci turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus consequat vulputate sapien quis ultrices. Quisque auctor euismod euismod. Duis magna enim, laoreet et enim sit amet, dapibus aliquam massa. Nullam vel enim elementum, molestie tellus et, mattis nunc. Cras nec euismod lorem.'
    },
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