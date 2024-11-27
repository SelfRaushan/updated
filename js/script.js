<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// Smooth scroll functionality for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to sections when they come into view
const sections = document.querySelectorAll('section');
// Function to dynamically add new project fields
document.getElementById('add-project-btn').addEventListener('click', function() {
    const projectsContainer = document.getElementById('projects-container');
    const projectCount = projectsContainer.getElementsByClassName('project-section').length + 1;
    
    const newProjectSection = document.createElement('div');
    newProjectSection.classList.add('project-section');
    newProjectSection.id = 'project' + projectCount;

    const projectNameLabel = document.createElement('label');
    projectNameLabel.setAttribute('for', 'project-name' + projectCount);
    projectNameLabel.textContent = 'Project Name';

    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.id = 'project-name' + projectCount;
    projectNameInput.name = 'project-name' + projectCount;
    projectNameInput.required = true;

    const projectDescLabel = document.createElement('label');
    projectDescLabel.setAttribute('for', 'project-description' + projectCount);
    projectDescLabel.textContent = 'Project Description';

    const projectDescTextarea = document.createElement('textarea');
    projectDescTextarea.id = 'project-description' + projectCount;
    projectDescTextarea.name = 'project-description' + projectCount;
    projectDescTextarea.required = true;

    const projectRoleLabel = document.createElement('label');
    projectRoleLabel.setAttribute('for', 'your-role' + projectCount);
    projectRoleLabel.textContent = 'Your Role';

    const projectRoleInput = document.createElement('input');
    projectRoleInput.type = 'text';
    projectRoleInput.id = 'your-role' + projectCount;
    projectRoleInput.name = 'your-role' + projectCount;
    projectRoleInput.required = true;

    const projectModulesLabel = document.createElement('label');
    projectModulesLabel.setAttribute('for', 'project-modules' + projectCount);
    projectModulesLabel.textContent = 'Number of Modules';

    const projectModulesInput = document.createElement('input');
    projectModulesInput.type = 'number';
    projectModulesInput.id = 'project-modules' + projectCount;
    projectModulesInput.name = 'project-modules' + projectCount;
    projectModulesInput.required = true;

    const projectMembersLabel = document.createElement('label');
    projectMembersLabel.setAttribute('for', 'project-members' + projectCount);
    projectMembersLabel.textContent = 'Project Members (comma separated)';

    const projectMembersInput = document.createElement('input');
    projectMembersInput.type = 'text';
    projectMembersInput.id = 'project-members' + projectCount;
    projectMembersInput.name = 'project-members' + projectCount;
    projectMembersInput.required = true;

    newProjectSection.appendChild(projectNameLabel);
    newProjectSection.appendChild(projectNameInput);
    newProjectSection.appendChild(projectDescLabel);
    newProjectSection.appendChild(projectDescTextarea);
    newProjectSection.appendChild(projectRoleLabel);
    newProjectSection.appendChild(projectRoleInput);
    newProjectSection.appendChild(projectModulesLabel);
    newProjectSection.appendChild(projectModulesInput);
    newProjectSection.appendChild(projectMembersLabel);
    newProjectSection.appendChild(projectMembersInput);

    projectsContainer.appendChild(newProjectSection);
});

// Function to generate the resume PDF
document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to server

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const hobbies = document.getElementById('hobbies').value;

    // Add profile image if available
    const imageInput = document.getElementById('image');
    if (imageInput.files.length > 0) {
        const image = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            doc.addImage(e.target.result, 'JPEG', 15, 10, 50, 50); // Adds image to the PDF
            generatePDFContent(doc);
        };
        reader.readAsDataURL(image);
    } else {
        generatePDFContent(doc);
    }

    // Function to add content to the PDF
    function generatePDFContent(doc) {
        doc.setFontSize(18);
        doc.text('Resume of ' + name, 20, 70);
        doc.setFontSize(12);
        doc.text('Email: ' + email, 20, 80);
        doc.text('Education: ' + education, 20, 90);
        doc.text('Skills: ' + skills, 20, 100);
        doc.text('Hobbies: ' + hobbies, 20, 110);

        // Iterate through projects and add to PDF
        const projects = document.getElementById('projects-container').getElementsByClassName('project-section');
        let yPos = 120;
        for (let i = 0; i < projects.length; i++) {
            const projectName = projects[i].querySelector('input[name^="project-name"]').value;
            const projectDescription = projects[i].querySelector('textarea[name^="project-description"]').value;
            const projectRole = projects[i].querySelector('input[name^="your-role"]').value;
            const projectModules = projects[i].querySelector('input[name^="project-modules"]').value;
            const projectMembers = projects[i].querySelector('input[name^="project-members"]').value;

            doc.text('Project ' + (i+1) + ': ' + projectName, 20, yPos);
            yPos += 10;
            doc.text('Description: ' + projectDescription, 20, yPos);
            yPos += 10;
            doc.text('Role: ' + projectRole, 20, yPos);
            yPos += 10;
            doc.text('Modules: ' + projectModules, 20, yPos);
            yPos += 10;
            doc.text('Members: ' + projectMembers, 20, yPos);
            yPos += 20;
        }

        // Save the generated PDF
        doc.save('resume.pdf');
    }
});

// Script.js

document.getElementById("resume-form").addEventListener("submit", function (e) {
    e.preventDefault();
    showModal("Generating your resume...");
    setTimeout(() => {
        generatePDF();
    }, 2000);
});

