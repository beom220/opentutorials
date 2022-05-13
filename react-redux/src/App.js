import AddNumberRoot from "./component/AddNumberRoot";
import DisplayNumberRoot from "./component/DisplayNumberRoot";
import {useState} from "react";

function App() {
    const [number, setNumber] = useState(1);
    const [size, setSize] = useState(1);

    const onClick = () => setNumber(number + size);
    const onChangeSize = (v) => setSize(v);

    return (
        <div className="App">
            <h1>Root</h1>
            <AddNumberRoot size={size} onClick={onClick} onChange={onChangeSize}/>
            <DisplayNumberRoot number={number}/>
        </div>
    );
}

export default App;
