(function () {
    "use strict";

    var root = document.documentElement;

    /* --- Tema claro / oscuro --- */
    var boton = document.querySelector(".theme-toggle");

    function actualizarBoton() {
        var oscuro = root.getAttribute("data-theme") === "dark";
        boton.setAttribute("aria-label", oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", oscuro ? "#0c1a34" : "#10203f");
    }

    if (boton) {
        actualizarBoton();
        boton.addEventListener("click", function () {
            var nuevo = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", nuevo);
            try { localStorage.setItem("tema", nuevo); } catch (e) {}
            actualizarBoton();
        });
    }

    /* --- Año del pie de página --- */
    var anio = document.getElementById("anio");
    if (anio) anio.textContent = new Date().getFullYear();

    /* --- Barra de avance de la carrera: se llena al entrar en pantalla --- */
    var barras = document.querySelectorAll(".progress");
    if ("IntersectionObserver" in window) {
        var observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add("in-view");
                    observador.unobserve(e.target);
                }
            });
        }, { threshold: 0.6 });
        barras.forEach(function (b) { observador.observe(b); });
    } else {
        barras.forEach(function (b) { b.classList.add("in-view"); });
    }

        /* --- Tecnologías: los chips aparecen en cascada al entrar en pantalla --- */
    var skills = document.querySelector(".skills");
    if (skills) {
        skills.querySelectorAll(".chips li").forEach(function (li, i) {
            li.style.setProperty("--i", i);
        });
        if ("IntersectionObserver" in window) {
            var obsSkills = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (e) {
                    if (e.isIntersecting) {
                        skills.classList.add("in-view");
                        obsSkills.unobserve(e.target);
                    }
                });
            }, { threshold: 0.3 });
            obsSkills.observe(skills);
        } else {
            skills.classList.add("in-view");
        }
    }
})();
