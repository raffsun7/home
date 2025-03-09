// Lightbox functionality for viewing certificates in full size
document.querySelectorAll(".certificate-card img").forEach(img => {
    img.addEventListener("click", () => {
        document.querySelector(".lightbox img").src = img.src;
        document.querySelector(".lightbox").classList.add("active");
    });
});

// Close lightbox on click
document.querySelector(".lightbox").addEventListener("click", () => {
    document.querySelector(".lightbox").classList.remove("active");
});