import './ListEntry.css'


function ListEntry(props){
    return(
        <div>
            <div id={props.ID}>{props.textData}</div>
        </div>
    );
}

export default ListEntry;