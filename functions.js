
function addEvents(){
    listButton_1.addEventListener("click", addListItem);
    listButton_2.addEventListener("click", addListItem);
    listItems_1.addEventListener("click", doAction);
    listItems_2.addEventListener("click", doAction);


    listItems_1.setAttribute('ondrop', "drop(event)");
    listItems_1.setAttribute('ondragover', "allowDrop(event)");

    listItems_2.setAttribute('ondrop', "drop(event)");
    listItems_2.setAttribute('ondragover', "allowDrop(event)");

};

function addListItem(event){
    event.preventDefault();
    // console.log("Adding List Entry");
    const parentForm = event.target.parentElement; 
    const parentList = parentForm.parentElement;
    // Imp 
    const listItemsCurrent = parentList.querySelector("[class^=list-items");
    // console.log(listItemsCurrent.classList[0]);
    let listNum;
    if(listItemsCurrent.classList[0] === 'list-items-1'){
        listNum = 1;
    }
    else if(listItemsCurrent.classList[0] === 'list-items-2'){
        listNum = 2;
    }

    const listInput = parentForm.querySelector('.list-input');
    var listEntry = Object.create(listItem);
    listEntry.fillData(listNum, listIDString + uniqueListID, listInput.value);
    uniqueListID++;
    localStorage.setItem("uniqueListID", uniqueListID);
    listInput.value = '';

    const listDiv = listEntry.renderList();
    listEntry.saveLocalList();

    if(listNum === 1){
        listItems_1.appendChild(listDiv);
    }
    else if(listNum === 2){
        listItems_2.appendChild(listDiv);
    }
};

function doAction(event){
    event.preventDefault();
    const item = event.target;
    // console.log(item);
    // console.log(item.classList);
    
    const list = item.parentElement;
    const listID = list.id;
    const listEntry = mapListItems.get(listID);


    if(item.classList[0] === 'delete-button'){
        listEntry.deleteList();
    }
    else if(item.classList[0] === 'edit-button'){
        listEntry.editList();
        
    }
};

function updateData(event){
    event.preventDefault();
    const item = event.target;
    // console.log(item);
    // console.log(item.classList);
    
    const list = item.parentElement;
    const listID = list.parentElement.id;
    // console.log(list.querySelector('.list-update-input').value);
    const listEntry = mapListItems.get(listID);
    const newData = list.querySelector('.list-update-input').value;
    listEntry.updateList(newData);
};



function getListData(){
    let listItems1, listItems2;
    
    if(localStorage.getItem('listItems1') === null){
        listItems1 = [];
    }
    else{
        listItems1 = JSON.parse(localStorage.getItem("listItems1"));
    }

    if(localStorage.getItem('listItems2') === null){
        listItems2 = [];
    }
    else{
        listItems2 = JSON.parse(localStorage.getItem("listItems2"));
    }


    listItems1.forEach(function(listEntry){
        const listItemsCurrent = document.querySelector(".list-items-1");
        let listObject = Object.create(listItem);
        listObject.fillData(listEntry.listID, listEntry.itemID, listEntry.listData);
        const listDiv =  listObject.renderList();
       
        listItemsCurrent.appendChild(listDiv);
    
    })

    listItems2.forEach(function(listEntry){
        const listItemsCurrent = document.querySelector(".list-items-2");
        let listObject = Object.create(listItem);
        listObject.fillData(listEntry.listID, listEntry.itemID, listEntry.listData);
        const listDiv =  listObject.renderList();
       
        listItemsCurrent.appendChild(listDiv);
    
    })
};



function drag(ev) {
    // console.log(ev.target);
    ev.dataTransfer.setData("text", ev.target.id);
  };

function allowDrop(ev) {
    ev.preventDefault();
  };
  
function drop(ev) {
    ev.preventDefault();
    // console.log(ev.target);
    let dropTarget = ev.target;
    let dropClass = dropTarget.classList[0];
    if(dropClass === 'list-text' || dropClass === 'edit-button' || dropClass === 'delete-button'){
        dropTarget = dropTarget.parentElement.parentElement;
    }

    var data = ev.dataTransfer.getData("text");
    var droppingElement = document.getElementById(data);
    // console.log(droppingElement.parentElement.classList);
    // console.log(data);

    let listNumDropped, listNumDroppedTo;
    if(droppingElement.parentElement.classList[0] === 'list-items-1'){
        listNumDropped = 1;
    }
    else if(droppingElement.parentElement.classList[0] === 'list-items-2'){
        listNumDropped = 2;
    }

    if(dropTarget.classList[0] === 'list-items-1'){
        listNumDroppedTo = 1;
    }
    else if(dropTarget.classList[0] === 'list-items-2'){
        listNumDroppedTo = 2;
    }

    // const DropData = droppingElement.childNodes[0].innerText;
    // console.log(DropData, listNumDropped, listNumDroppedTo);
    listEntry = mapListItems.get(data);
    listEntry.deleteLocalStorageData();
    droppingElement.parentElement.removeChild(droppingElement);
    listEntry.listID = listNumDroppedTo;
    listEntry.saveLocalList();

    dropTarget.appendChild(listEntry.renderList());


};
