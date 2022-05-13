export default function DisplayNumber(props){
    return (
        <div className="displayNumber">
            <h1>DisplayNumber</h1>
            <input type="text" value={props.number} readOnly/>
            {props.unit}
        </div>
    )
}