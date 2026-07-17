const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const book = document.querySelector("#project-book");
const leftPage = document.querySelector("#book-page-left");
const rightPage = document.querySelector("#book-page-right");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const spreadIndicator = document.querySelector("#spread-indicator");
const currentPages = document.querySelector("#current-pages");
const progressBar = document.querySelector("#book-progress-bar");

const fieldSpreads = [
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

const books = {
    field: {
        title: "Field Notes",
        volume: "VOL.001",
        spreads: fieldSpreads
    },
    ai: {
        title: "Artificial Intelligence",
        volume: "VOL.002",
        spreads: [
            {
                left: `
                    <div class="page-layout book-cover-page">
                        <p class="page-number"><span>CRX_ARCHIVE</span><span>VOL.002</span></p>
                        <div class="book-emblem"><span>AI</span></div>
                        <div><h3>ARTIFICIAL<br><span>INTELLIGENCE</span></h3><p>VISION · DEEP LEARNING · ANFIS</p></div>
                    </div>`,
                right: `
                    <div class="page-layout">
                        <p class="page-number"><span>VOLUME_SCOPE</span><span>02</span></p>
                        <p class="page-kicker">Mapa de investigación</p>
                        <h3>Modelos que perciben y aprenden.</h3>
                        <div class="stack-grid">
                            <div class="stack-card"><small>AI.01</small><strong>Visión artificial</strong><span>Adquisición, detección y seguimiento.</span></div>
                            <div class="stack-card"><small>AI.02</small><strong>Deep Learning</strong><span>Entrenamiento, evaluación e inferencia.</span></div>
                            <div class="stack-card"><small>AI.03</small><strong>Redes convolucionales</strong><span>Características espaciales y clasificación.</span></div>
                            <div class="stack-card"><small>AI.04</small><strong>ANFIS</strong><span>Aprendizaje y lógica difusa adaptativa.</span></div>
                        </div>
                        <p class="ink-note">Volumen base: se completará con experimentos, métricas y publicaciones reales.</p>
                    </div>`
            },
            {
                left: `
                    <div class="page-layout">
                        <p class="page-number"><span>EXPERIMENT_TEMPLATE</span><span>03</span></p>
                        <p class="page-kicker">Plantilla de experimento</p>
                        <h3>Del conjunto de datos a la evidencia.</h3>
                        <div class="timeline">
                            <div class="timeline-item"><small>01 / DATA</small><h4>Preparación</h4><p>Origen, limpieza, balance y separación de datos.</p></div>
                            <div class="timeline-item"><small>02 / MODEL</small><h4>Entrenamiento</h4><p>Arquitectura, hiperparámetros y criterios de parada.</p></div>
                            <div class="timeline-item"><small>03 / TEST</small><h4>Evaluación</h4><p>Métricas, errores y comparación reproducible.</p></div>
                        </div>
                    </div>`,
                right: `
                    <div class="page-layout">
                        <p class="page-number"><span>NEXT_RECORD</span><span>04</span></p>
                        <p class="page-kicker">Próxima entrada</p>
                        <h3>Espacio reservado para el primer proyecto de IA.</h3>
                        <span class="status-stamp is-planned">POR DOCUMENTAR</span>
                        <div class="project-brief"><div><small>Contenido esperado</small><p>Objetivo, método, datos, resultados, código y conclusiones.</p></div><div><small>Estado</small><p>La estructura existe; el proyecto real se añadirá más adelante.</p></div></div>
                    </div>`
            }
        ]
    },
    robotics: {
        title: "Robotic Systems",
        volume: "VOL.003",
        spreads: [
            {
                left: `
                    <div class="page-layout book-cover-page">
                        <p class="page-number"><span>CRX_ARCHIVE</span><span>VOL.003</span></p>
                        <div class="book-emblem"><span>RX</span></div>
                        <div><h3>ROBOTIC<br><span>SYSTEMS</span></h3><p>PERCEPTION · CONTROL · MOTION</p></div>
                    </div>`,
                right: `
                    <div class="page-layout">
                        <p class="page-number"><span>PLATFORM_INDEX</span><span>02</span></p>
                        <p class="page-kicker">Plataformas</p>
                        <h3>Robots bajo exploración.</h3>
                        <div class="archive-index">
                            <div><b>R.01</b><strong>Manipuladores</strong><span>CATÁLOGO</span></div>
                            <div><b>R.02</b><strong>Móviles diferenciales</strong><span>CATÁLOGO</span></div>
                            <div><b>R.03</b><strong>Omnidireccionales</strong><span>CATÁLOGO</span></div>
                            <div><b>R.04</b><strong>Drones y submarinos</strong><span>CATÁLOGO</span></div>
                            <div><b>R.05</b><strong>Dirección Ackermann</strong><span>CATÁLOGO</span></div>
                        </div>
                    </div>`
            },
            {
                left: `
                    <div class="page-layout">
                        <p class="page-number"><span>ROBOT_RECORD</span><span>03</span></p>
                        <p class="page-kicker">Ficha de sistema</p>
                        <h3>Una página para cada máquina.</h3>
                        <div class="project-brief"><div><small>Cinemática</small><p>Modelo, marcos de referencia y restricciones.</p></div><div><small>Control</small><p>Arquitectura, sensores, actuadores y frecuencia.</p></div><div><small>Validación</small><p>Trayectorias, error, estabilidad y evidencia visual.</p></div></div>
                    </div>`,
                right: `
                    <div class="page-layout">
                        <p class="page-number"><span>NEXT_RECORD</span><span>04</span></p>
                        <p class="page-kicker">Próximo prototipo</p>
                        <h3>Espacio reservado para la primera plataforma documentada.</h3>
                        <span class="status-stamp is-planned">POR DOCUMENTAR</span>
                        <p class="ink-note">Este libro crecerá con diagramas, fotografías, pruebas, código y resultados.</p>
                    </div>`
            }
        ]
    },
    coding: {
        title: "Code Notebook",
        volume: "VOL.004",
        spreads: [
            {
                left: `
                    <div class="page-layout book-cover-page">
                        <p class="page-number"><span>CRX_ARCHIVE</span><span>VOL.004</span></p>
                        <div class="book-emblem"><span>&lt;/&gt;</span></div>
                        <div><h3>CODE<br><span>NOTEBOOK</span></h3><p>ALGORITHMS · SOFTWARE · TOOLS</p></div>
                    </div>`,
                right: `
                    <div class="page-layout">
                        <p class="page-number"><span>LANGUAGE_INDEX</span><span>02</span></p>
                        <p class="page-kicker">Lenguajes</p>
                        <h3>Código para experimentar y construir.</h3>
                        <div class="stack-grid">
                            <div class="stack-card"><small>LOW LEVEL</small><strong>C / C++</strong><span>Control, embebidos y rendimiento.</span></div>
                            <div class="stack-card"><small>APPLICATION</small><strong>Java</strong><span>Arquitecturas y aplicaciones.</span></div>
                            <div class="stack-card"><small>ENGINEERING</small><strong>MATLAB / .m</strong><span>Modelado, análisis y simulación.</span></div>
                            <div class="stack-card"><small>COMPUTING</small><strong>Python</strong><span>IA, automatización y prototipado.</span></div>
                        </div>
                    </div>`
            },
            {
                left: `
                    <div class="page-layout">
                        <p class="page-number"><span>CODE_RECORD</span><span>03</span></p>
                        <p class="page-kicker">Registro técnico</p>
                        <h3>Más que un fragmento de código.</h3>
                        <ol class="manual-list"><li><div><strong>Problema</strong>Qué debe resolver el programa.</div></li><li><div><strong>Decisiones</strong>Por qué se eligió la solución.</div></li><li><div><strong>Pruebas</strong>Casos, límites y resultados.</div></li><li><div><strong>Repositorio</strong>Fuente y guía de ejecución.</div></li></ol>
                    </div>`,
                right: `
                    <div class="page-layout">
                        <p class="page-number"><span>NEXT_RECORD</span><span>04</span></p>
                        <p class="page-kicker">Próximo algoritmo</p>
                        <h3>Espacio reservado para la primera implementación explicada.</h3>
                        <span class="status-stamp is-planned">POR DOCUMENTAR</span>
                        <p class="ink-note">Cada entrada futura enlazará su repositorio y explicará cómo reproducirla.</p>
                    </div>`
            }
        ]
    }
};

let currentSpread = 0;
let isTurning = false;
let pointerStartX = null;
let activeBookKey = "field";

const shelfBooks = document.querySelectorAll(".shelf-book");
const activeVolumeLabel = document.querySelector("#active-volume-label");
const bookTitle = document.querySelector("#book-title");

function getActiveBook() {
    return books[activeBookKey];
}

function pageNumber(value) {
    return String(value).padStart(2, "0");
}

function renderSpread(index) {
    const activeBook = getActiveBook();
    const spread = activeBook.spreads[index];
    const firstPage = index * 2 + 1;

    leftPage.innerHTML = spread.left;
    rightPage.innerHTML = spread.right;
    spreadIndicator.textContent = `PLIEGO ${pageNumber(index + 1)} / ${pageNumber(activeBook.spreads.length)}`;
    currentPages.textContent = `${pageNumber(firstPage)} — ${pageNumber(firstPage + 1)}`;
    progressBar.style.width = `${((index + 1) / activeBook.spreads.length) * 100}%`;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === activeBook.spreads.length - 1;
}

function moveBook(direction) {
    const nextSpread = currentSpread + direction;
    if (isTurning || nextSpread < 0 || nextSpread >= getActiveBook().spreads.length) return;

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

shelfBooks.forEach((shelfBook) => {
    shelfBook.addEventListener("click", () => {
        const nextBookKey = shelfBook.dataset.book;
        if (!books[nextBookKey]) return;

        activeBookKey = nextBookKey;
        currentSpread = 0;
        shelfBooks.forEach((candidate) => {
            const isSelected = candidate === shelfBook;
            candidate.classList.toggle("is-selected", isSelected);
            candidate.setAttribute("aria-pressed", String(isSelected));
        });

        const activeBook = getActiveBook();
        activeVolumeLabel.textContent = `ARCHIVE_READER / ${activeBook.volume}`;
        bookTitle.textContent = activeBook.title;
        renderSpread(currentSpread);
        document.querySelector("#libro").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
});

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
