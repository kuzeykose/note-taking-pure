var notes=[];
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
<button class='btn btn-danger btn-sm my-2' onClick="deleteNote(this)">x</button></li>`;
}

// yeni liste item olusturmak ve array in icine yollanmasi
function takeInputVal(){
  var note = new Note(getForm());

  notes.push(note);
  resetForm();

  renderListItem(note.title);
  saveLocal();
}

// secilen itemin indexsini al
function getIndex(listItems, selectedItem){
  var childs = listItems;
    for (var i = 0; i < childs.length; i++) {
      if(selectedItem === childs[i]) break;
    }
  return i;
}

// list
function clickListItem(node ,e){
  selectedItem = e.target;
  index = getIndex(node.childNodes, selectedItem);
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
function deleteNote(delItem){
  var c = delItem.parentNode.parentNode.childNodes;
  var d = delItem.parentNode;

  for (var i = 0; i < notes.length; i++) {
    notes[i].id=i;
  }

  for (var i = 0; i < c.length; i++) {
    if(d === c[i] ) {
      c[i].remove();
      notes = notes.filter(item => item.id !== Number(i));
    }
  }
  saveLocal();
}

// localStorage a kaydetme
function saveLocal(){
  localStorage.setItem('notes',JSON.stringify(notes));
}

var id = 0;
function Note ({title, content}){
  this.id = id ++;
  this.title = title
  this.content = content
}
