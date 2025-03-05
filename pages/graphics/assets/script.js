// Lightbox Elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const loader = document.getElementById("loader");

// Gallery Elements
const photographyGallery = document.getElementById("photography-gallery");
const designsGallery = document.getElementById("designs-gallery");

// Filter Buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Lightbox State
let currentIndex = 0;
let currentImages = [];

// Toggle All Photos Function
function toggleAllPhotos() {
    const gallery = document.getElementById("photography-gallery");
    const loadAllBtn = document.getElementById("load-all-btn");
    const hiddenPhotos = gallery.querySelectorAll(".gallery-item.hidden");

    if (hiddenPhotos.length > 0) {
        // Show all hidden photos
        hiddenPhotos.forEach(photo => photo.classList.remove("hidden"));
        loadAllBtn.textContent = "Hide All";
    } else {
        // Hide extra photos (keep only the first 2 visible)
        const allPhotos = gallery.querySelectorAll(".gallery-item.photography");
        allPhotos.forEach((photo, index) => {
            if (index >= 2) {
                photo.classList.add("hidden");
            }
        });
        loadAllBtn.textContent = "Load All";
        // Optional: Scroll to the top of the gallery
        gallery.scrollIntoView({ behavior: "smooth" });
    }
}

// Filter Images in Designs Section
function filterImages(category) {
    const images = document.querySelectorAll("#designs-gallery .gallery-item");
    images.forEach(img => {
        img.classList.add("hidden");
        if (category === "all" || img.classList.contains(category)) {
            img.classList.remove("hidden");
        }
    });

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="filterImages('${category}')"]`).classList.add("active");
}

// Search Images
function searchImages() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const images = document.querySelectorAll("#designs-gallery .gallery-item");
    images.forEach(img => {
        const altText = img.alt.toLowerCase();
        const tags = img.getAttribute("data-tags").toLowerCase();
        if (altText.includes(query) || tags.includes(query)) {
            img.classList.remove("hidden");
        } else {
            img.classList.add("hidden");
        }
    });
}

// Open Lightbox
function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    showImage();
    lightbox.style.display = "flex";
}

// Show Image in Lightbox (Updated)
function showImage() {
    loader.style.display = "block";
    lightboxImg.src = currentImages[currentIndex].src;

    // Hide caption text
    lightboxCaption.style.display = "none";

    // Update download link
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.href = currentImages[currentIndex].src;
    downloadBtn.download = "image.jpg";

    // Reset zoom
    lightboxImg.classList.remove("zoomed");

    // Hide next/prev buttons in zoom mode
    document.querySelectorAll(".lightbox-nav").forEach(btn => btn.style.display = "flex");
}

// Close Lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

// Change Image in Lightbox
function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    showImage();
}

// Toggle Favorite
function toggleFavorite() {
    const favoriteBtn = document.querySelector(".favorite-btn");
    favoriteBtn.classList.toggle("favorited");
    localStorage.setItem(currentImages[currentIndex].src, favoriteBtn.classList.contains("favorited"));
}

// Event Delegation for Galleries
document.querySelectorAll(".gallery").forEach(gallery => {
    gallery.addEventListener("click", (e) => {
        if (e.target.classList.contains("gallery-item")) {
            const images = Array.from(gallery.querySelectorAll(".gallery-item:not(.hidden)"));
            const index = images.indexOf(e.target);
            openLightbox(images, index);
        }
    });
});

// Keyboard Navigation for Lightbox
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});

// Close Lightbox on Click Outside
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("close")) {
        closeLightbox();
    }
});

// Image Zoom (Updated)
lightboxImg.addEventListener("click", () => {
    lightboxImg.classList.toggle("zoomed");

    // Hide next/prev buttons when zoomed
    document.querySelectorAll(".lightbox-nav").forEach(btn => {
        btn.style.display = lightboxImg.classList.contains("zoomed") ? "none" : "flex";
    });
});

// Hide Loader When Image is Loaded
lightboxImg.onload = () => {
    loader.style.display = "none";
    document.getElementById("progress-bar").style.width = "100%";
    setTimeout(() => {
        document.getElementById("progress-bar").style.width = "0";
    }, 300);
};

// Back to Top Button
window.addEventListener("scroll", () => {
    const backToTopButton = document.getElementById("back-to-top");
    if (window.scrollY > 500) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Theme Toggle with 🌙 and 🔆
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const themeIcon = document.getElementById("theme-icon");

    if (document.body.classList.contains("light-mode")) {
        themeIcon.textContent = "🔆";
        localStorage.setItem("theme", "light");
    } else {
        themeIcon.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }

    console.log("Theme toggled!"); // Debugging
}

// Check saved theme
window.onload = () => {
    filterImages("all"); // Show all designs by default

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        document.getElementById("theme-icon").textContent = "🔆";
    } else {
        document.getElementById("theme-icon").textContent = "🌙";
    }

    console.log("Page loaded!"); // Debugging
};