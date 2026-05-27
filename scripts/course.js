const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming using Python, covering variables, decisions, loops, and input/output.',
        technology: ['Python'],
        completed: true
    },

    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduces students to the World Wide Web and careers in web design and developemnt using HTML, CSS.',
        technology: ['HTML, CSS'],
        completed: true
    },

    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write, call, debug, and test functions while solving problems across multiple disciplines.',
        technology: ['Python'],
        completed: true
    },

    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduces object-oriented programming principles including classes, inheritance and polymorphism using C#.',
        technology: ['C#'],
        completed: true
    },

    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Builds on web fundamentals by introducing JavaScript to create dynamic, responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },

    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user experience, accessibility, performance optimization, and basic API usage in frontend development.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }

];

const courseList = document.querySelector('#course-list');
const courseDetails = document.querySelector('#course-details');
const creditTotal = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('.filter-buttons button');

function showCourses(list) {
    courseList.innerHTML = '';
    list.forEach(course => {
        const card = document.createElement('div');
        card.className = `card ${course.completed ? 'done' : ''}`;
        card.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(card);
        card.addEventListener('click', ()=>{
            displayCourseDetails(course)
        })
    });
function displayCourseDetails(course) {
    //courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>`;
    courseDetails.showModal();

    document.querySelector('#closeModal').addEventListener("click", ()=>{
        courseDetails.close();
    });

/*    courseDetails.addEventListener('click', (e) => {
        if (e.target === courseDetails){
            courseDetails.close();
        }
    });*/
}
    const total = list.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = `The total credits for course listed above is ${total}`;
}

document.querySelector('#all').addEventListener('click', () => showCourses(courses));
document.querySelector('#wdd').addEventListener('click', () => {
    showCourses(courses.filter(course => course.subject === 'WDD'));
});
document.querySelector('#cse').addEventListener('click', () => {
    showCourses(courses.filter(course => course.subject === 'CSE'));
});

showCourses(courses);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('current'));
        btn.classList.add('current');
    });
});