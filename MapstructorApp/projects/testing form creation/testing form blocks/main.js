let fileHandle;

async function button(){
  [fileHandle] = await window.showOpenFilePicker();
//   console.log(fileHandle.kind);

///++++ IMP / Get the file with data
let fileData = await fileHandle.getFile();
//console.log(fileData);

// ++++ SEE TEXT
let text = await fileData.text();
//console.log(text);

// ++++++ Edit TextArea
textarea.innerText = text;
}

async function save(){
    let stream = await fileHandle.createWritable();
    await stream.write(textarea.innerText);
    await stream.close();
    
}

async function saveAs(){
  console.log 
  
}

