const params = new URLSearchParams(window.location.search);
document.querySelector('#show-firstname').textContent = params.get('firstname') || 'N/A';
document.querySelector('#show-lastname').textContent = params.get('lastname') || 'N/A';
document.querySelector('#show-email').textContent = params.get('email') || 'N/A';
document.querySelector('#show-phone').textContent = params.get('phone') || 'N/A';
document.querySelector('#show-organization').textContent = params.get('organization') || 'N/A';
document.querySelector('#show-timestamp').textContent = params.get('timestamp') || 'N/A';