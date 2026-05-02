const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true
    },

    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },

    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true
    },

    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: true
    },

    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true
    },

    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        completed: false
    }

];

const courseList = document.querySelector('#course-list');
const creditTotal = document.querySelector('#credit-total');
const filterButtons = document.querySelectorAll('.filter-buttons button');

function showCourses(list) {
    courseList.innerHTML = '';
    list.forEach(course => {
        const card = document.createElement('div');
        card.className = `card ${course.completed ? 'done' : ''}`;
        card.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(card);
    });
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