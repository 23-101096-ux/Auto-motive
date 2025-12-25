  // Counter animation function
  function animateCounter(element, target, duration, isDecimal = false) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer to trigger animation when section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const isDecimal = stat.getAttribute('data-decimal') === 'true';
                animateCounter(stat, target, 2000, isDecimal);
            });

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Start observing the stats section
const statsSection = document.querySelector('.stats-section');
observer.observe(statsSection);








// Add this to your existing script.js
document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.addEventListener('click', function() {
        document.querySelector('.thumb.active').classList.remove('active');
        this.classList.add('active');
        // Logic to swap the main-model-img src would go here
    });
});















document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".info-section");

    sections.forEach((section) => {
        const isReverse = section.classList.contains("reverse");
        const car = section.querySelector(".info-image");
        const textElements = section.querySelectorAll(".info-content h2, .info-content p, .explore-btn");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Car Animation
        tl.from(car, {
            x: isReverse ? 100 : -100, 
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // 2. Text & Button Animation
        tl.from(textElements, {
            x: isReverse ? -100 : 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            clearProps: "all" // <--- THIS FIXES THE HOVER ISSUE
        }, "-=0.8");
    });
});






document.addEventListener('DOMContentLoaded', () => {
    
    // Select elements
    const colorBtns = document.querySelectorAll('.color-btn');
    const carImg = document.getElementById('config-car-img');
    const colorName = document.getElementById('color-name');

    // Loop through buttons to add click event
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // 1. Remove 'active' class from all buttons
            colorBtns.forEach(b => b.classList.remove('active'));
            
            // 2. Add 'active' class to clicked button
            btn.classList.add('active');

            // 3. Get data attributes
            const newImgSrc = btn.getAttribute('data-img');
            const newColorName = btn.getAttribute('data-name');

            // 4. Update Text
            colorName.textContent = newColorName;

            // 5. Update Image (with a quick fade effect)
            carImg.style.opacity = '0'; // Fade out
            
            setTimeout(() => {
                carImg.src = newImgSrc; // Change source
                carImg.onload = () => {
                    carImg.style.opacity = '1'; // Fade in
                };
            }, 200); // Wait 200ms for fade out
        });
    });
});











document.addEventListener('DOMContentLoaded', () => {
    // 1. Elements
    const slides = document.querySelectorAll('.model-slide');
    const dots = document.querySelectorAll('.dot');
    const titleElement = document.getElementById('carTitle');
    const exploreBtn = document.getElementById('exploreBtn');

    // 2. Data
    const carData = [
        { title: "Porsche Carrera GT", page: "Parsche-carera.html" },
        { title: "Porsche 718 Cayman GT4", page: "718-cayman.html" },
        { title: "Porsche Boxster GTS", page: "Porsche-boxter.html" },
        { title: "Porsche Taycan Turbo S", page: "taycan.html" },
        { title: "Porsche Macan", page: "macane.html" },
        { title: "Porsche Cayenne Turbo", page: "Cayenne.html" },
        { title: "Porsche 918 Spyder", page: "718-spider.html" },
        { title: "Porsche 911 Carrera S", page: "911.html" },
        { title: "Porsche SPORTS Concept", page: "sports-porsche.html" }
    ];

    // 3. Simple Switch Function
    function switchCar(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to selected
        if(slides[index]) slides[index].classList.add('active');
        if(dots[index]) dots[index].classList.add('active');

        // Update Title
        if(titleElement) titleElement.textContent = carData[index].title;
        
        // Update Explore Button Link
        if(exploreBtn) exploreBtn.href = carData[index].page;
    }

    // 4. Add Click Events to Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            switchCar(index);
        });
    });

    // 5. Initialize first car
    switchCar(0);
});






// moblie adjustment to the productpage 

const updateModelsForMobile = () => {
    // 1. Select BOTH cars
    const heroCar = document.querySelector('#hero-car');
    const reserveCar = document.querySelector('#reserve-car-model');
    
    // Check if we are on mobile (width less than 768px)
    const isMobile = window.innerWidth < 768;

    // --- LOGIC FOR HERO CAR ---
    if (heroCar) {
        if (isMobile) {
            heroCar.setAttribute('field-of-view', '45deg');
            heroCar.setAttribute('camera-orbit', '-45deg 85deg 5.5m');
        } else {
            heroCar.setAttribute('field-of-view', '25deg');
            heroCar.setAttribute('camera-orbit', '-50deg 85deg 4.5m');
        }
    }

    // --- LOGIC FOR RESERVE CAR ---
    if (reserveCar) {
        if (isMobile) {
            // Mobile: Zoom out slightly so it fits inside the container
            reserveCar.setAttribute('field-of-view', '50deg'); 
            // Mobile: Adjust angle if needed
            reserveCar.setAttribute('camera-orbit', '90deg 85deg 7m'); 
        } else {
            // Desktop: Your original settings
            reserveCar.setAttribute('field-of-view', '45deg'); 
            reserveCar.setAttribute('camera-orbit', '90deg 85deg 5.5m');
        }
    }
};

// Run on load and resize
window.addEventListener('load', updateModelsForMobile);
window.addEventListener('resize', updateModelsForMobile);









/* --- for homa page ZOOM OUT MODELS ON MOBILE --- */
function adjustModelsForMobile() {
    const isMobile = window.innerWidth < 768;

    // List of your model IDs and their settings
    const models = [
        { 
            id: 'carModel', // Section 1 Car
            mobileOrbit: '45deg 85deg 4.5m',  // 4.5m = Further away (Smaller)
            desktopOrbit: '45deg 85deg 2.5m'  // 2.5m = Closer (Bigger)
        },
        { 
            id: 'imageTarget1', // Section 2 Car (Performance) - Note: targeting the div's model-viewer
            mobileOrbit: '180deg 85deg 5m', 
            desktopOrbit: '180deg 85deg 2.5m' 
        },
        { 
            id: 'imageTarget2', // Section 3 Car (Engineering)
            mobileOrbit: '90deg 85deg 5m', 
            desktopOrbit: '90deg 85deg 2.5m' 
        }
    ];

    models.forEach(item => {
        // Find the model-viewer element. 
        // If ID is on a wrapper div (like imageTarget1), look inside it.
        let viewer = document.getElementById(item.id);
        
        // If the ID points to a DIV, find the model-viewer inside it
        if (viewer && viewer.tagName !== 'MODEL-VIEWER') {
            viewer = viewer.querySelector('model-viewer');
        }

        if (viewer) {
            if (isMobile) {
                viewer.setAttribute('camera-orbit', item.mobileOrbit);
                // Optional: Widen FOV to fit more of the car
                viewer.setAttribute('field-of-view', '45deg'); 
            } else {
                viewer.setAttribute('camera-orbit', item.desktopOrbit);
                viewer.setAttribute('field-of-view', 'auto');
            }
        }
    });
}

// Run on load and whenever window is resized
window.addEventListener('load', adjustModelsForMobile);
window.addEventListener('resize', adjustModelsForMobile);











// burger menu




const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    // Toggle the active class on both the hamburger (for animation) and the menu (to slide in)
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Optional: Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));