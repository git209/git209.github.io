initShell();
let currentFile='projects.json';
const editor=document.querySelector('#editor');
const statusBox=document.querySelector('#status');
const title=document.querySelector('#editorTitle');

async function openFile(file){
  currentFile=file;
  title.textContent=file.replace('.json','').replace(/^./,c=>c.toUpperCase());
  document.querySelectorAll('.admin-sidebar button').forEach(b=>b.classList.toggle('active',b.dataset.file===file));
  try{
    const data=await fetch('data/'+file).then(r=>r.json());
    editor.value=JSON.stringify(data,null,2);
    statusBox.textContent='Loaded data/'+file+'.';
  }catch(e){
    statusBox.textContent='Unable to load '+file+': '+e.message;
  }
}
document.querySelectorAll('.admin-sidebar button').forEach(b=>b.onclick=()=>openFile(b.dataset.file));
document.querySelector('#validateBtn').onclick=()=>{
  try{JSON.parse(editor.value);statusBox.textContent='JSON is valid.'}
  catch(e){statusBox.textContent='JSON error: '+e.message}
};
document.querySelector('#formatBtn').onclick=()=>{
  try{editor.value=JSON.stringify(JSON.parse(editor.value),null,2);statusBox.textContent='JSON formatted.'}
  catch(e){statusBox.textContent='JSON error: '+e.message}
};
document.querySelector('#downloadBtn').onclick=()=>{
  try{
    const parsed=JSON.parse(editor.value);
    const blob=new Blob([JSON.stringify(parsed,null,2)],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);a.download=currentFile;a.click();
    URL.revokeObjectURL(a.href);
    statusBox.textContent='Downloaded '+currentFile+'. Replace the matching file in the GitHub data folder.';
  }catch(e){statusBox.textContent='JSON error: '+e.message}
};
openFile(currentFile);