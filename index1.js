const mapListItems = new Map();

if(localStorage.getItem('uniqueListID') === null){
    localStorage.setItem("uniqueListID", 0);
}
let uniqueListID = localStorage.getItem('uniqueListID');
let listIDString = 'listEntry';

const listButton_1 = document.querySelector('.list-button-1');
const listButton_2 = document.querySelector('.list-button-2');
const listItems_1 = document.querySelector('.list-items-1');
const listItems_2 = document.querySelector('.list-items-2');

document.addEventListener('DOMContentLoaded', getListData);

listButton_1.addEventListener("click", addListItem);
listButton_2.addEventListener("click", addListItem);
listItems_1.addEventListener("click", doAction);
listItems_2.addEventListener("click", doAction);


listItems_1.setAttribute('ondrop', "drop(event)");
listItems_1.setAttribute('ondragover', "allowDrop(event)");

listItems_2.setAttribute('ondrop', "drop(event)");
listItems_2.setAttribute('ondragover', "allowDrop(event)");



var listItem = {
    listID : 0,
    itemID : 0,
    listData : '<Empty List>',
    
    fillData : function(listnum, itemnum, listtext){
        this.listID = listnum;
        this.itemID = itemnum;
        if(listtext.trim() !== '')this.listData = listtext.trim();
    },

    renderList : function(){
        let listDiv = document.createElement("div");
        listDiv.classList.add("list-data");
        listDiv.setAttribute('draggable',true);
        listDiv.setAttribute('ondragstart', 'drag(event)');
        listDiv.id = this.itemID;

        let newLi = document.createElement('li');
        newLi.classList.add('list-text');
        newLi.innerText = this.listData;
        listDiv.appendChild(newLi);

        let editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.classList.add('edit-button');
        listDiv.appendChild(editButton);

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.classList.add('delete-button');
        listDiv.appendChild(deleteButton);

        mapListItems.set(this.itemID, this);
        return listDiv;
    },

    updateList: function(newData){
        // console.log(newData);

        newData = newData.trim();
        if(newData === ''){
            newData = '<Empty List>';
        }
        this.editLocalStorageData(newData);
        this.listData = newData;
        const listDiv = document.querySelector('#'+this.itemID);
        const newListDiv = this.renderList();
        listDiv.replaceWith(newListDiv);

        
    },

    editList : function(){
        // console.log("update", this.listData);

        const listDiv = document.querySelector('#' + this.itemID);
        let updateForm = document.createElement('form');
        updateForm.innerHTML = '<input type="text" class="list-update-input">  <button class="list-update-button" type="submit">Update</button>';
        const updateFormInput = updateForm.querySelector('.list-update-input');
        if(this.listData === '<Empty List>'){
            updateFormInput.value = '';
        }
        else{
            updateFormInput.value = '';
        }
        
        listDiv.querySelector('.list-text').remove();
        listDiv.querySelector('.edit-button').remove();
        listDiv.querySelector('.delete-button').remove();

        listDiv.appendChild(updateForm);
        const updateButton = listDiv.querySelector('.list-update-button');
        updateButton.addEventListener("click", updateData);
        
    },

    deleteList : function(){
        // console.log("delete", this.listData);
        const listDiv = document.querySelector('#' + this.itemID);
        listDiv.parentElement.removeChild(listDiv);
        this.deleteLocalStorageData();
    },


    saveLocalList : function (){
        let listItems1, listItems2;
        if(this.listID === 1){
            if(localStorage.getItem('listItems1') === null){
                listItems1 = [];
            }
            else{
                listItems1 = JSON.parse(localStorage.getItem("listItems1"));
            }
        
            listItems1.push(this);
            localStorage.setItem("listItems1", JSON.stringify(listItems1))    
        }
        else if(this.listID === 2){
            if(localStorage.getItem('listItems2') === null){
                listItems2 = [];
            }
            else{
                listItems2 = JSON.parse(localStorage.getItem("listItems2"));
            }
        
            listItems2.push(this);
            localStorage.setItem("listItems2", JSON.stringify(listItems2))    
        }   
    },
    
    editLocalStorageData : function (newData){
        // console.log(listData, listNum);
        let searchID = this.itemID;
        if(this.listID === 1){
                listItems1 = JSON.parse(localStorage.getItem("listItems1"));
                // console.log(typeof(listItems1[0].itemID));
                // var foundId = listItems1.find(function(element){
                //     return element.itemID > this.itemID;
                // });
                let foundID = -1;
                listItems1.forEach(function(listEntry){
                    //IMP
                    // console.log(listEntry.itemID , this.itemID);
                    foundID++;
                    if(listEntry.itemID === searchID){
                        // console.log(sea);
                        listItems1[foundID].listData = newData;
                        
                    }
                });
                localStorage.setItem("listItems1", JSON.stringify(listItems1));
        }
        else if(this.listID === 2){
            listItems2 = JSON.parse(localStorage.getItem("listItems2"));
            
            let foundID = -1;
            listItems2.forEach(function(listEntry){
                foundID++;
                if(listEntry.itemID === searchID){
                    listItems2[foundID].listData = newData;
                }
            });
            localStorage.setItem("listItems2", JSON.stringify(listItems2));
        }
    
    },


    deleteLocalStorageData : function(){
        let searchID = this.itemID;
        if(this.listID === 1){
            listItems1 = JSON.parse(localStorage.getItem("listItems1"));
            let foundID = -1;
            listItems1.forEach(function(listEntry){
                foundID++;
                if(listEntry.itemID === searchID){
                    listItems1.splice(foundID,1);
                }
            });
        localStorage.setItem("listItems1", JSON.stringify(listItems1));
        }
        else if(this.listID === 2){
            listItems2 = JSON.parse(localStorage.getItem("listItems2"));
            let foundID = -1;
            listItems2.forEach(function(listEntry){
                foundID++;
                if(listEntry.itemID === searchID){
                    listItems2.splice(foundID,1);
                }
            });
        localStorage.setItem("listItems2", JSON.stringify(listItems2));
        }


        mapListItems.delete(this.itemID);
    }


}



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
}

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
}

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
}



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
       
        listItemsCurrent.appendChild(listDiv)
    
    })

    listItems2.forEach(function(listEntry){
        const listItemsCurrent = document.querySelector(".list-items-2");
        let listObject = Object.create(listItem);
        listObject.fillData(listEntry.listID, listEntry.itemID, listEntry.listData);
        const listDiv =  listObject.renderList();
       
        listItemsCurrent.appendChild(listDiv)
    
    })
}



function drag(ev) {
    // console.log(ev.target);
    ev.dataTransfer.setData("text", ev.target.id);
  }

function allowDrop(ev) {
    ev.preventDefault();
  }
  
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


  }
