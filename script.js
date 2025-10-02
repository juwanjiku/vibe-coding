const coursesData = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites from scratch.",
        icon: "🌐",
        lessons: [
            { id: 1, title: "Introduction to HTML", duration: "15 min" },
            { id: 2, title: "CSS Styling Basics", duration: "20 min" },
            { id: 3, title: "JavaScript Essentials", duration: "25 min" },
            { id: 4, title: "Responsive Design", duration: "18 min" },
            { id: 5, title: "Building Your First Website", duration: "30 min" }
        ],
        completed: false,
        progress: 0
    },
    {
        id: 2,
        title: "Python Programming Masterclass",
        description: "Master Python programming from beginner to advanced level with hands-on projects.",
        icon: "🐍",
        lessons: [
            { id: 1, title: "Python Basics & Syntax", duration: "22 min" },
            { id: 2, title: "Data Structures in Python", duration: "28 min" },
            { id: 3, title: "Object-Oriented Programming", duration: "35 min" },
            { id: 4, title: "File Handling & Libraries", duration: "25 min" },
            { id: 5, title: "Building a Python Project", duration: "40 min" }
        ],
        completed: false,
        progress: 0
    },
    {
        id: 3,
        title: "Data Science & Analytics",
        description: "Explore data analysis, visualization, and machine learning fundamentals using Python.",
        icon: "📊",
        lessons: [
            { id: 1, title: "Introduction to Data Science", duration: "20 min" },
            { id: 2, title: "Data Cleaning & Preparation", duration: "30 min" },
            { id: 3, title: "Data Visualization Techniques", duration: "25 min" },
            { id: 4, title: "Statistical Analysis", duration: "32 min" },
            { id: 5, title: "Introduction to Machine Learning", duration: "35 min" }
        ],
        completed: false,
        progress: 0
    },
    {
        id: 4,
        title: "Mobile App Development",
        description: "Create powerful mobile applications for iOS and Android using modern frameworks.",
        icon: "📱",
        lessons: [
            { id: 1, title: "Mobile Development Overview", duration: "18 min" },
            { id: 2, title: "UI/UX Design Principles", duration: "25 min" },
            { id: 3, title: "Building Your First App", duration: "35 min" },
            { id: 4, title: "Navigation & State Management", duration: "28 min" },
            { id: 5, title: "Publishing Your App", duration: "22 min" }
        ],
        completed: false,
        progress: 0
    }
];

function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';
    
    coursesData.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.onclick = () => showCourse(course.id);
        
        const statusClass = course.completed ? 'status-complete' : 'status-incomplete';
        const statusText = course.completed ? 'Completed' : 'In Progress';
        const checkmark = course.completed ? '<span class="checkmark">✓</span>' : '';
        
        courseCard.innerHTML = `
            <div class="course-image">${course.icon}</div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-lessons">${course.lessons.length} Lessons</span>
                    <span class="course-status ${statusClass}">
                        ${checkmark} ${statusText}
                    </span>
                </div>
            </div>
        `;
        
        coursesGrid.appendChild(courseCard);
    });
}

function showCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    const homePage = document.getElementById('homePage');
    const coursePage = document.getElementById('coursePage');
    const courseDetail = document.getElementById('courseDetail');
    
    homePage.style.display = 'none';
    coursePage.style.display = 'block';
    
    const lessonsHTML = course.lessons.map(lesson => `
        <div class="lesson-item">
            <div class="lesson-info">
                <div class="lesson-number">Lesson ${lesson.id}</div>
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-duration">${lesson.duration}</div>
            </div>
        </div>
    `).join('');
    
    const buttonText = course.completed ? 'Course Completed ✓' : 'Mark as Completed';
    const buttonClass = course.completed ? 'btn-complete completed' : 'btn-complete';
    const buttonDisabled = course.completed ? 'disabled' : '';
    
    courseDetail.innerHTML = `
        <div class="course-detail-header">
            <div class="course-image" style="width: 80px; height: 80px; font-size: 2rem; display: inline-flex; border-radius: 12px;">${course.icon}</div>
            <h2 class="course-detail-title">${course.title}</h2>
            <p class="course-description">${course.description}</p>
            <div class="progress-section">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-weight: 600; color: #667eea;">Course Progress</span>
                    <span style="font-weight: 600; color: #667eea;">${course.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
            </div>
        </div>
        
        <div class="lessons-section">
            <h3 class="lessons-title">Course Lessons</h3>
            ${lessonsHTML}
        </div>
        
        <button class="${buttonClass}" onclick="markAsCompleted(${courseId})" ${buttonDisabled}>
            ${buttonText}
        </button>
    `;
}

function markAsCompleted(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course || course.completed) return;
    
    course.completed = true;
    course.progress = 100;
    
    showCourse(courseId);
    
    setTimeout(() => {
        alert('🎉 Congratulations! You have completed this course!');
    }, 100);
}

function goHome() {
    const homePage = document.getElementById('homePage');
    const coursePage = document.getElementById('coursePage');
    
    coursePage.style.display = 'none';
    homePage.style.display = 'block';
    
    loadCourses();
}

function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        tabs[0].classList.add('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        tabs[1].classList.add('active');
    }
}

function handleLogin() {
    alert('Login successful! Welcome back to LearnHub!');
    closeLogin();
}

function handleSignup() {
    alert('Account created successfully! Welcome to LearnHub!');
    closeLogin();
}

window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLogin();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
});
