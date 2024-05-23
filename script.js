// Get the modal
var modal = document.getElementById('id01');

// When user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const initSlider = () => {
    const imagelist = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imagelist.scrollWidth - imagelist.clientWidth;

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imagelist.scrollLeft = scrollPosition;
        };

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imagelist.clientWidth * direction;
            imagelist.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imagelist.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imagelist.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imagelist.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Call these two functions when image list scrolls
    imagelist.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });

    // Call handleSlideButtons initially to set the initial state of slide buttons
    handleSlideButtons();
};

// Initialize the slider on load and resize
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
