const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const book = document.querySelector("#project-book");
const leftPage = document.querySelector("#book-page-left");
const rightPage = document.querySelector("#book-page-right");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const spreadIndicator = document.querySelector("#spread-indicator");
const currentPages = document.querySelector("#current-pages");
const progressBar = document.querySelector("#book-progress-bar");

const spreads = [
    {
        left: `
            <div class="page-layout book-cover-page">
                <p class="page-number"><span>CRX_ARCHIVE</span><span>VOL.001</span></p>
                <div class="book-emblem"><span>2026</span></div>
                <div>
                    <h3>FIELD<br><span>NOTES</span></h3>
                    <p>ROBOTICS · ARTIFICIAL INTELLIGENCE · SYSTEMS</p>
                </div>
            </div>`,
        right: `
            <div class="page-layout">
                <p class="page-number"><span>READER_MANUAL</span><span>02</span></p>
                <p class="page-kicker">Cómo leer esta bitácora</p>
                <h3>El proceso también es parte del proyecto.</h3>
                <div class="page-rule"></div>
                <ol class="manual-list">
                    <li><div><strong>Hipótesis</strong>Qué problema quiero comprender o resolver.</div></li>
                    <li><div><strong>Prototipo</strong>La versión más pequeña que permite aprender.</div></li>
                    <li><div><strong>Pruebas</strong>Qué funcionó, qué falló y qué cambiaré.</div></li>
                    <li><div><strong>Iteración</strong>La siguiente versión documentada.</div></li>
                </ol>
                <p class="ink-note">Este archivo distingue con claridad los proyectos terminados, los experimentos y los conceptos futuros.</p>
            </div>`
    },
    {
        left: `
            <div class="page-layout">
                <p class="page-number"><span>ORIGIN_LOG</span><span>03</span></p>
                <p class="page-kicker">2026 / Fundación</p>
                <h3>Inicio del laboratorio digital.</h3>
                <span class="status-stamp">DOCUMENTADO</span>
                <div class="timeline">
                    <div class="timeline-item"><small>FASE 01</small><h4>Repositorio principal</h4><p>Creación del espacio crixuz98.github.io para centralizar el portafolio.</p></div>
                    <div class="timeline-item"><small>FASE 02</small><h4>Primera interfaz</h4><p>Base HTML, CSS y JavaScript con estructura adaptable.</p></div>
                    <div class="timeline-item"><small>FASE 03</small><h4>Nueva dirección</h4><p>Identidad enfocada en robótica, IA y sistemas interactivos.</p></div>
                </div>
            </div>`,
        right: `
            <div class="page-layout">
                <p class="page-number"><span>STACK_MAP</span><span>04</span></p>
                <p class="page-kicker">Base de aprendizaje</p>
                <h3>Herramientas del sistema.</h3>
                <div class="stack-grid">
                    <div class="stack-card"><small>STRUCTURE</small><strong>HTML</strong><span>Contenido semántico y accesible.</span></div>
                    <div class="stack-card"><small>INTERFACE</small><strong>CSS</strong><span>Diseño, respuesta y movimiento.</span></div>
                    <div class="stack-card"><small>LOGIC</small><strong>JavaScript</strong><span>Interacción y comportamiento.</span></div>
                    <div class="stack-card"><small>VERSIONING</small><strong>GitHub</strong><span>Historial y publicación.</span></div>
                </div>
                <p class="ink-note">Próximo objetivo: reemplazar conceptos con prototipos reales y evidencia de pruebas.</p>
            </div>`
    },
    {
        left: `
            <div class="page-layout">
                <p class="page-number"><span>CONCEPT_001</span><span>05</span></p>
                <p class="page-kicker">Robótica + percepción</p>
                <h3>Visión para sistemas robóticos.</h3>
                <span class="status-stamp is-active">EN INVESTIGACIÓN</span>
                <div class="project-brief">
                    <div><small>Pregunta</small><p>¿Cómo puede un sistema percibir un objeto y convertir esa información en una acción?</p></div>
                    <div><small>Prototipo mínimo</small><p>Detectar y clasificar objetos en una transmisión de cámara.</p></div>
                    <div><small>Resultado actual</small><p>Concepto definido; implementación todavía pendiente.</p></div>
                </div>
                <div class="project-tags"><span>COMPUTER VISION</span><span>PYTHON</span><span>ROBOTICS</span></div>
            </div>`,
        right: `
            <div class="page-layout">
                <p class="page-number"><span>SYSTEM_DIAGRAM</span><span>06</span></p>
                <p class="page-kicker">Flujo propuesto</p>
                <h3>De imagen a movimiento.</h3>
                <div class="schematic">
                    <div class="schematic-node">CAMERA<br>INPUT</div><i class="schematic-arrow"></i>
                    <div class="schematic-node">VISION<br>MODEL</div><i class="schematic-arrow"></i>
                    <div class="schematic-node">ROBOT<br>ACTION</div>
                    <span class="schematic-note">DIAGRAM / NOT TO SCALE</span>
                </div>
                <h4>Próximas pruebas</h4>
                <ul class="checklist"><li>Definir el conjunto inicial de objetos.</li><li>Medir precisión y tiempo de respuesta.</li><li>Conectar una salida visual o física.</li><li>Documentar fallos y falsos positivos.</li></ul>
            </div>`
    },
    {
        left: `
            <div class="page-layout">
                <p class="page-number"><span>CONCEPT_002</span><span>07</span></p>
                <p class="page-kicker">Inteligencia artificial</p>
                <h3>Agente de aprendizaje personal.</h3>
                <span class="status-stamp is-planned">PLANIFICADO</span>
                <div class="concept-card"><p>Una herramienta futura que registre avances, conecte notas y proponga retos según el historial de aprendizaje.</p><div class="concept-flow"><span>NOTAS</span><i></i><span>CONTEXTO</span><i></i><span>SIGUIENTE RETO</span></div></div>
                <div class="project-brief"><div><small>Principio</small><p>La IA debe ayudar a pensar, no ocultar el proceso.</p></div><div><small>Restricción</small><p>Las recomendaciones deberán ser explicables y revisables.</p></div></div>
            </div>`,
        right: `
            <div class="page-layout">
                <p class="page-number"><span>CONCEPT_003</span><span>08</span></p>
                <p class="page-kicker">Automatización</p>
                <h3>Flujos que eliminan fricción.</h3>
                <span class="status-stamp is-planned">PLANIFICADO</span>
                <div class="concept-card"><p>Experimentos para recibir información, aplicar reglas y ejecutar acciones repetibles con registros claros.</p><div class="concept-flow"><span>INPUT</span><i></i><span>LOGIC</span><i></i><span>ACTION</span></div></div>
                <blockquote class="principle-quote">“Automatizar no es acelerar el caos; es <span>diseñar el proceso.</span>”</blockquote>
            </div>`
    },
    {
        left: `
            <div class="page-layout">
                <p class="page-number"><span>MASTER_INDEX</span><span>09</span></p>
                <p class="page-kicker">Índice de registros</p>
                <h3>Estado del archivo.</h3>
                <div class="archive-index">
                    <div><b>00</b><strong>Laboratorio digital</strong><span>DOCUMENTADO</span></div>
                    <div><b>01</b><strong>Percepción robótica</strong><span>INVESTIGACIÓN</span></div>
                    <div><b>02</b><strong>Agente de aprendizaje</strong><span>PLANIFICADO</span></div>
                    <div><b>03</b><strong>Automatización de procesos</strong><span>PLANIFICADO</span></div>
                </div>
                <p class="ink-note">Los números de proyecto se conservarán para poder observar la evolución completa con el tiempo.</p>
            </div>`,
        right: `
            <div class="page-layout">
                <p class="page-number"><span>END_RECORD</span><span>10</span></p>
                <div class="closing-mark"><span>CRX</span></div>
                <p class="page-kicker">Fin del registro actual</p>
                <h3>Lo siguiente todavía no está escrito.</h3>
                <p>Cada proyecto real añadirá nuevas páginas con código, fotografías del prototipo, pruebas y conclusiones.</p>
                <a class="book-link" href="index.html#sistemas">Volver a sistemas <span>↗</span></a>
            </div>`
    }
];

