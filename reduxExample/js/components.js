import {store} from "./store.js";

const subject = () => {
    document.getElementById('subject')
        .innerHTML = `<header><h1>Web</h1><span>Hello, Web</span></header>`;
}

const topics = () => {
    /*NOTE
     *  map 함수가 문자열 형태로 값을 리턴할 때는 (template literals로 결합한 내용도 문자열 형태로 리턴되는 값이죠)
     *  기본적으로 쉼표(,) 로 묶어서 리턴한다는군요.*/
    const state = store.getState();
    const lists = state.contents;
    const list = lists.map((v, idx) => `<li><button type="button">${state.contents[idx].title}</button></li>`).join('');
    const btnEvent = () => {
        document.querySelectorAll('#topics button').forEach((button, key) => {
            button.addEventListener('click', () => {
                const action = {
                    type: 'SELECT',
                    id: state.contents[key].id
                };
                store.dispatch(action);
            })
        })
    }
    document.getElementById('topics').innerHTML =`<ol>${list}</ol>`;
    btnEvent();
}

const controls = () => {
    const state = store.getState();
    const btnEvent = () => {
        document.querySelectorAll('#control button').forEach(button => {
            button.addEventListener('click', e => {
                switch (e.target.className){
                    case 'js-add' :
                        store.dispatch({ type: 'CHANGE_MODE', mode: 'create'})
                        break;
                    case 'js-remove' :
                        if(state.mode !== 'read'){
                            alert('not read');
                        }
                        if(state.mode === 'read'){
                            if(confirm('Are you sure remove this?')){
                                store.dispatch({ type: 'REMOVE', mode: 'delete'})
                            }else {
                                alert('Remove cancel')
                            }
                        }
                        break;
                    case 'js-update' :
                        store.dispatch({ type: 'CHANGE_MODE', mode: 'update'})
                        break;
                    default : console.log('button case undefined');
                }
            });
        });
    };

    if(state.mode !== 'read'){
        document.getElementById('control').innerHTML =`<li><button class="js-add">작성</button></li>`;
    }
    if(state.mode === 'read'){
        document.getElementById('control').innerHTML =`
            <li><button class="js-add">작성</button></li>
            <li><button class="js-remove">삭제</button></li>
            <li><button class="js-update">수정</button></li>
        `;
    }
    btnEvent();
}

const content = () => {
    const state = store.getState();

    const onSubmit = () => {
        const $form = document.querySelector('.js-form');
        $form.addEventListener('submit', e => {
            e.preventDefault();
            const _title = e.target.title.value;
            const _desc = e.target.desc.value;

            if(_title === '') alert('we need title');
            else if(_desc === '') alert('we need description');
            else if(state.mode === 'create'){
                store.dispatch({
                    type : 'CREATE',
                    title : _title,
                    desc : _desc
                })
            }else if(state.mode === 'update'){
                const action = {
                    type: 'UPDATE',
                    id: state.selcted_id,
                    title : _title,
                    desc : _desc
                };
                store.dispatch(action);
            }
        })
    };

    if(state.mode === 'welcome'){
        document.getElementById('content')
            .innerHTML = `
                <article>
                    <p>안녕하세요</p>
                </article>
            `;
    }

    if(state.mode === 'read'){
        const aTitle = state.contents.map( v => v.id === state.selcted_id ? v.title : null).join('');
        const aDesc = state.contents.map( v => v.id === state.selcted_id ? v.desc : null).join('');

        document.getElementById('content')
            .innerHTML = `
                <article>
                    <h2>${aTitle}</h2>
                    ${aDesc}
                </article>
            `;
    }

    if(state.mode === 'create'){
        document.getElementById('content')
            .innerHTML = `
                <article>
                    <form class="js-form">
                        <p>
                            <input type="text" name="title" placeholder="title">
                        </p>
                        <p>
                            <textarea name="desc" placeholder="description"></textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                </article>
            `;
        onSubmit();
    }
    if(state.mode === 'update'){
        const content = state.contents[state.selcted_id - 1];
        document.getElementById('content')
            .innerHTML = `
                <article>
                    <form class="js-form">
                        <p>
                            <input type="text" name="title" placeholder="title" value="${content.title}">
                        </p>
                        <p>
                            <textarea name="desc" placeholder="description">${content.desc}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                </article>
            `;
        onSubmit();
    }
}

export { subject, topics, controls, content };