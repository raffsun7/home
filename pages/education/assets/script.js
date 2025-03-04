document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    const fadeElements = document.querySelectorAll(".fade-in");
    const skillBars = document.querySelectorAll(".skill-fill");

    // Dark Mode Toggle
    const enableDarkMode = () => {
        body.classList.add("dark-mode");
        toggleButton.textContent = "🔆";
        localStorage.setItem("dark-mode", "enabled");
    };

    const disableDarkMode = () => {
        body.classList.remove("dark-mode");
        toggleButton.textContent = "🌙";
        localStorage.setItem("dark-mode", "disabled");
    };

    if (localStorage.getItem("dark-mode") === "enabled") {
        enableDarkMode();
    }

    toggleButton.addEventListener("click", () => {
        body.classList.contains("dark-mode") ? disableDarkMode() : enableDarkMode();
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuToggle.classList.toggle("active");
    });

    // Close Menu When Clicking Outside
    document.addEventListener("click", (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove("show");
            menuToggle.classList.remove("active");
        }
    });

    // Scroll Animation for Sections
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    fadeElements.forEach((el) => observer.observe(el));

    // Skills Progress Bar Animation
    const skillsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const percent = entry.target.getAttribute("data-percent");
                    entry.target.style.width = percent;
                }
            });
        },
        { threshold: 0.5 }
    );

    skillBars.forEach((bar) => skillsObserver.observe(bar));
});