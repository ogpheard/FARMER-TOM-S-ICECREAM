document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (!form || !status) {
        return;
    }

    const inputs = Array.from(form.querySelectorAll('input, select, textarea'));

    const showStatus = (message, type) => {
        status.textContent = message;
        status.classList.remove('success', 'error');
        status.classList.add(type, 'visible');
    };

    inputs.forEach((field) => {
        field.addEventListener('input', () => {
            field.classList.remove('has-error');
            if (status.classList.contains('visible') && status.classList.contains('error')) {
                status.classList.remove('visible');
            }
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        inputs.forEach((field) => {
            field.classList.remove('has-error');
            if (!field.checkValidity()) {
                field.classList.add('has-error');
                isValid = false;
            }
        });

        if (!isValid) {
            showStatus('Please check the highlighted fields and try again.', 'error');
            const firstError = inputs.find((field) => field.classList.contains('has-error'));
            if (firstError) {
                firstError.focus();
            }
            return;
        }

        showStatus('Thank you! Your message is on its way to Farmer Tom.', 'success');
        form.reset();

        setTimeout(() => {
            status.classList.remove('visible');
        }, 6000);
    });
});
