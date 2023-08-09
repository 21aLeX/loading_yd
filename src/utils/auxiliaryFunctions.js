import { addFiles } from '../slices/filesSlise';
import image from '../assets/file.png';

const renderImgs = (files) => files.map((file) => {
  const img = document.createElement('img');
  const figure = document.createElement('figure');
  const figcaption = document.createElement('figcaption');
  const url = file.type === 'image/jpeg' ? URL.createObjectURL(file) : image;
  img.setAttribute('src', url);
  img.setAttribute('alt', file.name);
  figcaption.innerText = file.name;
  figure.append(img, figcaption);
  return figure;
});
const getUnique = (files, newFiles, namesSet, dispatch) => {
  const resultFiles = [...files];
  const resultNamesFiles = [];
  const names = Array.from(namesSet);
  newFiles.forEach((file) => {
    const { name } = file;
    if (!names.includes(name)) {
      resultNamesFiles.push(name);
      resultFiles.push(file);
    } else {
      const index = names.indexOf(name);
      resultFiles[index] = file;
    }
  });
  dispatch(addFiles(resultNamesFiles));
  return resultFiles;
};

export { renderImgs, getUnique };
