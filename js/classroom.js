const filterButtons = document.querySelectorAll(".resource-filter button");
const resourceCards = document.querySelectorAll(".resource-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedType = button.dataset.filter;
        filterButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
        resourceCards.forEach((card) => {
            card.classList.toggle("is-hidden", selectedType !== "all" && card.dataset.type !== selectedType);
        });
    });
});
