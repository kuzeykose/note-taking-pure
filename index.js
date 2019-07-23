var notes=[];

init()

function init(){
  renderAllElements()
  notes = JSON.parse(localStorage.getItem('notes'));
  if(notes === null){
    notes = []
  }
  for (var i = 0; i < notes.length; i++) {
    notes[i].id=i;
    renderListItem(notes[i].title);
  }
  updateButtonDisable();
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
                          <button class='del-btn btn btn-danger btn-sm my-2'> x
                          </button>
                        </li>`;
}

function clickDelButton(){
  let delBut = document.getElementsByClassName('del-btn');
    delBut[index].addEventListener("click", function(){
      deleteNote()
    });
}

function renderUlElement(){
  return `<ul class="list list-group" id="list"></ul>`;
}

function clickUlElement(){
  const myUlList = document.getElementById('list');
    myUlList.addEventListener("click", function(event){
      clickListItem(myUlList.childNodes, event.target.parentNode);
      if(event.target.tagName === 'BUTTON'){
        clickDelButton();
      };
  }, true);
}

function renderInputElements(){
  return `<input class="form-control my-1" id="title" name="title"></input>
                        <textarea class="form-control my-2" id="content" name="name" rows="5"></textarea>`;
}

function renderButtonElements(){
  return  `<button class="btn btn-success " type="button" name="button" onClick="takeInputVal()">add</button>
                         <button id="update-button" class="btn btn-warning mx-2" type="button" name="button" onClick="updateListItem()">
                            update
                         </button>`;
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
function getIndex(listItems, clicktedItem){
   var childs = listItems;
    for (var i = 0; i < childs.length; i++) {
      if(clicktedItem === childs[i]) break;
    }
  return i;
}

// list
function clickListItem(listItems ,clicktedItem){
  selectedItem=clicktedItem;
  index = getIndex(listItems, clicktedItem);
  setForm(notes[index].title, notes[index].content);
}

function updateListItem(){
  var newVal = getForm();
  notes[index].title = newVal.title;
  notes[index].content = newVal.content;

  selectedItem.childNodes[1].innerHTML = newVal.title;
  saveLocal();
}

// silme
function deleteNote(){
  let list = document.getElementById("list").childNodes;

  for (var i = 0; i < notes.length; i++) {
    notes[i].id=i;
  }

  list[index].remove();
  notes = notes.filter(item => item.id !== Number(index))

  saveLocal();
  updateButtonDisable();
}

// localStorage a kaydetme
function saveLocal(){
  localStorage.setItem('notes',JSON.stringify(notes));
}


function updateButtonDisable(){
  var but=document.getElementById("update-button")
  if (notes.length !== 0){
    but.disabled = false;
  }else {
    but.disabled = true;
  }
}

var id = 0;

function Note ({title, content}){
  this.id = id ++;
  this.title = title
  this.content = content
}
