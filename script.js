document.addEventListener("DOMContentLoaded", () => {
    const elementsToAnimate = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);

                // If the element is a number, start the count animation
                if (entry.target.classList.contains('number')) {
                    animateCount(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

function animateCount(element) {
    const target = +element.getAttribute('data-target');
    const duration = 2000; // Duration of the animation in milliseconds
    const startTime = Date.now();

    function update() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const current = Math.floor(progress * target);
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString(); // Ensure it ends exactly at target
        }
    }

    requestAnimationFrame(update);
}
