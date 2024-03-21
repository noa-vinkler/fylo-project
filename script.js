const totalSize = 10;
let usedSize = 0;
let percent;
let sizeLeft;
const totalSizeElement = document.getElementById('totalSize');
const sizeLeftElement = document.getElementById('sizeLeft');
const progressElement = document.getElementById('progress');
const usedSizeElement = document.getElementById('sizeOccupied');
const selectedFileElemnt=document.getElementById("selectedFile");

const shortenSizeNumber = (x) => {
  return Number.parseFloat(x).toFixed(2);
};

const init = () => {
  usedSize = Number(window.localStorage.getItem('usedSize'));
  percent = 100 * (usedSize / totalSize) + 4;
  sizeLeft = totalSize - usedSize;
  totalSizeElement.innerText = totalSize + ' MB';
  sizeLeftElement.innerText = shortenSizeNumber(sizeLeft);
  usedSizeElement.innerText = shortenSizeNumber(usedSize) + ' MB';
  progressElement.style.width = percent.toString(10) + '%';
};

const addCurrentFileSize = (s) => {
  s /= Math.pow(1024, 2);
  if (usedSize + s < totalSize) {
    usedSize += s;
    sizeLeft = totalSize - usedSize;
    percent = 100 * (usedSize / totalSize) - 4;
    usedSizeElement.innerText = shortenSizeNumber(usedSize) + ' MB';
    sizeLeftElement.innerText = shortenSizeNumber(sizeLeft);
    progressElement.style.width = percent.toString(10) + '%';
    progressElement.style.transition = 'width 0.5s ease 0.1s';
  } else {
    alert('There is not enough space on the disk');
    
  }
};

const addFileRightBox=(name,size)=>{
  const span= document.createElement('span');
  span.innerText=name;
  const removeButton=document.createElement('button');
  removeButton.innerText="X";
  removeButton.classList.add('removeButton');
  removeButton.addEventListener('click',()=>{
    span.remove();
    addCurrentFileSize(-size);
  });
  span.appendChild(removeButton);
  selectedFileElemnt.appendChild(span);
}

const onFileInputChange = (e) => {
  const fileName = e.value.split('\\').pop();
  const isImgFile = new RegExp('(.(gif|jpeg|jpg|png|svg))').test(fileName);
  if (isImgFile) {
    const file = e.files[0];
    addCurrentFileSize(file.size);
    addFileRightBox(fileName,file.size);
  } else {
    alert('File Type Not Supported');
  }
};

//main start

init();