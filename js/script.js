/* ===================== PRINCIPAIS OBJETOS  =================================*/
let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModal =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

//==================================Eventos==========================================================

addNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = "none";
  document.querySelector("#input-id").value = "";
  document.querySelector("#input-title").value = "";
  document.querySelector("#input-content").value = "";
});

btnCloseNote.addEventListener('click', (event) => {
  event.preventDefault();
  listNotes();
  modal.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
})

closeModal.addEventListener('click', (evt)=>{
  evt.preventDefault();
  modalView.style.display='none';
  addNote.style.display = 'block';
  notes.style.display = 'flex';
})

btnSaveNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  let objNote = {
    id: document.querySelector('#input-id').value.trim(),
    title: document.querySelector('#input-title').value.trim(),
    content: document.querySelector('#input-content').value.trim()
  };
  console.log(objNote);
  saveNote(objNote);
})

//==================================Funções===========================================================
  
const loadNotes = () => {
  let listNotes = localStorage.getItem('notes');
  console.log(listNotes)
  if(!listNotes){
    listNotes = [];
  }else{
    listNotes = JSON.parse(listNotes);
  }
  return listNotes;
}

const saveNote = (note) => {
  let listNotes = loadNotes();
  note.data = new Date().getTime();
  if(note.id.length < 1){
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id;
    listNotes.push(note);
  }else{
    listNotes.forEach((item, i) => {
      if(item.id == note.id){
        listNotes[i] = note;
      }
    });
  }
  console.log(listNotes);
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem('notes',listNotes);
  listNotes();
}

const listNotes = () => {
  notes.innerHTML="";
  let listNotes = loadNotes();
  listNotes.forEach((item) => {
    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '20rem';
    divCard.style.marginBottom = '20px'
    notes.appendChild(divCard);

    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-Body'
    divCardBody.style.marginLeft = '15px'
    divCard.appendChild(divCardBody);

    let h1 = document.createElement('h1');
    h1.innerText = item.title;
    h1.className = 'card-title'
    divCardBody.appendChild(h1);

    let pContent = document.createElement('p');
    pContent.innerText = item.content;
    pContent.className = 'card-text'
    divCardBody.appendChild(pContent)

    let pDate = document.createElement('p');
    pDate.innerText = 'Última atualização: ' +new Date(item.data).toLocaleDateString();
    pContent.className = 'card-text'
    divCardBody.appendChild(pDate)

    divCard.addEventListener('click', (evt) => {
      evt.preventDefault();
      showNotes(item);
    })
  });
}

const showNotes = (note) => {
  modalView.style.display='block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
  let titleModal = document.querySelector('#title-note');
  titleModal.innerHTML=""
  let h1Modal = document.createElement('h1')
  h1Modal.innerText = note.title
  titleModal.appendChild(h1Modal);
  let contentModal = document.querySelector('#content-note');
  contentModal.innerHTML=""
  let pModal = document.createElement('p')
  pModal.innerText = note.content
  contentModal.appendChild(pModal);
  
  let dateModal = document.createElement('p')
  dateModal.innerText = new Date(note.data).toLocaleDateString();
  contentModal.appendChild(dateModal);
  document.querySelector('#controls-note').innerHTML ="";
  let aDelete = document.createElement('a');
  let i = document.createElement('i');
  i.style.color = '#dc1b1b'
  i.className = 'bi bi-trash'
  aDelete.appendChild(i);
  document.querySelector('#controls-note').appendChild(aDelete);
  let aEdit = document.createElement('a');
  let iEdit = document.createElement('i');
  iEdit.style.color = '#dc1b1b'
  iEdit.className = 'bi bi-pen'
  aEdit.appendChild(iEdit);
  document.querySelector('#controls-note').appendChild(aEdit);
  aDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    deleteNotes(note.id);
  })
  aEdit.addEventListener('click', (evt) => {
    document.querySelector("#input-id").value = note.id;
    document.querySelector("#input-title").value = note.title;
    document.querySelector("#input-content").value = note.content;
    modal.style.display = 'block';
    addNote.style.display = 'none';
    notes.style.display = 'none';
    modalView.style.display = 'none';
  })
}

const deleteNotes = (id) => {
  let delNote = loadNotes();
  delNote = delNote.filter(note => note.id !== id);
  localStorage.setItem("notes" , JSON.stringify(delNote));
  listNotes();
  modalView.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
}

listNotes();