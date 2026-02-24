document.addEventListener("DOMContentLoaded", () => {

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dark Mode Toggle Logic ---
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
        const iconSpan = toggleBtn.querySelector(".material-symbols-outlined");
        const body = document.body;

        // Check saved preference
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            body.classList.add("dark-mode");
            iconSpan.textContent = "light_mode";
        }

        toggleBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains("dark-mode");
            iconSpan.textContent = isDark ? "light_mode" : "dark_mode";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // --- Toggle List Logic ---
    const toggleHeaders = document.querySelectorAll(".toggle-header");
    toggleHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            item.classList.toggle("active");
        });
    });

    // --- Legend Scroll Spy Logic ---
    const legendItems = document.querySelectorAll(".legend-item");
    const sections = document.querySelectorAll("section[id], header[id], .toggle-item[id]");

    if (legendItems.length > 0 && sections.length > 0) {
        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    legendItems.forEach(item => {
                        item.classList.remove("active");
                        if (item.getAttribute("data-target") === id) {
                            item.classList.add("active");
                            // Auto-scroll the legend item into view within the widget
                            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    });
                }
            });
        }, {
            rootMargin: "-20% 0px -70% 0px", // Trigger when section is in the upper middle
            threshold: 0
        });

        sections.forEach(section => spyObserver.observe(section));

        // Smooth scroll for legend items
        legendItems.forEach(item => {
            item.addEventListener("click", () => {
                const targetId = item.getAttribute("data-target");
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Offset for header
                        behavior: "smooth"
                    });
                }
            });
        });

        // --- Legend Dissolve Logic (Scroll to Bottom) ---
        const footer = document.querySelector("footer");
        const legendSidebar = document.querySelector(".legend-sidebar");

        if (footer && legendSidebar) {
            const footerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        legendSidebar.classList.add("dissolved");
                    } else {
                        legendSidebar.classList.remove("dissolved");
                    }
                });
            }, {
                rootMargin: "0px 0px -50px 0px", // Trigger slightly before footer fully enters
                threshold: 0.1
            });

            footerObserver.observe(footer);
        }
    }

    // --- Dynamic Greeting in Console ---
    console.log(
        "%c Hello! Looking for clean code? You found it. ",
        "background: #111; color: #fff; padding: 10px; border-radius: 4px; font-family: sans-serif;"
    );
});
