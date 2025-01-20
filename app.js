// Initialize the slide variables
let currentSlide = 0;
const slides = document.getElementsByClassName('slide');
const dots = document.getElementsByClassName('dot');

function showSlide(index) {
  // Remove active class from all slides and dots
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
    dots[i].classList.remove('active');
  }
  
  // Add active class to current slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Set up automatic sliding
const slideInterval = setInterval(nextSlide, 2000);

// Add click handlers for dots
Array.from(dots).forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
    // Reset the interval when manually changing slides
    clearInterval(slideInterval);
    setInterval(nextSlide, 2000);
  });
});

// Initialize database collections
const room = new WebsimSocket();

async function initializeDatabase() {
  // Create sample data if none exists
  const students = room.collection('student').getList();
  if (!students || students.length === 0) {
    await createSampleData();
  }
}

async function createSampleData() {
  // Sample students
  await room.collection('student').create({
    name: 'John Doe',
    grade: '10th',
    studentId: 'S001',
    contact: 'john.doe@email.com'
  });

  // Sample alumni
  await room.collection('alumni').create({
    name: 'Jane Smith',
    graduationYear: '2020',
    currentOccupation: 'Software Engineer',
    email: 'jane.smith@email.com'
  });

  // Sample teachers
  await room.collection('teacher').create({
    name: 'Mrs. Smith',
    subject: 'Mathematics',
    teacherId: 'T001',
    contact: 'smith@school.edu'
  });
}

function navigate(section) {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Clear current content

  switch(section) {
    case 'about':
      showAboutSchool();
      break;
    case 'teacher':
      showTeachers();
      break;
    case 'students':
      showStudents();
      break;
    case 'alumni':
      showAlumni();
      break;
    case 'data':
      showData();
      break;
    case 'information':
      showInformation();
      break;
  }
}

// Function to display about school section
function showAboutSchool() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="about-container">
      <h2>About Our School</h2>
      <p>Welcome to our prestigious institution dedicated to excellence in education.</p>
      <div class="school-info">
        <div class="info-card">
          <span class="material-icons">history</span>
          <h3>History</h3>
          <p>Established in 1990, our school has been providing quality education for over 30 years.</p>
        </div>
        <div class="info-card">
          <span class="material-icons">stars</span>
          <h3>Vision</h3>
          <p>To be a leading institution in providing comprehensive education and developing future leaders.</p>
        </div>
      </div>
    </div>
  `;
}

// Function to display alumni section
function showAlumni() {
  const content = document.getElementById('content');
  const alumni = room.collection('alumni').getList();

  const alumniList = document.createElement('div');
  alumniList.className = 'list-container';

  alumni.forEach(alum => {
    const alumniCard = document.createElement('div');
    alumniCard.className = 'card';
    alumniCard.innerHTML = `
      <h3>${alum.name}</h3>
      <p>Graduation Year: ${alum.graduationYear}</p>
      <p>Current Occupation: ${alum.currentOccupation}</p>
      <p>Contact: ${alum.email}</p>
    `;
    alumniList.appendChild(alumniCard);
  });

  content.appendChild(alumniList);
}

// Function to display data section
function showData() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="data-container">
      <h2>School Statistics</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="material-icons">groups</span>
          <h3>Total Students</h3>
          <p>1,200</p>
        </div>
        <div class="stat-card">
          <span class="material-icons">school</span>
          <h3>Teachers</h3>
          <p>80</p>
        </div>
        <div class="stat-card">
          <span class="material-icons">workspace_premium</span>
          <h3>Alumni</h3>
          <p>5,000+</p>
        </div>
      </div>
    </div>
  `;
}

// Function to display information section
function showInformation() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="information-container">
      <h2>School Information</h2>
      <div class="info-list">
        <div class="info-item">
          <span class="material-icons">event</span>
          <div class="info-content">
            <h3>Academic Calendar</h3>
            <p>View important dates and events</p>
          </div>
        </div>
        <div class="info-item">
          <span class="material-icons">notifications</span>
          <div class="info-content">
            <h3>Announcements</h3>
            <p>Latest news and updates</p>
          </div>
        </div>
        <div class="info-item">
          <span class="material-icons">contact_mail</span>
          <div class="info-content">
            <h3>Contact Us</h3>
            <p>Get in touch with our staff</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to display teachers section
async function showTeachers() {
  const content = document.getElementById('content');
  const teachers = room.collection('teacher').getList();

  const teacherList = document.createElement('div');
  teacherList.className = 'list-container';

  teachers.forEach(teacher => {
    const teacherCard = document.createElement('div');
    teacherCard.className = 'card';
    teacherCard.innerHTML = `
      <h3>${teacher.name}</h3>
      <p>Subject: ${teacher.subject}</p>
      <p>ID: ${teacher.teacherId}</p>
      <p>Contact: ${teacher.contact}</p>
    `;
    teacherList.appendChild(teacherCard);
  });

  content.appendChild(teacherList);
}

async function showStudents() {
  const content = document.getElementById('content');
  const students = room.collection('student').getList();

  const studentList = document.createElement('div');
  studentList.className = 'list-container';

  students.forEach(student => {
    const studentCard = document.createElement('div');
    studentCard.className = 'card';
    studentCard.innerHTML = `
      <h3>${student.name}</h3>
      <p>Grade: ${student.grade}</p>
      <p>ID: ${student.studentId}</p>
      <p>Contact: ${student.contact}</p>
    `;
    studentList.appendChild(studentCard);
  });

  const addButton = document.createElement('button');
  addButton.className = 'fab';
  addButton.innerHTML = '<span class="material-icons">add</span>';
  addButton.onclick = showAddStudentForm;

  content.appendChild(studentList);
  content.appendChild(addButton);
}

function showAddStudentForm() {
  const dialog = document.createElement('div');
  dialog.className = 'dialog';
  dialog.innerHTML = `
    <form id="addStudentForm">
      <h2>Add New Student</h2>
      <input type="text" placeholder="Name" required>
      <input type="text" placeholder="Grade" required>
      <input type="text" placeholder="Student ID" required>
      <input type="email" placeholder="Contact Email" required>
      <div class="button-group">
        <button type="button" onclick="this.parentElement.parentElement.parentElement.remove()">Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  `;

  document.body.appendChild(dialog);

  dialog.querySelector('form').onsubmit = async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    
    await room.collection('student').create({
      name: inputs[0].value,
      grade: inputs[1].value,
      studentId: inputs[2].value,
      contact: inputs[3].value
    });

    dialog.remove();
    showStudents(); // Refresh the list
  };
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  initializeDatabase();
  
  // Set up real-time updates
  room.collection('student').subscribe(() => {
    if (document.getElementById('content').querySelector('.list-container')) {
      showStudents();
    }
  });
});

// Add styles for the cards and dialogs
const style = document.createElement('style');
style.textContent = `
  .list-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card {
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .fab {
    position: fixed;
    bottom: 80px;
    right: 16px;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fab:hover {
    background-image: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
    transform: scale(1.05);
  }

  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .dialog form {
    background-color: var(--surface-color);
    border: 1px solid var(--primary-color);
    padding: 24px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .dialog input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .button-group button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .button-group button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .button-group button[type="submit"] {
    background-image: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
  }
`;

document.head.appendChild(style);