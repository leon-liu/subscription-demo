export function saveBlob(blob: Blob, fileName: string) {
  let a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none";

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);



//   var blobUrl = URL.createObjectURL(file);
//   var link = document.createElement("a"); // Or maybe get it from the current document
//   link.href = blobUrl;
//   link.download = "aDefaultFileName.txt";
//   link.innerHTML = "Click here to download the file";
//   document.body.appendChild(link); // Or append it whereever you want


};