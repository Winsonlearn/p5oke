const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const expanded = question.getAttribute('aria-expanded') === 'true' || false;
        question.setAttribute('aria-expanded', !expanded);

        const answer = question.nextElementSibling;
        if (!expanded) {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

