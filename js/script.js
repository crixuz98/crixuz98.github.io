document.documentElement.classList.add("js-ready");

const root = document.documentElement;
const body = document.body;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Secuencia de arranque.
const bootScreen = document.querySelector("#boot-screen");
const bootBar = document.querySelector("#boot-bar");
const bootPercent = document.querySelector("#boot-percent");
const bootMessage = document.querySelector("#boot-message");
const bootSkip = document.querySelector("#boot-skip");
const bootMessages = [
    "Verificando módulos...",
    "Sincronizando núcleo neural...",
    "Cargando sistemas robóticos...",
    "Interfaz lista."
];

let bootFinished = false;

function hasSeenBoot() {
    try {
        return sessionStorage.getItem("crx-boot-seen") === "true";
    } catch {
        return false;
    }
}

function rememberBoot() {
    try {
        sessionStorage.setItem("crx-boot-seen", "true");
    } catch {
        // La experiencia funciona aunque el navegador bloquee el almacenamiento local.
    }
}

function finishBoot() {
    if (bootFinished) return;
    bootFinished = true;
    bootBar.style.width = "100%";
    bootPercent.textContent = "100%";
    bootMessage.textContent = bootMessages.at(-1);
    bootScreen.classList.add("is-complete");
    body.classList.remove("is-booting");
    rememberBoot();
}

function runBootSequence() {
    if (reduceMotion) {
        finishBoot();
        return;
    }

    const duration = hasSeenBoot() ? 650 : 1900;
    const startedAt = performance.now();

    function updateBoot(now) {
        if (bootFinished) return;
        const elapsed = now - startedAt;
        const progress = Math.min(100, Math.round((elapsed / duration) * 100));
        const messageIndex = Math.min(bootMessages.length - 1, Math.floor(progress / 27));

        bootBar.style.width = `${progress}%`;
        bootPercent.textContent = `${String(progress).padStart(3, "0")}%`;
        bootMessage.textContent = bootMessages[messageIndex];

        if (progress < 100) {
            requestAnimationFrame(updateBoot);
        } else {
            window.setTimeout(finishBoot, 180);
        }
    }

    requestAnimationFrame(updateBoot);
}

bootSkip.addEventListener("click", finishBoot);
runBootSequence();

// Menú móvil.
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");

function closeMenu() {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    body.style.overflow = "";
}

navToggle.addEventListener("click", () => {
    const willOpen = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(willOpen));
    navLinks.classList.toggle("is-open", willOpen);
    body.style.overflow = willOpen ? "hidden" : "";
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
});

// Progreso de página, hora y navegación activa.
const progressBar = document.querySelector("#page-progress-bar");
const buildTime = document.querySelector("#build-time");
document.querySelector("#current-year").textContent = new Date().getFullYear();

function updateInterface() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    buildTime.textContent = new Date().toLocaleTimeString("es-MX", { hour12: false });
}

updateInterface();
window.setInterval(updateInterface, 1000);
window.addEventListener("scroll", updateInterface, { passive: true });

const menuAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const trackedSections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            menuAnchors.forEach((anchor) => {
                anchor.classList.toggle("active", anchor.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-30% 0px -62%", threshold: 0 });

    trackedSections.forEach((section) => sectionObserver.observe(section));
}

// Aparición progresiva y barras de avance.
const revealElements = document.querySelectorAll(".reveal");
const moduleRows = document.querySelectorAll(".module-row");
const moduleTriggers = document.querySelectorAll(".module-trigger");

function activateModule(row) {
    const progress = row.dataset.progress || "0";
    const bar = row.querySelector(".module-load > span i");
    if (bar) bar.style.width = `${progress}%`;
}

// Submenús de exploración. Solo se mantiene un módulo abierto a la vez.
moduleTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const selectedRow = trigger.closest(".module-row");
        const willOpen = trigger.getAttribute("aria-expanded") !== "true";

        moduleTriggers.forEach((otherTrigger) => {
            otherTrigger.setAttribute("aria-expanded", "false");
            otherTrigger.closest(".module-row").classList.remove("is-open");
        });

        trigger.setAttribute("aria-expanded", String(willOpen));
        selectedRow.classList.toggle("is-open", willOpen);
    });
});

// Contadores simulados: se reemplazarán por cantidades reales al cargar publicaciones.
document.querySelectorAll("[data-random-count]").forEach((counter) => {
    const minimum = Number(counter.dataset.min || 0);
    const maximum = Number(counter.dataset.max || minimum);
    const value = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    counter.textContent = String(value).padStart(2, "0");
    counter.setAttribute("aria-label", `${value} publicaciones simuladas`);
});

if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    moduleRows.forEach(activateModule);
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            if (entry.target.matches(".module-row")) activateModule(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.13 });

    revealElements.forEach((element) => revealObserver.observe(element));
}

