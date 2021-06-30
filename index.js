// const listInput1 = document.querySelector('.list-input');
// const listButton1 = document.querySelector('.list-button');
// const listItems1 = document.querySelector('.list-items');

// const listInput = document.querySelector('.list-input');



// why this works
let uniqueListID = 0;
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


function addListItem(event){
    event.preventDefault();
    const parentForm = event.target.parentElement;
    const parentList = parentForm.parentElement;
    // Imp 
    const listItemsCurrent = parentList.querySelector("[class^=list-items");
    // console.log(listItemsCurrent.classList[0]);
    let listNum;
    if(listItemsCurrent.classList[0] === 'list-items-1'){
        listNum = '1';
    }
    else if(listItemsCurrent.classList[0] === 'list-items-2'){
        listNum = '2';
    }

    const listInput = parentForm.querySelector('.list-input');
    // console.log(listItemsCurrent);
    
    const listDiv = document.createElement("div");
    listDiv.classList.add("list-data");
    listDiv.setAttribute('draggable',true);
    listDiv.setAttribute('ondragstart', 'drag(event)');
    listDiv.id = listIDString.concat(uniqueListID.toString());
    uniqueListID = uniqueListID + 1;
    // console.log(uniqueListID);
    // listDiv.addEventListener('dragstart', handleDragStart, false);
    // listDiv.addEventListener('dragend', handleDragEnd, false);
        
    
    const newLi = document.createElement('li');
    let newData = listInput.value.trim();
    if(newData === ''){
        newData = '< Empty List Item >';
    }
    newLi.innerText = newData;
    newLi.classList.add('list-text');
    listDiv.appendChild(newLi);

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('edit-button');
    listDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('delete-button');
    listDiv.appendChild(deleteButton);

    listItemsCurrent.appendChild(listDiv)
    saveLocalList(newData, listNum);
    listInput.value = "";
}

function doAction(e){
    const item = e.target;
    // console.log(item);
    // console.log(item.classList);
    


    if(item.classList[0] === 'delete-button'){
        const list = item.parentElement;
        let listNum;
        if(list.parentElement.classList[0] === 'list-items-1'){
            listNum = '1';
        }
        else if(list.parentElement.classList[0] === 'list-items-2'){
            listNum = '2';
        }

        const listData = list.querySelector('.list-text');
        removeLocalStorageData(listData.innerText, listNum);
        list.remove();
    }
    else if(item.classList[0] === 'edit-button'){
        const list = item.parentElement;
        let listNum;
        if(list.parentElement.classList[0] === 'list-items-1'){
            listNum = '1';
        }
        else if(list.parentElement.classList[0] === 'list-items-2'){
            listNum = '2';
        }

        const listData = list.querySelector('.list-text');
        // console.log(listData.innerText);
        const oldData = listData.innerText;
        // listData.remove();
        let updateForm = document.createElement('form');
        updateForm.innerHTML = '<input type="text" class="list-update-input">  <button class="list-update-button" type="submit">Update</button>';
        const updateFormInput = updateForm.querySelector('.list-update-input');
        updateFormInput.value = oldData;
        list.replaceChild(updateForm, listData);
        list.querySelector('.edit-button').remove();
        list.querySelector('.delete-button').remove();

        removeLocalStorageData(oldData, listNum);
        const updateButton = document.querySelector('.list-update-button');
        updateButton.addEventListener("click", updateData);
    }

    // Imp Why It didnt work like this


    // else if(item.classList[0] === 'list-update-button'){
    //     console.log('hi');
    
        
    //     // const list = item.parentElement;
    //     // const listUpdateForm = list.querySelector('.list-update-input');
    //     // const updateButton = list.querySelector('.list-update-button')
    //     // console.log(listUpdateForm.innerText);
    //     // const newData = listUpdateForm.innerText;
    //     // // listData.remove();
    //     // const updatedList = document.createElement('li');
    //     // updatedList.classList.add('list-text');
    //     // updatedList.value = newData;

    //     // const newEditButton = document.createElement('button');
    //     // newEditButton.classList.add('edit-button');
    //     // newEditButton.value = Edit;

    //     // list.replaceChild(updatedList, listUpdateForm);
    //     // list.replaceChild(newEditButton, updateButton);
        
    // }
}

