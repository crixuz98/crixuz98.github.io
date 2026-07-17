const publicationFolders = {
    omni: {
        name: "Robots omnidireccionales",
        papers: [
            { code: "DEMO_OMNI_001", title: "Control de trayectoria para una plataforma omnidireccional", short: "Ejemplo de registro sobre cinemática, seguimiento y validación.", abstract: "Este abstract demostrativo muestra cómo se presentará una publicación relacionada con el modelado cinemático y el seguimiento de trayectorias de una plataforma omnidireccional. El registro real incluirá metodología, métricas, resultados y sus limitaciones.", url: "" },
            { code: "DEMO_OMNI_002", title: "Estimación de pose con sensores complementarios", short: "Ejemplo de una investigación sobre localización y fusión sensorial.", abstract: "Contenido de demostración para visualizar una futura entrada sobre estimación de pose. Aquí podrán explicarse los sensores utilizados, el método de fusión, las condiciones de prueba y el error observado.", url: "" }
        ]
    },
    manipulators: {
        name: "Manipuladores robóticos",
        papers: [
            { code: "DEMO_MANIP_001", title: "Planeación de movimiento para un manipulador serial", short: "Estructura de ejemplo para cinemática y planeación.", abstract: "Este texto es una muestra de cómo quedará documentado un artículo de manipuladores: problema, configuración del robot, método de planeación, criterios de evaluación, resultados y vínculo de consulta.", url: "" },
            { code: "DEMO_MANIP_002", title: "Control visual para tareas de posicionamiento", short: "Ejemplo de integración entre percepción y control.", abstract: "Abstract demostrativo de una posible entrada sobre control visual. La versión real podrá contener la arquitectura, el modelo de cámara, la ley de control, los experimentos y las conclusiones del trabajo.", url: "" }
        ]
    },
    vision: {
        name: "IA y visión artificial",
        papers: [
            { code: "DEMO_VISION_001", title: "Detección visual para entornos robóticos", short: "Ejemplo sobre percepción, datos y desempeño.", abstract: "Registro demostrativo para una investigación de visión artificial aplicada a robótica. El abstract real resumirá el conjunto de datos, el modelo, el protocolo experimental y los resultados obtenidos.", url: "" },
            { code: "DEMO_VISION_002", title: "Modelo convolucional para clasificación de escenas", short: "Ejemplo de entrenamiento y evaluación de una CNN.", abstract: "Este contenido simulado permite probar el lector de artículos. En una publicación real se describirían la arquitectura convolucional, las decisiones de entrenamiento, las métricas y el análisis de errores.", url: "" }
        ]
    },
    automation: {
        name: "Automatización y control",
        papers: [
            { code: "DEMO_AUTO_001", title: "Arquitectura de automatización para un proceso experimental", short: "Ejemplo de instrumentación, lógica y supervisión.", abstract: "Abstract demostrativo para una publicación sobre automatización. La entrada definitiva podrá explicar los instrumentos, las señales, la estrategia de control, el sistema de supervisión y la validación.", url: "" },
            { code: "DEMO_AUTO_002", title: "Monitoreo y registro de variables en tiempo real", short: "Ejemplo de adquisición, visualización y trazabilidad.", abstract: "Contenido ficticio de interfaz que muestra cómo se resumirá un trabajo de monitoreo. Será reemplazado por datos verificables y el enlace a la publicación correspondiente.", url: "" }
        ]
    }
};

const folderButtons = document.querySelectorAll(".topic-folder");
const folderTitle = document.querySelector("#folder-title");
const articleList = document.querySelector("#article-list");
const paperStage = document.querySelector("#paper-stage");
const paper = document.querySelector("#publication-paper");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeFolderKey = "omni";
let activePaperIndex = 0;

function renderPaper(index, animate = true) {
    const selectedPaper = publicationFolders[activeFolderKey].papers[index];
    const update = () => {
        paper.innerHTML = `<small>${selectedPaper.code} / CONTENIDO DEMO</small><h3>${selectedPaper.title}</h3><p>${selectedPaper.abstract}</p>${selectedPaper.url ? `<a class="paper-link" href="${selectedPaper.url}" target="_blank" rel="noopener">CONSULTAR ARTÍCULO ↗</a>` : '<span class="paper-link is-disabled" aria-disabled="true">ENLACE PENDIENTE</span>'}`;
    };

    if (!animate || reduceMotion) {
        update();
        return;
    }

    paperStage.classList.remove("is-turning");
    void paperStage.offsetWidth;
    paperStage.classList.add("is-turning");
    window.setTimeout(update, 405);
    window.setTimeout(() => paperStage.classList.remove("is-turning"), 850);
}

function renderFolder(key) {
    const folder = publicationFolders[key];
    activeFolderKey = key;
    activePaperIndex = 0;
    folderTitle.textContent = folder.name;
    articleList.innerHTML = folder.papers.map((entry, index) => `<button type="button" class="article-button${index === 0 ? " is-active" : ""}" data-paper="${index}"><small>${entry.code}</small><strong>${entry.title}</strong></button>`).join("");

    articleList.querySelectorAll(".article-button").forEach((button) => {
        button.addEventListener("click", () => {
            activePaperIndex = Number(button.dataset.paper);
            articleList.querySelectorAll(".article-button").forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
            renderPaper(activePaperIndex);
        });
    });
    renderPaper(0, false);
}

folderButtons.forEach((button) => {
    button.addEventListener("click", () => {
        folderButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
        renderFolder(button.dataset.folder);
        document.querySelector("#lector").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
});

renderFolder(activeFolderKey);
