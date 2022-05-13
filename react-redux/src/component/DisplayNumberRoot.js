import DisplayNumber from "./DisplayNumber";

export default function DisplayNumberRoot(props){
    return (
        <div className="displayNumberRoot">
            <h1>DisplayNumberRoot</h1>
            <DisplayNumber number={props.number}/>
        </div>
    )
}