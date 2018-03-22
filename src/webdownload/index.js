import html2canvas from 'html2canvas';

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

function downloadFile(fileName, content ,buttonText){
  var aLink = document.createElement('a');

  var blob = base64Img2Blob(content); //new Blob([content]);

  // var evt = document.createEvent("HTMLEvents");
  // evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
  
  aLink.style.display = "inline-block"
  aLink.style.width = "100px"
  aLink.style.fontSize = "20px"
  aLink.style.border = "1px solid #fff";
  aLink.style.marginLeft = "10px";
  aLink.style.borderRadius = "8px";
  aLink.style.color = "#fff";
  aLink.style.height = "50px";
  aLink.style.lineHeight = "50px";
  aLink.style.textDecoration = "none";
  aLink.style.textAlign = "center";
  
  aLink.style.backgroundColor = "#ea4c37"
  aLink.href = URL.createObjectURL(blob);

  aLink.download = fileName;
  aLink.innerHTML = buttonText || "下载";

  document.getElementById("button-box").appendChild(aLink)
}

function getCanvas(width,height) {  
    var canvas = document.createElement("canvas");  
    canvas.width = width || 600;  
    canvas.height = height || 600;  
    return canvas;  
}

function method2(){
  html2canvas(document.getElementById("origin-picture")).then(function(canvas) {
    document.getElementById("new2").appendChild(canvas);
    downloadFile('new2.png', canvas.toDataURL("image/png"),"下载2")
  });
}

function method1(){
  var image = document.getElementsByTagName("img");

  var canvas = getCanvas();
  canvas.getContext("2d").drawImage(image[0], 0, 0);
  canvas.getContext("2d").drawImage(image[1], 0, image[0].height);

  document.getElementById("new1").appendChild(canvas);
  downloadFile('new1.png', canvas.toDataURL("image/png"),"下载1")
}

document.body.onload = function(){
  method1();
  method2();
}