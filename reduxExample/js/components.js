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
    const list = state.contents;
    const lists = list.map( (v, idx) => `<li><button type="button">${state.contents[idx].title}</button></li>`).join('');

    console.log(state);
    document.getElementById('topics')
        .innerHTML =`<ol>${lists}</ol>`;

    document.querySelectorAll('#topics button').forEach((button, key) => {
        button.addEventListener('click', e => {
            const action = {
                type:'SELECT',
                id:state.contents[key].id
            };
            store.dispatch(action);
            console.log(state.action)
        })
    })
}

const controls = () => {
    const state = store.getState();

    document.getElementById('control')
        .innerHTML =`
            <li><button class="js-add">추가</button></li>
            <li><button class="js-remove">삭제</button></li>
        `;

    document.querySelectorAll('#control button').forEach(button => {
        button.addEventListener('click', e => {

            switch (e.target.className){
                case 'js-add' :
                    console.log('add');
                    break;
                case 'js-remove' :
                    console.log('remove');
                    break;
                default : console.log('button case undefined');
            }
        });
    });
}

const content = () => {
    const state = store.getState();
    console.log('contentMode', state.mode);

    if(state.mode === 'read'){
        const aTitle = state.contents.map( (v) => v.id === state.selcted_id ? v.title : null).join('');
        const aDesc = state.contents.map( (v) => v.id === state.selcted_id ? v.desc : null).join('');
        console.log(aTitle)
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

        const form = document.querySelector('.js-form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const _title = e.target.title.value;
            const _desc = e.target.desc.value;
            console.log(_title, _desc);
            store.dispatch({
                type : 'CREATE',
                title : _title,
                desc : _desc
            })
        })
    }
    if(state.mode === 'welcome'){
        document.getElementById('content')
            .innerHTML = `
                <article>
                    <p>안녕하세요</p>
                </article>
            `;
    }
    // else {
    //     document.getElementById('content')
    //         .innerHTML = `
    //             <article>
    //                 <p>에러...</p>
    //             </article>
    //         `;
    // }

}

export { subject, topics, controls, content };