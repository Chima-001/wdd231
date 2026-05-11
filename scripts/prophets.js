//const { lazy } = require("react");
const year = document.querySelector('#currentyear');
year.textContent = new Date().getFullYear();

document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    //console.table(data.prophets);
    displayProphets(data.prophets);

}
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        card.classList.add('prophet-card');
        let fullName = document.createElement('h2');
        fullName.classList.add('prophet-name');
        let portrait = document.createElement('img');
        portrait.classList.add('prophet-img');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');

        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
        fullName.textContent= `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);

        portrait.setAttribute('alt', `portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthdate);
        card.appendChild(birthplace);

        cards.appendChild(card);

    });
}
    getProphetData();