let currentSpread = 0;
let isTurning = false;
let pointerStartX = null;

function pageNumber(value) {
    return String(value).padStart(2, "0");
}

function renderSpread(index) {
    const spread = spreads[index];
    const firstPage = index * 2 + 1;

    leftPage.innerHTML = spread.left;
    rightPage.innerHTML = spread.right;
    spreadIndicator.textContent = `PLIEGO ${pageNumber(index + 1)} / ${pageNumber(spreads.length)}`;
    currentPages.textContent = `${pageNumber(firstPage)} — ${pageNumber(firstPage + 1)}`;
    progressBar.style.width = `${((index + 1) / spreads.length) * 100}%`;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === spreads.length - 1;
}

function moveBook(direction) {
    const nextSpread = currentSpread + direction;
    if (isTurning || nextSpread < 0 || nextSpread >= spreads.length) return;

    if (reduceMotion) {
        currentSpread = nextSpread;
        renderSpread(currentSpread);
        return;
    }

    isTurning = true;
    book.classList.add(direction > 0 ? "is-turning-next" : "is-turning-previous");

    window.setTimeout(() => {
        currentSpread = nextSpread;
        renderSpread(currentSpread);
    }, 285);

    window.setTimeout(() => {
        book.classList.remove("is-turning-next", "is-turning-previous");
        isTurning = false;
    }, 640);
}

previousButton.addEventListener("click", () => moveBook(-1));
nextButton.addEventListener("click", () => moveBook(1));

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveBook(-1);
    if (event.key === "ArrowRight") moveBook(1);
});

book.addEventListener("pointerdown", (event) => {
    pointerStartX = event.clientX;
});

book.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const movement = event.clientX - pointerStartX;
    if (Math.abs(movement) > 55) moveBook(movement < 0 ? 1 : -1);
    pointerStartX = null;
});

book.addEventListener("pointercancel", () => {
    pointerStartX = null;
});

function updateArchiveTime() {
    document.querySelector("#archive-clock").textContent = new Date().toLocaleTimeString("es-MX", { hour12: false });
}

document.querySelector("#archive-year").textContent = new Date().getFullYear();
updateArchiveTime();
window.setInterval(updateArchiveTime, 1000);
renderSpread(currentSpread);
