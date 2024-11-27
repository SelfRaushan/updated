// Modal Functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains("modal")) {
        closeModal(event.target.id);
    }
};
