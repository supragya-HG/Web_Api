import './ListItems.css'
import ListEntry from './ListEntry.js'

function AllListItems(ListArray){
    let List = [];
    for(let i=0; i<ListArray.length; i++){
        List.push(<ListEntry textData={ListArray[i].textData} ID={ListArray[i].ID}></ListEntry>)
    }

    return List;
}

function ListItems(props){
    return(
        <div>
            {AllListItems(props.ListArray)}
        </div>
    );
}

export default ListItems;