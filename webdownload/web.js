function base64Img2Blob(code){
 
  var parts = code.split(';base64,');

  var contentType = parts[0].split(':')[1];

  var raw = window.atob(parts[1]);

  var rawLength = raw.length;



  var uInt8Array = new Uint8Array(rawLength);


  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType}); 

}

function downloadFile(fileName, content){
  var aLink = document.createElement('a');

  var blob = base64Img2Blob(content); //new Blob([content]);

  // var evt = document.createEvent("HTMLEvents");

  // evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错

  
  aLink.style.display = "block"
  aLink.style.width = "100px"
  aLink.style.border = "1px solid #666";
  aLink.style.borderRadius = "8px";
  aLink.style.color = "#fff";
  aLink.style.height = "50px";
  aLink.style.lineHeight = "50px";
  aLink.style.textDecoration = "none";
  aLink.style.textAlign = "center";
  

  aLink.style.backgroundColor = "#ff0000"
  aLink.href = URL.createObjectURL(blob);

  // aLink.dispatchEvent(evt);
  // if(aLink.download){
  //   aLink.download = fileName;
  //   aLink.innerHTML = "下载"
  // }else{
  //   aLink.innerHTML = "你的浏览器不支持"
  // }
  aLink.download = fileName;
  aLink.innerHTML = "下载"

  document.getElementById("root").appendChild(aLink)
}

function ImageToCanvas(image) {  
    var canvas = document.createElement("canvas");  
    canvas.width = image.width;  
    canvas.height = image.height;  
    canvas.getContext("2d").drawImage(image, 0, 0);//0, 0参数画布上的坐标点，图片将会拷贝到这个地方  
    return canvas;  
}  
 
function init(){
  var img = document.getElementsByTagName("img")[0];
  var canvas = ImageToCanvas(img);
  downloadFile('ship.png', canvas.toDataURL("image/png"));
}

window.onload = function(){
  init();
}

// import html2canvas from 'html2canvas';
// // var proxy = require('html2canvas-proxy');
// function downloadFile(aLink, fileName, content){
//     aLink.download = fileName;
//     aLink.href = "data:text/plain," + content;
// }

// window.onload = function(){
//   html2canvas(document.getElementById("root")).then(function(canvas) {
//     // document.body.appendChild(canvas);
//     var img = canvas.toDataURL("image/png");
//     location.href = img;
//   });
// }