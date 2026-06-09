const params = new URLSearchParams(window.location.search);

document.querySelector('#show-cityname').textContent = params.get('cityname') || 'N/A';
document.querySelector('#show-civilization').textContent = params.get('civilization') || 'N/A';
document.querySelector('#show-region').textContent = params.get('region') || 'N/A';
document.querySelector('#show-submitname').textContent = params.get('submitname') || 'N/A';
document.querySelector('#show-email').textContent = params.get('email') || 'N/A';
document.querySelector('#show-timestamp').textContent = params.get('timestamp') || 'N/A';