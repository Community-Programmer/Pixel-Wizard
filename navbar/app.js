document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    mobileMenuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
                const dropdownArrow = this.querySelector('.dropdown-arrow');
                dropdownArrow.textContent = this.classList.contains('active') ? '▲' : '▼';
            }
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navList.classList.remove('show');
            dropdownItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.dropdown-arrow').textContent = '▼';
            });
        }
    });
});