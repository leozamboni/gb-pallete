/* 
  Author: Sean Kelly
*/

const COMMENT_HEADER = "/*\n\n\tThis file was generated by GB_Pallete\n\tCreated By Sean Kelly\n\n*/\n\n\n"
const LINE_WIDTH = 8;
const HEX_PREFIX = '0x'


function download(filename,blob){
  var link = document.createElement('a');
  let objectUrl = URL.createObjectURL(blob);

  link.setAttribute('download',filename);
  link.setAttribute('href',objectUrl);
  link.setAttribute('display', 'none');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  //cleanup
  URL.revokeObjectURL(objectUrl);
}

export function exportToC(data){
  let fileData = generateCFile(data);
  let fileBlob = new Blob(fileData,{type:'text/x-c;charset=utf-8'});
  download('test-header.h',fileBlob);
}

export function exportToASM(data){
  let fileData = generateASMFile(data);
  let fileBlob = new Blob(fileData,{type:'text/x-asm;charset=utf-8'});
  download('test.asm',fileBlob);
}

function generateASMFile(){
  // TODO: add asm File generation
}
function generateCFile(data){
  let fileparts = [];
  fileparts.push(generateCBody(data));
  return fileparts
}

/*
  formats data into a C Header file
*/
function generateCBody(data){
  let textBuffer=COMMENT_HEADER+"/* Start of tile data */\n";
  textBuffer+="const unsigned char tiledata[] = \n{\n\t"
  let mappedData= data.map((char,index)=>{
    // Adds a newline and tab character to array after the 7th element in data array
    if(index < data.length -1){
      let text = index % LINE_WIDTH != LINE_WIDTH-1?
        HEX_PREFIX+char+',':
        HEX_PREFIX+char+','+"\n\t";

      return(text);
    }
    // does not add comma to last element
    return HEX_PREFIX+char +"\n";
    
  })

  let dataString = mappedData.join('');
  textBuffer += dataString;
  return textBuffer + "};\n";
}




// function captilizeLetters(string){
//   for(let i = 0;i < string.length; i++){
//     string.ffdsfcharCodeAt(i);
//   }
// }


