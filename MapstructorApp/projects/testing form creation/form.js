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


function save_func(){

    var  name = document.getElementById("name").value;
    var  source_name = document.getElementById("source_name").value;
    var  type = document.getElementById('type').value;
    var  database = document.getElementById('database').value;
    var  group = document.getElementById('group').value;
    var  hover = document.getElementById('check-aaa5').value;
    var  click = document.getElementById('check-bb5').value;
    var  sidebar = document.getElementById('check-dd5').value;
     var  slider = document.getElementById('check-cc5').value;
    // var  name = document.getElementById('name').value;
    var data =[];
    data.push( name, source_name, type, database, group, hover, click, sidebar,slider);
    alert(data);

    var data_string = JSON.stringify(data);

    var file = new Blob([data_string], {type : "text"});

    var anchor = document.createElement('a');

    anchor.href = URL.createObjectURL(file)

    anchor.download = "data.txt";

    anchor.click();


    
    alert(name +" "+source_name);
}
