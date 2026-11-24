document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatic Copyright Year
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Greeting Based on Time of Day (Home Page)
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
        const hour = new Date().getHours();
        if (hour < 12) {
            greetingEl.textContent = "Good morning! Welcome to my portfolio.";
        } else if (hour < 18) {
            greetingEl.textContent = "Good afternoon! Welcome to my portfolio.";
        } else {
            greetingEl.textContent = "Good evening! Welcome to my portfolio.";
        }
    }

    // 3. Typing Effect on Tagline (Home Page)
    const taglineEl = document.getElementById("tagline");
    if (taglineEl) {
        const phrases = [
            "Aspiring Industrial Electronics & IoT Technologist",
            "Embedded Systems & Microcontroller Builder",
            "Responsive Web Application Developer"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            taglineEl.textContent = currentPhrase.substring(0, charIndex);

            let speed = isDeleting ? 45 : 85;
            if (!isDeleting && charIndex === currentPhrase.length) {
                speed = 1600;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 400;
            }
            setTimeout(typeEffect, speed);
        }
        typeEffect();
    }

    // 4. Responsive Hamburger Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    // 5. Dark / Light Mode Toggle (with localStorage)
    const themeToggle = document.getElementById("themeToggle");
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggle) themeToggle.textContent = "Light Mode";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    // 6. Read More Toggle (About Me Page)
    const readMoreBtn = document.getElementById("readMoreBtn");
    const moreText = document.getElementById("moreText");
    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener("click", () => {
            moreText.classList.toggle("hidden");
            readMoreBtn.textContent = moreText.classList.contains("hidden")
                ? "Read More"
                : "Show Less";
        });
    }

    // 7. Animated Skill Bars (Skills Page)
    const progressFills = document.querySelectorAll(".progress-fill");
    if (progressFills.length > 0) {
        setTimeout(() => {
            progressFills.forEach((bar) => {
                const targetWidth = bar.getAttribute("data-width");
                bar.style.width = targetWidth;
            });
        }, 200);
    }

    // 8. Project Category Filter (Projects Page)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    if (filterButtons.length > 0) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                const category = btn.getAttribute("data-filter");
                projectCards.forEach((card) => {
                    const cardCat = card.getAttribute("data-category");
                    if (category === "all" || cardCat === category) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // 9. Contact Form Validation (Compulsory)
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");

            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const subjectError = document.getElementById("subjectError");
            const messageError = document.getElementById("messageError");
            const formSuccess = document.getElementById("formSuccess");

            let isValid = true;
            nameError.textContent = "";
            emailError.textContent = "";
            subjectError.textContent = "";
            messageError.textContent = "";
            formSuccess.style.display = "none";

            if (name.value.trim().length < 2) {
                nameError.textContent = "Please enter your name (at least 2 characters).";
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = "Please enter a valid email address.";
                isValid = false;
            }

            if (subject.value.trim().length < 3) {
                subjectError.textContent = "Please enter a subject (at least 3 characters).";
                isValid = false;
            }

            if (message.value.trim().length < 10) {
                messageError.textContent = "Please write a message of at least 10 characters.";
                isValid = false;
            }

            if (isValid) {
                formSuccess.style.display = "block";
                contactForm.reset();
            }
        });
    }

    // 10. Scroll-to-Top Button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.style.display = window.scrollY > 250 ? "block" : "none";
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 11. Profile Avatar Modal (Social Media Style Preview)
    const profileAvatarTrigger = document.getElementById("profileAvatarTrigger");
    const avatarModal = document.getElementById("avatarModal");
    const avatarModalImg = document.getElementById("avatarModalImg");
    const closeAvatarModal = document.getElementById("closeAvatarModal");

    if (profileAvatarTrigger && avatarModal && avatarModalImg) {
        const avatarSrcEl = profileAvatarTrigger.querySelector("img");

        profileAvatarTrigger.addEventListener("click", () => {
            if (avatarSrcEl) {
                avatarModalImg.src = avatarSrcEl.getAttribute("src");
                avatarModalImg.alt = avatarSrcEl.getAttribute("alt") || "Profile photo";
            }
            avatarModal.classList.add("open");
            avatarModal.setAttribute("aria-hidden", "false");
        });

        const closeModal = () => {
            avatarModal.classList.remove("open");
            avatarModal.setAttribute("aria-hidden", "true");
        };

        if (closeAvatarModal) {
            closeAvatarModal.addEventListener("click", closeModal);
        }

        avatarModal.addEventListener("click", (e) => {
            if (e.target === avatarModal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && avatarModal.classList.contains("open")) {
                closeModal();
            }
        });
    }
});