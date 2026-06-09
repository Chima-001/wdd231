const url = 'data/members.json';
const container = document.querySelector('#directory');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const darkBtn = document.querySelector('#dark-mode-btn')
const navButton = document.querySelector('#nav-button')
const navBar = document.querySelector('#nav-bar')

function observeCards(selector) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(`${selector}:not(.visible)`).forEach(card => {
    observer.observe(card);
  });
}

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.members);
}

const displayMembers = (members) => {
  if (!container) return;

  members.forEach((member, index) => {
    const card = document.createElement('div');
    card.style.animationDelay = `${index * 0.15}s`;

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

  observeCards('.member-card');
};

if (container && gridBtn && listBtn) {
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
}

document.querySelector('#copyright-year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

if (navButton && navBar) {
  navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
    darkBtn.classList.toggle('hidden');
  });
}

if (darkBtn) {
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
}

if (container) getMembers();