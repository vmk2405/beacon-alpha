import './style.css'

document.querySelector('#app').innerHTML = `
  <!-- Content is in index.html, this file just imports style.css for Vite -->
`
// Since we are using index.html as the entry point with vanilla JS, 
// we mostly just need the CSS import. 
// However, let's add the form handling logic here since it's cleaner.

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;

            // Construct Mailto Link
            const subject = `New Inquiry from ${name}`;
            const body = `Name: ${name}%0D%0APhone: ${phone}%0D%0AEmail: ${email}%0D%0A%0D%0APlease contact me back.`;

            const message = document.getElementById('message') ? document.getElementById('message').value : "No message body";

            const btn = contactForm.querySelector('button[type="submit"]');
            const status = document.getElementById('formStatus');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;
            if (status) {
                status.innerText = ''; // Clear previous status
                status.style.color = ''; // Clear previous color
            }

            // Real submission to FormSubmit.co
            fetch("https://formsubmit.co/ajax/beakonalpha@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    email: email,
                    message: message,
                    _subject: "New Contact from Beakon Alpha Site"
                })
            })
                .then(response => response.json())
                .then(data => {
                    btn.innerText = 'Message Sent';
                    if (status) {
                        status.innerText = "Thanks! We've received your message and will check our emails.";
                        status.style.color = "#4BB543"; // Success Green
                    }
                    contactForm.reset();

                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                        if (status) {
                            status.innerText = '';
                        }
                    }, 8000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    btn.innerText = 'Try Again';
                    btn.disabled = false;
                    if (status) {
                        status.innerText = "Something went wrong. Please email us directly at beakonalpha@gmail.com";
                        status.style.color = "#ff4444"; // Error Red
                    }
                });
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
