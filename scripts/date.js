const year = document.querySelector('#currentyear');
year.textContent = new Date().getFullYear();

document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
