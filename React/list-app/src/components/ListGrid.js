import './ListGrid.css'
import {useState} from 'react';
import ListItems from './ListItems.js';


function ListGrid(){
    let ListArray = [{textData: "fsh", ID: 0},{textData: "fshsdkfhb", ID: 1},{textData: "fshsdkfhbdfb", ID: 2},{textData: "fshsdkfhbdfb", ID: 3}];
    let UniqueID = 0
    
    function formSubmitHandler(e){
        e.preventDefault();
        const listInput1 = document.getElementById('listInput1');
        console.log(listInput1.value);
        let Obj = {};
        Obj.textData = listInput1.value;
        Obj.ID = UniqueID;
        UniqueID++;
        ListArray.push(Obj);
        console.log(ListArray);
    }

    return(
        <div>
            <form>
                <input type='text' id='listInput1' name='list1' placeholder='Enter Your List Item'></input>
                <button type='submit' onClick= {formSubmitHandler}>Submit</button>
            </form>

            <ListItems ListArray = {ListArray}></ListItems>
        </div>
    );
}

export default ListGrid;