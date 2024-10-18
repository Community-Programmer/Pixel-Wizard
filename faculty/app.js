const facultyData = [
    {
        name: "Dr. Birmohan Singh",
        department: "Professor",
        education: "Ph.D., M.E.",
        email: "birmohansingh@sliet.ac.in",
        phone: "+91-1672-253208",
        photo: "http://sliet.ac.in/wp-content/uploads/avatars/5/6fc17d6735998f4f22a0e91fbf43b75c-bpfull.jpg",
        content: "Dr. Birmohan Singh is a professor of Computer Science with over 30 years of experience in teaching. His areas of expertise include Software Engineering, Operating Systems, System Software, Object-Oriented Programming, System Analysis and Design, Data Structures, and Computer Graphics.",
        link:"http://cs.sliet.ac.in/people/birmohan/",
    },

    {
        name: "Dr. Damanpreet Singh",
        department: "Professor",
        education: "Ph.D., M.Tech, B.Tech.",
        email: "damanpreets@sliet.ac.in",
        phone: "+91-1672-253210",
        photo: "http://sliet.ac.in/wp-content/uploads/avatars/4/65783e7db0473-bpfull.jpg",
        content: "Dr. Damanpreet Singh is a professor of Computer Science with over 25 years of experience in teaching. His areas of expertise include Administrative Responsibilities and Present Responsibilities.",
        link:"http://cs.sliet.ac.in/people/daman/",
    },

    {
        name: "Dr. Major Singh Goraya",
        department: "Professor",
        education: "B.Tech,  M.E, Ph.D",
        email: "mjrsingh@yahoo.com",
        phone: "01672-253212",
        photo: "http://sliet.ac.in/wp-content/uploads/avatars/35/5e69c6be20c7e-bpfull.jpg",
        content: "Dr. Damanpreet Singh is a professor of Computer Science . His areas of expertise include Administrative Responsibilities and Present Responsibilities.",
        link:"http://cs.sliet.ac.in/people/daman/",

    },

    {
        name: "Dr. Manoj Sachan",
        department: "Professor",
        education: "B.Tech,  M.E, Ph.D",
        email: "manojsachan@sliet.ac.in",
        phone: "+91-1672-253214",
        photo: "http://sliet.ac.in/wp-content/uploads/avatars/6/605c66bd3e3bc-bpfull.jpg",
        content: "Dr. Manoj Sachan leads the Electrical Engineering department. His research focuses on Power Systems and Renewable Energy, contributing to sustainable energy solutions.",
        link:"http://cs.sliet.ac.in/people/daman/",

    },

    {
        name: "Dr. Gurjinder Kaur",
        department: "Associate Professor",
        education: "Ph.D. (not specified)",
        email: "gurjinder13@yahoo.com",
        phone: "+91-1672-253326",
        photo: "http://sliet.ac.in/wp-content/uploads/avatars/14/5f2245e7a7f1bde5dee5bda48e09d411-bpfull.jpg",
        content: "Dr. Manoj Sachan leads the Electrical Engineering department. His research focuses on Power Systems and Renewable Energy, contributing to sustainable energy solutions.",
        link:"http://cs.sliet.ac.in/people/daman/",
    },

    {
        name: "Dr. Major Singh Goraya",
        department: "Electrical Engineering",
        education: "Ph.D. (not specified)",
        email: "mjrsingh@yahoo.com",
        phone: "01672-253212",
        photo: "http://sliet.ac.in/wp-content/uploads/avatars/35/5e69c6be20c7e-bpfull.jpg",
        content: "Dr. Major Singh Goraya leads the Electrical Engineering department. His research focuses on Power Systems and Renewable Energy, contributing to sustainable energy solutions."
    },
];
function createFacultyCards() {
    const container = document.getElementById('faculty-container');
    facultyData.forEach(faculty => {
        const card = document.createElement('div');
        card.className = 'faculty-card';
        
        const facultyInfo = document.createElement('div');
        facultyInfo.className = 'faculty-info';

        const photo = document.createElement('img');
        photo.src = faculty.photo;
        photo.alt = faculty.name;
        photo.className = 'faculty-photo';

        const name = document.createElement('h2');
        name.className = 'faculty-name';
        name.textContent = faculty.name;

        const department = document.createElement('p');
        department.className = 'faculty-department';
        department.textContent = faculty.department;

        const education = document.createElement('p');
        education.className = 'faculty-education';
        education.textContent = `Education: ${faculty.education}`;

        const contactDiv = document.createElement('div');
        contactDiv.className = 'faculty-contact';

        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${faculty.email}`;
        emailLink.innerHTML = `📧 ${faculty.email}`; // Email icon and text
        emailLink.ariaLabel = `Email ${faculty.name}`;
        
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${faculty.phone}`;
        phoneLink.innerHTML = `📞 ${faculty.phone}`; // Phone icon and text
        phoneLink.ariaLabel = `Call ${faculty.name}`;

        // Create separate paragraphs for email and phone
        const emailParagraph = document.createElement('p');
        emailParagraph.appendChild(emailLink);
        
        const phoneParagraph = document.createElement('p');
        phoneParagraph.appendChild(phoneLink);

        contactDiv.appendChild(emailParagraph);
        contactDiv.appendChild(phoneParagraph);

        facultyInfo.appendChild(photo);
        facultyInfo.appendChild(name);
        facultyInfo.appendChild(department);
        facultyInfo.appendChild(education);
        facultyInfo.appendChild(contactDiv);
        
        const facultyContent = document.createElement('div');
        facultyContent.className = 'faculty-content';
        const contentParagraph = document.createElement('p');
        contentParagraph.textContent = faculty.content;

        facultyContent.appendChild(contentParagraph);

        // Add the faculty link if it exists
        if (faculty.link) {
            const linkButton = document.createElement('a');
            linkButton.href = faculty.link;
            linkButton.className = 'faculty-link';
            linkButton.textContent = 'View Profile';
            linkButton.target = '_blank'; // Opens the link in a new tab

            facultyContent.appendChild(linkButton);
        }

        card.appendChild(facultyInfo);
        card.appendChild(facultyContent);

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createFacultyCards);
