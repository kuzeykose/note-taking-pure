var notes=[];
renderAllElements()
init()


function init(){
  notes = JSON.parse(localStorage.getItem('notes'));
  if(notes === null){
    notes = []
  }
  for (var i = 0; i < notes.length; i++) {
    notes[i].id=i;
    renderListItem(notes[i].title);
  }
}

function resetForm(){
  document.getElementById("title").value='';
  document.getElementById("content").value='';
}

function setForm(title, content){
  document.getElementById("title").value = title;
  document.getElementById("content").value = content;
}

function getForm(){
  return {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value
  }
}

// liste itemlarini ekrana yazdirmak
function renderListItem(title){
  const list = document.querySelector('.list');
    list.innerHTML += `<li class='col-10 list-group-item my-1 mr-1 text-truncate'">
                          <span> ${title}</span>
                          <div class="transparan"></div>
                          <button class='del-btn btn btn-danger btn-sm my-2'
                            onClick="deleteNote(this, event)"> x
                          </button>
                        </li>`;
}

function renderUlElement(){
  const ulElement = `<ul class="list list-group" id="list"></ul>`;
  return ulElement;
}

function clickUlElement(){
  const myUlList = document.getElementById('list');
    myUlList.addEventListener("click", function(event){
      console.log(event.target.parentNode.parentNode);
        selectedItem(event.target.parentNode,event.target);
      });
}

function renderInputElements(){
  const inputElement = `<input class="form-control my-1" id="title" name="title"></input>
                        <textarea class="form-control my-2" id="content" name="name" rows="5"></textarea>`;
  return inputElement;
}

function renderButtonElements(){
  const buttonElement = `<button class="btn btn-success " type="button" name="button" onClick="takeInputVal()">add</button>
                         <button id="update-button" class="btn btn-warning mx-2" type="button" name="button" onClick="updateListItem()">
                            update
                         </button>`;

  return buttonElement;
}

function renderAllElements(){
  const app = document.getElementById('app');
    app.innerHTML = `<div class="container">
                      <div class="row my-5">
                          <div class="col-4">
                            ${renderUlElement()}
                          </div>
                          <div class="col-8">
                            ${renderInputElements()}
                            <div class="row d-flex justify-content-end">
                              ${renderButtonElements()}
                            </div>
                          </div>
                      </div>
                    </div>`;
  clickUlElement();
}


// yeni liste item olusturmak ve array in icine yollanmasi
function takeInputVal(){
  var note = new Note(getForm());

  notes.push(note);
  resetForm();

  renderListItem(note.title);
  saveLocal();
  updateButtonDisable();
}

// secilen itemin indexsini al
function getIndex(listItems, selectedItem){
  // var i = listItems.indexOf(selectedItem);  SOR!
  // console.log(i);
  var childs = listItems;
    for (var i = 0; i < childs.length; i++) {
      if(selectedItem === childs[i]) break;
    }
  return i;
}

// list
function clickListItem(clicktedItem ,e){
  selectedItem = e.target.parentNode;
  index = getIndex(clicktedItem.childNodes, selectedItem);
  setForm(notes[index].title, notes[index].content);
}

function updateListItem(){
  var newVal = getForm();
  notes[index].title = newVal.title;
  notes[index].content = newVal.content;

  selectedItem.childNodes[1].innerHTML=newVal.title;
  saveLocal();
}

// silme
function deleteNote(delItem ,event){
  event.stopPropagation();

  var c = delItem.parentNode.parentNode.childNodes;
  var d = delItem.parentNode;
  let buttonIndex = getIndex(c, d)

  for (var i = 0; i < notes.length; i++) {
    notes[i].id=i;
  }

  c[buttonIndex].remove();
  notes = notes.filter(item => item.id !== Number(buttonIndex))

  saveLocal();
  // updateButtonDisable();
}

// localStorage a kaydetme
function saveLocal(){
  localStorage.setItem('notes',JSON.stringify(notes));
}


// function updateButtonDisable(){
//   var but=document.getElementById("update-button")
//   if (notes.length !== 0){
//     but.disabled = false;
//   }else {
//     but.disabled = true;
//   }
// }

var id = 0;
function Note ({title, content}){
  this.id = id ++;
  this.title = title
  this.content = content
}
