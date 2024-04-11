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
});

btnCloseNote.addEventListener('click', (event) => {
  event.preventDefault();
  modal.style.display = 'none';
  notes.style.display = 'flex';
  addNote.style.display = 'block';
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
  console.log(listNotes);
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem('notes',listNotes);
}

const listNotes = () => {
  let listNotes = loadNotes();
  listNotes.forEach((item) => {
    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '18rem';
    notes.appendChild(divCard);

    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-Body'
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
    pDate.innerText = 'Última atualização: ' +item.hora+':'+item.minutos+':'+item.segundos
    divCardBody.appendChild(pDate)
  });
}

listNotes();