// Script to generate PDF and dynamic functionality
document.getElementById("generate-resume-btn").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;
    const hobbies = document.getElementById("hobbies").value;

    // Add content to PDF
    pdf.text("Resume", 10, 10);
    pdf.text(`Name: ${name}`, 10, 20);
    pdf.text(`Email: ${email}`, 10, 30);
    pdf.text(`Education: ${education}`, 10, 40);
    pdf.text("Skills:", 10, 50);
    pdf.text(skills, 10, 60);
    pdf.text("Hobbies:", 10, 80);
    pdf.text(hobbies, 10, 90);

    // Save PDF
    pdf.save(`${name}-Resume.pdf`);
});

function generatePDF() {
    const form = document.getElementById("resume-form");
    const formData = new FormData(form);

    const docContent = `
        Name: ${formData.get("name")}
        Email: ${formData.get("email")}
        Education: ${formData.get("education")}
        Skills: ${formData.get("skills")}
        Hobbies: ${formData.get("hobbies")}
    `;

    const doc = new jsPDF();
    doc.text(docContent, 10, 10);

    closeModal();
    doc.save("resume.pdf");
}

function animateOnScroll() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('animate'); // Adds animation class when section is in view
        }
    });
}
document.getElementById("resume-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Your resume has been created!");
});

let projectCount = 1;
        let imageDataUrl = '';

        // Read the image file and convert it to base64
        document.getElementById('image').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = function() {
                imageDataUrl = reader.result; // Base64 data
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });

        // Add Project Button - Dynamic Project Section
        document.getElementById('add-project-btn').addEventListener('click', function () {
            const projectsContainer = document.getElementById('projects-container');
            const projectCount = projectsContainer.getElementsByClassName('project-section').length + 1;
        
            const newProject = document.createElement('div');
            newProject.classList.add('project-section');
            newProject.id = `project${projectCount}`;
        
            newProject.innerHTML = `
                <label for="project-name${projectCount}">Project Name</label>
                <input type="text" id="project-name${projectCount}" name="project-name${projectCount}" required>
        
                <label for="project-description${projectCount}">Project Description</label>
                <textarea id="project-description${projectCount}" name="project-description${projectCount}" required></textarea>
        
                <label for="your-role${projectCount}">Your Role</label>
                <input type="text" id="your-role${projectCount}" name="your-role${projectCount}" required>
        
                <label for="project-modules${projectCount}">Number of Modules</label>
                <input type="number" id="project-modules${projectCount}" name="project-modules${projectCount}" required>
        
                <label for="members-count${projectCount}">Number of Members</label>
                <input type="number" id="members-count${projectCount}" name="members-count${projectCount}" required>
        
                <label for="project-members${projectCount}">Project Members (comma separated)</label>
                <input type="text" id="project-members${projectCount}" name="project-members${projectCount}" required>
            `;
        
            projectsContainer.appendChild(newProject);
        });


        document.getElementById("resume-form").addEventListener("submit", function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const education = document.getElementById("education").value;
            const skills = document.getElementById("skills").value;
            const hobbies = document.getElementById("hobbies").value;

            // Collect all projects data
            let projects = [];
            for (let i = 1; i <= projectCount; i++) {
                const projectName = document.getElementById(`project-name${i}`).value;
                const projectDescription = document.getElementById(`project-description${i}`).value;
                const role = document.getElementById(`your-role${i}`).value;
                const modules = document.getElementById(`project-modules${i}`).value;
                const membersCount = document.getElementById(`members-count${i}`).value;
                const members = document.getElementById(`project-members${i}`).value.split(',');

                projects.push({
                    projectName,
                    projectDescription,
                    role,
                    modules,
                    membersCount,
                    members
                });
            }

            // Use jsPDF to generate a PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add the image if provided
            if (imageDataUrl) {
                doc.addImage(imageDataUrl, 'JPEG', 15, 15, 40, 40); // Adding the image to the top-left corner
            }

            // Add content to the PDF
            doc.setFont("helvetica");
            doc.setFontSize(20);
            doc.text("Resume", 20, 60);

            // Add user input to the PDF
            doc.setFontSize(16);
            doc.text(`Full Name: ${name}`, 20, 80);
            doc.text(`Email: ${email}`, 20, 90);
            doc.text(`Education: ${education}`, 20, 100);
            doc.text(`Skills:`, 20, 110);
            doc.text(skills, 20, 120);
            doc.text(`Hobbies:`, 20, 150);
            doc.text(hobbies, 20, 160);

            // Add projects to the PDF
            doc.text("Projects:", 20, 190);
            projects.forEach((project, index) => {
                doc.text(`Project ${index + 1}: ${project.projectName}`, 20, 200 + (index * 30));
                doc.text(`Description: ${project.projectDescription}`, 20, 210 + (index * 30));
                doc.text(`Your Role: ${project.role}`, 20, 220 + (index * 30));
                doc.text(`Modules: ${project.modules}`, 20, 230 + (index * 30));
                doc.text(`Members: ${project.members.join(', ')}`, 20, 240 + (index * 30));
            });

            // Save or show the PDF
            const pdfOutput = doc.output("bloburl");

            // Show the generated PDF as an embedded PDF viewer
            const iframe = document.createElement("iframe");
            iframe.src = pdfOutput;
            iframe.width = "100%";
            iframe.height = "600px";
            document.getElementById("create-resume").appendChild(iframe);
        });

window.addEventListener('scroll', animateOnScroll);
