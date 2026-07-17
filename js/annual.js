const memories = {
    lab: {
        code: "MEMORY_001 / JUL_2026",
        title: "Nace Crixuz Personal Lab.",
        text: "Se establece el repositorio principal y una identidad digital enfocada en robótica, inteligencia artificial, automatización y programación. Este es el primer registro real del anuario.",
        tags: ["PORTAFOLIO", "GITHUB PAGES", "INICIO"]
    },
    prototype: {
        code: "EMPTY_SLOT / PROTOTYPE",
        title: "El próximo prototipo aún no ocurre.",
        text: "Esta ranura está lista para registrar la fecha, el contexto, fotografías, participantes, aprendizajes y resultados cuando exista un prototipo que quieras conservar.",
        tags: ["PLANTILLA", "PENDIENTE"]
    },
    publication: {
        code: "EMPTY_SLOT / PUBLICATION",
        title: "Aquí vivirá una publicación destacada.",
        text: "Además del enlace académico, este recuerdo podrá explicar cómo nació la idea, qué problemas surgieron y qué personas formaron parte del trabajo.",
        tags: ["PLANTILLA", "PENDIENTE"]
    },
    milestone: {
        code: "EMPTY_SLOT / ACADEMIC_MILESTONE",
        title: "Un hito futuro tendrá su historia.",
        text: "Este espacio podrá registrar defensas, reconocimientos, estancias, congresos o cualquier momento académico que valga la pena recordar.",
        tags: ["PLANTILLA", "PENDIENTE"]
    }
};

const memoryButtons = document.querySelectorAll(".memory-card");
const yearButtons = document.querySelectorAll(".year-filter button");
const detail = document.querySelector("#memory-detail");

function showMemory(key) {
    const memory = memories[key];
    if (!memory) return;
    detail.innerHTML = `<p class="detail-code">${memory.code}</p><h3>${memory.title}</h3><p>${memory.text}</p><div class="detail-tags">${memory.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`;
}

memoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        memoryButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
        showMemory(button.dataset.memory);
    });
});

yearButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedYear = button.dataset.year;
        yearButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
        memoryButtons.forEach((memory) => {
            memory.hidden = selectedYear !== "all" && memory.dataset.year !== selectedYear;
        });
    });
});
