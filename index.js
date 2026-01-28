// EASY sugurta - Minimal JavaScript

// Mobile menu toggle
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// License plate input formatting
const licensePlateInput = document.getElementById('licensePlate');

if (licensePlateInput) {
    licensePlateInput.addEventListener('input', (e) => {
        let value = e.target.value.toUpperCase();

        // Remove any characters that aren't numbers, letters, or spaces
        value = value.replace(/[^0-9A-Z\s]/g, '');

        // Auto-format to pattern: 01 A 123 AA
        // Remove all spaces first
        let cleaned = value.replace(/\s/g, '');

        let formatted = '';

        // Add spaces at appropriate positions
        for (let i = 0; i < cleaned.length && i < 10; i++) {
            if (i === 2 || i === 3 || i === 6) {
                formatted += ' ';
            }
            formatted += cleaned[i];
        }

        e.target.value = formatted;
    });

    // Prevent invalid characters on keypress
    licensePlateInput.addEventListener('keypress', (e) => {
        const char = String.fromCharCode(e.which);
        if (!/[0-9A-Za-z\s]/.test(char)) {
            e.preventDefault();
        }
    });
}

// Calculate button validation
const calculateBtn = document.querySelector('.license-plate-wrapper .btn-primary');

if (calculateBtn && licensePlateInput) {
    calculateBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const value = licensePlateInput.value.trim();

        if (value.length < 10) {
            alert('Please enter a valid license plate number');
            licensePlateInput.focus();
            return;
        }

        // In a real application, this would submit to a backend
        console.log('Calculating insurance for:', value);
        alert('Calculation feature will be implemented');
    });
}

// Show all companies button
const showAllBtn = document.querySelector('.companies-rating .btn-secondary');

if (showAllBtn) {
    showAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, this would expand or navigate to full list
        alert('Full company list will be displayed');
    });
}

// Verify policy button
const verifyBtn = document.querySelector('.verification .btn-primary');

if (verifyBtn) {
    verifyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, this would open verification form
        alert('Policy verification form will be displayed');
    });
}
