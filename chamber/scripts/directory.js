const url = 'data/members.json';
const container = document.querySelector('#directory');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const darkBtn = document.querySelector('#dark-mode-btn')
const navButton = document.querySelector('#nav-button')
const navBar = document.querySelector('#nav-bar')

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.members);
}

const displayMembers = (members) => {
  members.forEach((member) => {
    const card = document.createElement('div');
    const name = document.createElement('h2');
    const address = document.createElement('p');
    const phone = document.createElement('p');
    const site = document.createElement('a');
    const img = document.createElement('img');
    const badge = document.createElement('p');

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = `Tel: ${member.phone}`;

    site.href = member.website;
    site.textContent = 'View Details';
    site.target = '_blank';
    site.rel = 'noopener';

    img.setAttribute('src', `images/${member.image}`);
    img.setAttribute('alt', member.name);
    img.setAttribute('loading', 'lazy');
    img.setAttribute('width', '200');
    img.setAttribute('height', '150');

    const levels = { 1: 'Regular', 2: 'Silver', 3: 'Gold' };
    badge.textContent = `${levels[member.membershipLevel]} Member`;
    badge.classList.add('badge', `level-${member.membershipLevel}`);

    card.classList.add('member-card');
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(site);
    card.appendChild(badge);

    container.appendChild(card);
  });
};

const savedView = localStorage.getItem('view') || 'grid';
container.className = savedView;
if (savedView === 'list') {
  listBtn.classList.add('active-view');
  gridBtn.classList.remove('active-view');
} else {
  gridBtn.classList.add('active-view');
  listBtn.classList.remove('active-view');
}

gridBtn.addEventListener('click', () => {
  container.classList.add('grid');
  container.classList.remove('list');
  gridBtn.classList.add('active-view');
  listBtn.classList.remove('active-view');
  localStorage.setItem('view', 'grid');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list');
  container.classList.remove('grid');
  listBtn.classList.add('active-view');
  gridBtn.classList.remove('active-view');
  localStorage.setItem('view', 'list');
});

document.querySelector('#copyright-year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
  darkBtn.classList.toggle('hidden');
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  darkBtn.innerHTML = '<img src="images/day.svg" alt="theme toggle">';
}

darkBtn.addEventListener('click', () => {
  const icon = darkBtn.querySelector('img');
  icon.classList.add('spin');
  setTimeout(() => {
    icon.classList.remove('spin');

    if (document.body.classList.contains('dark')) {
      darkBtn.innerHTML = '<img src="images/day.svg" alt="theme toggle">';
      localStorage.setItem('theme', 'dark');
    } else {
      darkBtn.innerHTML = '<img src="images/night.svg" alt="theme toggle">';
      localStorage.setItem('theme', 'light');
    }
  }, 300);
  document.body.classList.toggle('dark');
});

getMembers();