// Destello tipográfico ocasional.
const kineticWord = document.querySelector(".kinetic-word");

if (!reduceMotion) {
    window.setInterval(() => {
        kineticWord.classList.add("is-glitching");
        window.setTimeout(() => kineticWord.classList.remove("is-glitching"), 120);
    }, 3400);
}

// Campo neural dibujado en canvas.
const canvas = document.querySelector("#neural-field");
const context = canvas.getContext("2d");
const hero = document.querySelector(".hero");
let neuralPoints = [];
let canvasWidth = 0;
let canvasHeight = 0;
let pointer = { x: -1000, y: -1000 };

function resizeNeuralField() {
    const bounds = hero.getBoundingClientRect();
    const density = window.innerWidth < 700 ? 12 : 24;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvasWidth = Math.max(1, Math.round(bounds.width));
    canvasHeight = Math.max(1, Math.round(bounds.height));
    canvas.width = Math.round(canvasWidth * ratio);
    canvas.height = Math.round(canvasHeight * ratio);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    neuralPoints = Array.from({ length: density }, () => ({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.4 + 0.8
    }));
}

function drawNeuralField() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    neuralPoints.forEach((point, index) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > canvasWidth) point.vx *= -1;
        if (point.y < 0 || point.y > canvasHeight) point.vy *= -1;

        const pointerDistance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
        if (pointerDistance < 150) {
            point.x += (point.x - pointer.x) * 0.004;
            point.y += (point.y - pointer.y) * 0.004;
        }

        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(79, 238, 255, 0.55)";
        context.fill();

        for (let otherIndex = index + 1; otherIndex < neuralPoints.length; otherIndex += 1) {
            const other = neuralPoints[otherIndex];
            const distance = Math.hypot(point.x - other.x, point.y - other.y);
            if (distance > 145) continue;

            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(79, 238, 255, ${0.14 * (1 - distance / 145)})`;
            context.lineWidth = 0.7;
            context.stroke();
        }
    });

    if (!reduceMotion) requestAnimationFrame(drawNeuralField);
}

resizeNeuralField();
drawNeuralField();
window.addEventListener("resize", resizeNeuralField);

hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
});

hero.addEventListener("pointerleave", () => {
    pointer = { x: -1000, y: -1000 };
});

// Robot expresivo: la mirada sigue el puntero y el rostro cambia ocasionalmente.
const robotVisual = document.querySelector(".robot-visual");
const robotFace = document.querySelector(".robot-face");

function updateRobotGaze(event) {
    if (!robotFace) return;
    const bounds = robotFace.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const deltaX = Math.max(-1, Math.min(1, (event.clientX - centerX) / (window.innerWidth * 0.35)));
    const deltaY = Math.max(-1, Math.min(1, (event.clientY - centerY) / (window.innerHeight * 0.35)));
    robotFace.style.setProperty("--eye-x", `${(deltaX * 8).toFixed(2)}px`);
    robotFace.style.setProperty("--eye-y", `${(deltaY * 5).toFixed(2)}px`);
}

if (robotFace && !reduceMotion) {
    window.addEventListener("pointermove", updateRobotGaze, { passive: true });
    const robotExpressions = ["neutral", "smile", "serious", "curious", "smile"];
    window.setInterval(() => {
        const expression = robotExpressions[Math.floor(Math.random() * robotExpressions.length)];
        robotFace.dataset.expression = expression;
        window.setTimeout(() => {
            robotFace.dataset.expression = "neutral";
        }, 1700);
    }, 4600);
}

if (robotVisual) {
    robotVisual.addEventListener("pointerleave", () => {
        robotFace?.style.setProperty("--eye-x", "0px");
        robotFace?.style.setProperty("--eye-y", "0px");
    });
}

// Simulación ligera de agentes: buscan una meta, se separan y evitan obstáculos.
const agentField = document.querySelector("#agent-simulation");
const agentElements = agentField ? [...agentField.querySelectorAll(".agent-dot")] : [];
const obstacleElements = agentField ? [...agentField.querySelectorAll(".agent-obstacle")] : [];
const goalElement = agentField?.querySelector(".agent-goal");
let agentStates = [];
let agentObstacles = [];
let agentGoal = { x: 0, y: 0 };

function configureAgentField() {
    if (!agentField || !agentElements.length) return;
    const bounds = agentField.getBoundingClientRect();
    const positions = [[0.12, 0.27], [0.25, 0.63], [0.46, 0.18], [0.66, 0.58], [0.78, 0.34]];

    agentStates = agentElements.map((element, index) => ({
        element,
        x: positions[index][0] * bounds.width,
        y: positions[index][1] * bounds.height,
        vx: (index % 2 ? -0.42 : 0.46) + index * 0.025,
        vy: (index % 3 - 1) * 0.28 + 0.16
    }));

    agentObstacles = obstacleElements.map((obstacle) => {
        const obstacleBounds = obstacle.getBoundingClientRect();
        return {
            x: obstacleBounds.left - bounds.left + obstacleBounds.width / 2,
            y: obstacleBounds.top - bounds.top + obstacleBounds.height / 2,
            radius: Math.max(obstacleBounds.width, obstacleBounds.height) * 0.58
        };
    });

    if (goalElement) {
        const goalBounds = goalElement.getBoundingClientRect();
        agentGoal = {
            x: goalBounds.left - bounds.left + goalBounds.width / 2,
            y: goalBounds.top - bounds.top + goalBounds.height / 2
        };
    }
}

function animateAgentField() {
    if (!agentField || !agentStates.length) return;
    const width = agentField.clientWidth;
    const height = agentField.clientHeight;

    agentStates.forEach((agent, index) => {
        let steeringX = (agentGoal.x - agent.x) * 0.000035;
        let steeringY = (agentGoal.y - agent.y) * 0.000035;

        agentStates.forEach((other, otherIndex) => {
            if (index === otherIndex) return;
            const dx = agent.x - other.x;
            const dy = agent.y - other.y;
            const distance = Math.hypot(dx, dy) || 1;
            if (distance < 48) {
                const force = (48 - distance) * 0.0014;
                steeringX += (dx / distance) * force;
                steeringY += (dy / distance) * force;
            }
        });

        agentObstacles.forEach((obstacle) => {
            const dx = agent.x - obstacle.x;
            const dy = agent.y - obstacle.y;
            const distance = Math.hypot(dx, dy) || 1;
            const safeDistance = obstacle.radius + 24;
            if (distance < safeDistance) {
                const force = (safeDistance - distance) * 0.0028;
                steeringX += (dx / distance) * force;
                steeringY += (dy / distance) * force;
            }
        });

        agent.vx += steeringX;
        agent.vy += steeringY;
        const speed = Math.hypot(agent.vx, agent.vy) || 1;
        const maximumSpeed = 0.72;
        if (speed > maximumSpeed) {
            agent.vx = (agent.vx / speed) * maximumSpeed;
            agent.vy = (agent.vy / speed) * maximumSpeed;
        }

        agent.x += agent.vx;
        agent.y += agent.vy;
        if (agent.x < 12 || agent.x > width - 30) agent.vx *= -1;
        if (agent.y < 18 || agent.y > height - 42) agent.vy *= -1;
        agent.x = Math.max(12, Math.min(width - 30, agent.x));
        agent.y = Math.max(18, Math.min(height - 42, agent.y));
        agent.element.style.transform = `translate3d(${agent.x.toFixed(1)}px, ${agent.y.toFixed(1)}px, 0)`;
    });

    requestAnimationFrame(animateAgentField);
}

configureAgentField();
if (agentField && !reduceMotion) animateAgentField();
window.addEventListener("resize", configureAgentField);

// El diagrama crece por etapas hasta mostrar un ciclo completo con retroalimentación.
const automationFlow = document.querySelector("#automation-flow");
const automationPhase = document.querySelector("#automation-phase");
const automationLabels = ["STAGE 01 / CORE FLOW", "STAGE 02 / DATA LAYER", "STAGE 03 / SERVICES", "STAGE 04 / FEEDBACK LOOP"];
let automationStage = 0;

function showAutomationStage(stage) {
    if (!automationFlow) return;
    automationFlow.classList.remove("stage-0", "stage-1", "stage-2", "stage-3");
    automationFlow.classList.add(`stage-${stage}`);
    if (automationPhase) automationPhase.textContent = automationLabels[stage];
}

showAutomationStage(automationStage);
if (automationFlow && !reduceMotion) {
    window.setInterval(() => {
        automationStage = (automationStage + 1) % automationLabels.length;
        showAutomationStage(automationStage);
    }, 2600);
}

// Profundidad y luz reactiva para dispositivos con puntero preciso.
if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const machine = document.querySelector("#hero-machine");

    window.addEventListener("pointermove", (event) => {
        root.style.setProperty("--mx", `${event.clientX}px`);
        root.style.setProperty("--my", `${event.clientY}px`);
    }, { passive: true });

    machine.addEventListener("pointermove", (event) => {
        const bounds = machine.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        machine.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
    });

    machine.addEventListener("pointerleave", () => {
        machine.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
    });

    document.querySelectorAll(".magnetic").forEach((button) => {
        button.addEventListener("pointermove", (event) => {
            const bounds = button.getBoundingClientRect();
            const x = event.clientX - bounds.left - bounds.width / 2;
            const y = event.clientY - bounds.top - bounds.height / 2;
            button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
        });
        button.addEventListener("pointerleave", () => {
            button.style.transform = "translate(0, 0)";
        });
    });
}
