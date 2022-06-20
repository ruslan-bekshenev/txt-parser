const fs = require('fs');

const filePath = '1.txt'

const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\n');

let arr = readFileLines(filePath)

const json = []

const parentRegex = /^(\d+\.\s)+/g
const childRegex = /^(\d\.\d\.\s)+/g
let listNumber = 0
let childCounter = 0
let dashCounter = 0
for (let i = 0; i < arr.length; i++) {
  const firstChar = arr[i].split('.')[0];
  const currentListNumber = !Number.isNaN(firstChar) ? +firstChar : listNumber;
  const currentItem = arr[i];

  if (currentItem.match(parentRegex)) {
    childCounter = 0;
    json.push({ id: listNumber, title: currentItem.replace(parentRegex, ''), description: [] });
  } 

  if (currentItem.match(childRegex)) {
    dashCounter = 0;
    json[listNumber - 1].description[childCounter] = {  id: childCounter + 1, title: currentItem.replace(childRegex, ''), description: []  };
    childCounter++;
  }

  if (currentItem.startsWith('-')) {
    json[listNumber - 1].description[childCounter - 1].description.push(currentItem.replace('- ', ''))
    dashCounter++;
  }

  if (!Number.isNaN(currentListNumber) && currentListNumber !== listNumber) {
    listNumber++;
  }

}

fs.writeFile('./data2.json', JSON.stringify(json, null, ' '), function(err) {
  if (err) {
    throw err;
  }

  console.log('saved')
})