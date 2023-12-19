const navbarToggle = document.querySelector(".toggle-button");
        const nav = document.querySelector(".drop_navigation");

        navbarToggle.addEventListener("click", function() {
        nav.classList.toggle("active");
        });