function updateData(e){
    e.preventDefault();
    const item = e.target;
    // console.log(item);
    // console.log(item.classList); 
    
    
    const Form = item.parentElement;
    // console.log(Form);
    // console.log(Form.querySelector('.list-update-input').value);
    const list = Form.parentElement;
    // console.log(list);
    // const listUpdateForm = list.querySelector('.list-update-input');
    // const updateButton = list.querySelector('.list-update-button')
    // console.log(listUpdateForm.innerText);


    // value property of input form


    let newData = Form.querySelector('.list-update-input').value;
    // listData.remove();
    const updatedList = document.createElement('li');
    updatedList.classList.add('list-text');
    newData = newData.trim();
    if(newData === ''){
        newData = '< Empty List Item >';
    }
    updatedList.innerText = newData;
    const newEditButton = document.createElement('button');
    newEditButton.classList.add('edit-button');
    newEditButton.innerText = 'Edit';
    Form.remove();
    // console.log(newEditButton);
    // console.log(updatedList);
    list.insertBefore(newEditButton, list.querySelector('.delete-button'));
    list.insertBefore(updatedList, newEditButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('delete-button');
    list.appendChild(deleteButton);

    // console.log(list);
    let listNum;
    if(list.parentElement.classList[0] === 'list-items-1'){
        listNum = '1';
    }
    else if(list.parentElement.classList[0] === 'list-items-2'){
        listNum = '2';
    }
    saveLocalList(newData, listNum);

}


function saveLocalList(listItem, listNum){
    let listItems1, listItems2;
    if(listNum === '1'){
        if(localStorage.getItem('listItems1') === null){
            listItems1 = [];
        }
        else{
            listItems1 = JSON.parse(localStorage.getItem("listItems1"));
        }
    
        listItems1.push(listItem);
        localStorage.setItem("listItems1", JSON.stringify(listItems1))    
    }
    else if(listNum === '2'){
        if(localStorage.getItem('listItems2') === null){
            listItems2 = [];
        }
        else{
            listItems2 = JSON.parse(localStorage.getItem("listItems2"));
        }
    
        listItems2.push(listItem);
        localStorage.setItem("listItems2", JSON.stringify(listItems2))    
    }
    
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


    listItems1.forEach(function(listData){
        const listItemsCurrent = document.querySelector(".list-items-1");
        
        const listDiv = document.createElement("div");
        listDiv.classList.add("list-data");
        listDiv.setAttribute('draggable',true);
        listDiv.setAttribute('ondragstart', 'drag(event)');
        listDiv.id = listIDString.concat(uniqueListID.toString());
        uniqueListID = uniqueListID + 1;
        // listDiv.addEventListener('dragstart', handleDragStart, false);
        // listDiv.addEventListener('dragend', handleDragEnd, false);
        // listDiv.addEventListener('drop', handleDrop, false);
        
        const newLi = document.createElement('li');
        newLi.innerText = listData;
        newLi.classList.add('list-text');
        listDiv.appendChild(newLi);
    
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.classList.add('edit-button');
        listDiv.appendChild(editButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.classList.add('delete-button');
        listDiv.appendChild(deleteButton);
    
        listItemsCurrent.appendChild(listDiv)
    
    })

    listItems2.forEach(function(listData){
        const listItemsCurrent = document.querySelector(".list-items-2");
        
        const listDiv = document.createElement("div");
        listDiv.classList.add("list-data");
        listDiv.setAttribute('draggable',true);
        listDiv.setAttribute('ondragstart', 'drag(event)');
        listDiv.id = listIDString.concat(uniqueListID.toString());
        uniqueListID = uniqueListID + 1;
        // listDiv.addEventListener('dragstart', handleDragStart, false);
        // listDiv.addEventListener('dragend', handleDragEnd, false);
        // listDiv.addEventListener('drop', handleDrop, false);
        
        const newLi = document.createElement('li');
        newLi.innerText = listData;
        newLi.classList.add('list-text');
        listDiv.appendChild(newLi);
    
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.classList.add('edit-button');
        listDiv.appendChild(editButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.classList.add('delete-button');
        listDiv.appendChild(deleteButton);
    
        listItemsCurrent.appendChild(listDiv)
    
    })
}

function editLocalStorageData(listData, listNum){
    // console.log(listData, listNum);
    let listItems1,listItems2;
    if(listNum === '1'){
            listItems1 = JSON.parse(localStorage.getItem("listItems1"));
            listItems1.splice(listItems1.indexOf(listData),1);
            localStorage.setItem("listItems1", JSON.stringify(listItems1));
    }
    else if(listNum === '2'){
        listItems2 = JSON.parse(localStorage.getItem("listItems2"));
        listItems2.splice(listItems2.indexOf(listData),1);
        localStorage.setItem("listItems2", JSON.stringify(listItems2));
    }

}

function removeLocalStorageData(listData, listNum){
    // console.log(listData, listNum);
    let listItems1,listItems2;
    if(listNum === '1'){
            listItems1 = JSON.parse(localStorage.getItem("listItems1"));
            // console.log(listItems1.indexOf(listData));
            listItems1.splice(listItems1.indexOf(listData),1);
            localStorage.setItem("listItems1", JSON.stringify(listItems1));
    }
    else if(listNum === '2'){
        listItems2 = JSON.parse(localStorage.getItem("listItems2"));
        listItems2.splice(listItems2.indexOf(listData),1);
        localStorage.setItem("listItems2", JSON.stringify(listItems2));
    }

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
        dropTarget = dropTarget.parentElement;
        dropTarget = dropTarget.parentElement;
    }

    var data = ev.dataTransfer.getData("text");
    droppingElement = document.getElementById(data);
    // console.log(droppingElement.parentElement.classList);
    // console.log(data);

    let listNumDropped, listNumDroppedTo;
    if(droppingElement.parentElement.classList[0] === 'list-items-1'){
        listNumDropped = '1';
    }
    else if(droppingElement.parentElement.classList[0] === 'list-items-2'){
        listNumDropped = '2';
    }

    if(dropTarget.classList[0] === 'list-items-1'){
        listNumDroppedTo = '1';
    }
    else if(dropTarget.classList[0] === 'list-items-2'){
        listNumDroppedTo = '2';
    }

    const DropData = droppingElement.childNodes[0].innerText;
    // console.log(DropData, listNumDropped, listNumDroppedTo);

    saveLocalList(DropData, listNumDroppedTo);
    removeLocalStorageData(DropData, listNumDropped);

    dropTarget.appendChild(droppingElement);


  }





// $(function() {
//     $("#list1, #list2").sortable({
//       connectWith: "ul",
//       placeholder: "placeholder",
//       delay: 150
//     })
//     .disableSelection()
//     .dblclick( function(e){
//       var item = e.target;
//       if (e.currentTarget.id === 'list1') {
//         //move from all to user
//         $(item).fadeOut('fast', function() {
//           $(item).appendTo($('#list2')).fadeIn('slow');
//         });
//       } else {
//         //move from user to all
//         $(item).fadeOut('fast', function() {
//           $(item).appendTo($('#list1')).fadeIn('slow');
//         });
//       }
//     });
//   });







// const list_data = document.querySelector('.list-data');
// list_data.addEventListener('onMouseDown', onmousedown);

// onmousedown = function(event) {
//     list_data = event.target;
//     console.log(list_data);
//     let shiftX = event.clientX - list_data.getBoundingClientRect().left;
//     let shiftY = event.clientY - list_data.getBoundingClientRect().top;
//     // console.log(shiftX,shiftY);
    
//     list_data.style.position = 'absolute';
//     list_data.style.zIndex = 1000;
//     document.body.append(list_data);

//     moveAt(event.pageX, event.pageY);

//     function moveAt(pageX, pageY) {
//       list_data.style.left = pageX - shiftX + 'px';
//       list_data.style.top = pageY - shiftY + 'px';
//     }

//     let currentDroppable = null;
//     function onMouseMove(event) {
//       moveAt(event.pageX, event.pageY);

//       list_data.hidden = true;
//       let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
//       list_data.hidden = false;

//       if (!elemBelow) return;

//       let droppableBelow = elemBelow.closest('.droppable');
//       if (currentDroppable != droppableBelow) {
//         if (currentDroppable) { // null when we were not over a droppable before this event
//           leaveDroppable(currentDroppable);
//         }
//         currentDroppable = droppableBelow;
//         if (currentDroppable) { // null if we're not coming over a droppable now
//           // (maybe just left the droppable)
//           enterDroppable(currentDroppable);
//         }
//       }
//     }

//     document.addEventListener('mousemove', onMouseMove);

//     list_data.onmouseup = function() {
//       document.removeEventListener('mousemove', onMouseMove);
//       list_data.onmouseup = null;
//     };

//   };

//   function enterDroppable(elem) {
//     elem.style.opacity = 0.7;
//   }

//   function leaveDroppable(elem) {
//     elem.style.opacity = 1.0;
//   }

//   list_data.ondragstart = function() {
//     return false;
//   };



// function handleDragStart(e) {
//     this.style.opacity = '0.4';
//     return false;
    
//   }

//   function handleDragEnd(e) {
//     this.style.opacity = '1';
//   }

//   function handleDrop(e) {
//     e.stopPropagation();
  
//     if (dragSrcEl !== this) {
//       dragSrcEl.innerHTML = this.innerHTML;
//       this.innerHTML = e.dataTransfer.getData('text/html');
//     }
  
//     return false;
//   }

//   let items = document.querySelectorAll('.list-data');
//     items.forEach(function(item) {
//     item.addEventListener('dragstart', handleDragStart, false);
//     item.addEventListener('dragend', handleDragEnd, false);
//     item.addEventListener('drop', handleDrop, false);
//   });