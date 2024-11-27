// Form Validation Script for Create Resume Form
document.getElementById('resume-form').addEventListener('submit', function (event) {
    let isValid = true;

    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        isValid = false;
        alert('Please enter your name.');
    }

    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.value)) {
        isValid = false;
        alert('Please enter a valid email.');
    }

    // Validate education
    const education = document.getElementById('education');
    if (education.value.trim() === '') {
        isValid = false;
        alert('Please enter your education details.');
    }

    // Validate skills
    const skills = document.getElementById('skills');
    if (skills.value.trim() === '') {
        isValid = false;
        alert('Please enter your skills.');
    }

    if (!isValid) {
        event.preventDefault();
    }
});
