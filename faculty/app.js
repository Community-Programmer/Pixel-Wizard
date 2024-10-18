const facultyData = [
    {
        name: "Dr. Amrit Singh",
        department: "Computer Science",
        email: "amrit.singh@sliet.edu",
        phone: "+91 98765 43210",
        photo: "/placeholder.svg?height=200&width=200",
        content: "Dr. Amrit Singh is a professor of Computer Science with over 15 years of experience in teaching and research. His areas of expertise include Machine Learning and Artificial Intelligence."
    },
    {
        name: "Prof. Gurpreet Kaur",
        department: "Mechanical Engineering",
        email: "gurpreet.kaur@sliet.edu",
        phone: "+91 98765 43211",
        photo: "/placeholder.svg?height=200&width=200",
        content: "Prof. Gurpreet Kaur is an associate professor in Mechanical Engineering. She specializes in Robotics and Automation, with several published papers in international journals."
    },
    {
        name: "Dr. Harjinder Singh",
        department: "Electrical Engineering",
        email: "harjinder.singh@sliet.edu",
        phone: "+91 98765 43212",
        photo: "/placeholder.svg?height=200&width=200",
        content: "Dr. Harjinder Singh leads the Electrical Engineering department. His research focuses on Power Systems and Renewable Energy, contributing to sustainable energy solutions."
    },
    {
        name: "Dr. Harjinder Singh",
        department: "Electrical Engineering",
        email: "harjinder.singh@sliet.edu",
        phone: "+91 98765 43212",
        photo: "/placeholder.svg?height=200&width=200",
        content: "Dr. Harjinder Singh leads the Electrical Engineering department. His research focuses on Power Systems and Renewable Energy, contributing to sustainable energy solutions."
    }
];

function createFacultyCards() {
    const container = document.getElementById('faculty-container');
    facultyData.forEach(faculty => {
        const card = document.createElement('div');
        card.className = 'faculty-card';
        card.innerHTML = `
            <div class="faculty-info">
                <img src="${faculty.photo}" alt="${faculty.name}" class="faculty-photo">
                <h2 class="faculty-name">${faculty.name}</h2>
                <p class="faculty-department">${faculty.department}</p>
                <div class="faculty-contact">
                    <a href="mailto:${faculty.email}" aria-label="Email ${faculty.name}">📧</a>
                    <a href="tel:${faculty.phone}" aria-label="Call ${faculty.name}">📞</a>
                </div>
            </div>
            <div class="faculty-content">
                <p>${faculty.content}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createFacultyCards);