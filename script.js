/**
 * GEO SAFARIS TANZANIA - CORE HIGH-PERFORMANCE WEB MOTOR
 * Engineered with Vanilla JS only. High efficiency DOM operations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- STICKY NAVBAR ENGINE ---
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- MOBILE HAMBURGER MENU ACTIONS ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

    const toggleMenu = () => {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- INTERSECTION OBSERVER FOR ACTIVE ROUTING ACCENTS ---
    const sections = document.querySelectorAll('section');
    const navMenuLinks = document.querySelectorAll('.nav-link');
    
    const activeSectionOptions = { threshold: 0.25, rootMargin: "0px 0px -20% 0px" };
    
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navMenuLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, activeSectionOptions);

    sections.forEach(section => activeSectionObserver.observe(section));

    // --- LAZY LOADING STRATEGY WITH CHUNKING ---
    const lazyImages = document.querySelectorAll('.lazy-img');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.addEventListener('load', () => img.classList.add('loaded'));
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(image => lazyImageObserver.observe(image));

    // --- VIEWPORT SCROLL ANIMATIONS SYSTEM ---
    const animatedElements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right, .reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, { threshold: 0.15 });
    animatedElements.forEach(el => revealObserver.observe(el));

    // --- ANIMATED COUNTERS ENGINE ---
    const counters = document.querySelectorAll('.stat-number');
    let counterTriggered = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            const duration = 2000; // 2 seconds run window
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, stepTime);
        });
    };

    const statsSection = document.querySelector('.hero-stats-container');
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !counterTriggered) {
            startCounters();
            counterTriggered = true;
            statsObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);

    // --- CURATED TESTIMONIAL SLIDER IMPLEMENTATION ---
    const slider = document.getElementById('testimonialSlider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentIndex = 0;
    let autoSlideTimer;

    // Build pagination track dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => gotoSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateSliderUI = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentIndex);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    };

    const gotoSlide = (index) => {
        currentIndex = index;
        updateSliderUI();
        resetAutoSlide();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderUI();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderUI();
    };

    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    // Touch Integration Mechanics for Mobile Swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true });
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        if (touchStartX - touchEndX > 50) { nextSlide(); resetAutoSlide(); }
        if (touchEndX - touchStartX > 50) { prevSlide(); resetAutoSlide(); }
    };

    const startAutoSlide = () => autoSlideTimer = setInterval(nextSlide, 6000);
    const resetAutoSlide = () => { clearInterval(autoSlideTimer); startAutoSlide(); };
    startAutoSlide();

    // --- LIGHTBOX FRAME GALLERY INTEGRATION ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentGalleryIndex = 0;
    const galleryImagesArray = [];

    galleryItems.forEach((item, idx) => {
        const actualImg = item.querySelector('img');
        galleryImagesArray.push({
            src: actualImg.dataset.src || actualImg.src,
            alt: actualImg.alt
        });
        
        item.addEventListener('click', () => {
            currentGalleryIndex = idx;
            openLightbox();
        });
    });

    const openLightbox = () => {
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        updateLightboxImage();
    };

    const updateLightboxImage = () => {
        const targetData = galleryImagesArray[currentGalleryIndex];
        lightboxImg.src = targetData.src;
        lightboxImg.alt = targetData.alt;
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        if (!navMenu.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', () => { currentGalleryIndex = (currentGalleryIndex + 1) % galleryImagesArray.length; updateLightboxImage(); });
    lightboxPrev.addEventListener('click', () => { currentGalleryIndex = (currentGalleryIndex - 1 + galleryImagesArray.length) % galleryImagesArray.length; updateLightboxImage(); });
    
    lightbox.addEventListener('click', (e) => { if(e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) closeLightbox(); });

    // --- LOCALIZED DATA FOR ENHANCED CONSERVATION MODALS ---
    const destinationDetailsPayloads = {
        'modal-serengeti': {
            title: "Serengeti National Park",
            body: "The Serengeti represents the classical ideal of untamed Africa. Spanning 14,763 square kilometers, its ecosystem guides the legendary Great Wildebeest Migration sequence. Travelers here gain access to massive prides of lions, sleek cheetah hunting profiles, and iconic luxury tented outposts placed explicitly along tracking paths."
        },
        'modal-ngorongoro': {
            title: "Ngorongoro Conservation Area",
            body: "Formed via a catastrophic volcanic collapse millions of years ago, this massive completely intact caldera forms a natural sanctuary for over 30,000 prehistoric animals. It remains the absolute premier theater across East Africa for documenting the highly elusive Black Rhinoceros alongside dense volcanic lake flamingo arrays."
        },
        'modal-tarangire': {
            title: "Tarangire National Park",
            body: "Traversed by the perennial Tarangire River, this system is an oasis during critical dry seasons. It boasts ancient Baobab timber clusters housing massive extended multi-family elephant herds numbering up to 300 individuals. Private safaris here explore secluded northern valley spaces away from conventional paths."
        },
        'modal-manyara': {
            title: "Lake Manyara National Park",
            body: "This narrow green strip contains a highly dynamic range of micro-ecosystems ranging from underground water forests to steep rift valley slopes. It is historically celebrated for unique tree-climbing lion family structures and shallow soda pans packed with vibrant pink plumage tracks."
        },
        'modal-kilimanjaro': {
            title: "Mount Kilimanjaro Base",
            body: "Rising an imposing 5,895 meters directly out of the agricultural savannah baseline, Kilimanjaro stands as the highest free-standing caldera matrix on Earth. Geo Safaris manages custom executive tracking expeditions route-mapped across technical paths featuring specialized multi-tier medical backstops."
        },
        'modal-zanzibar': {
            title: "Zanzibar Archipelago",
            body: "The ultimate post-savanna luxury unwinding platform. Formed by the islands of Unguja and Pemba, Zanzibar provides historical Stone Town spice history trails blended seamlessly into exclusive isolated private coral islet hideaways featuring pristine overwater architectural layouts."
        }
    };

    const modal = document.getElementById('destinationModal');
    const modalContent = modal.querySelector('.modal-body-content');
    const modalClose = modal.querySelector('.modal-close-btn');

    document.querySelectorAll('.btn-readmore').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetKey = button.dataset.target;
            const data = destinationDetailsPayloads[targetKey];
            if (data) {
                modalContent.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModalWindow = () => {
        modal.style.display = 'none';
        if (!navMenu.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    };
    modalClose.addEventListener('click', closeModalWindow);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModalWindow);

    // --- FORM ACTION LINK INCOMING FROM PACKAGES ---
    document.querySelectorAll('.package-book-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            const targetSelect = document.getElementById('tourType');
            targetSelect.value = this.dataset.tour;
        });
    });

    // --- BOOKING VALIDATION & SECURE WHATSAPP DISPATCH MOTOR ---
    const bookingForm = document.getElementById('safariBookingForm');
    
    // Set realistic standard date minimum selection to protect operational integrity
    const dateInput = document.getElementById('travelDate');
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum booking setup notice: 24h notice window
    dateInput.min = today.toISOString().split('T')[0];

    const validateField = (inputEl, errorEl) => {
        if (!inputEl.value.trim()) {
            inputEl.parentElement.classList.add('invalid');
            return false;
        } else {
            inputEl.parentElement.classList.remove('invalid');
            return true;
        }
    };

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameField = document.getElementById('fullName');
        const countryField = document.getElementById('country');
        const dateField = document.getElementById('travelDate');
        const travelersField = document.getElementById('travelers');
        const tourField = document.getElementById('tourType');
        const messageField = document.getElementById('userMessage');

        const isNameValid = validateField(nameField);
        const isCountryValid = validateField(countryField);
        const isDateValid = validateField(dateField);
        const isTravelersValid = travelersField.value >= 1;
        const isTourValid = validateField(tourField);

        if (isNameValid && isCountryValid && isDateValid && isTravelersValid && isTourValid) {
            
            // Format precise message structural string per required specification rules
            const messageString = `Hello Geo Safaris Tanzania,\n\n` +
                                  `My Name: ${nameField.value.trim()}\n\n` +
                                  `Country: ${countryField.value.trim()}\n\n` +
                                  `Travel Date: ${dateField.value}\n\n` +
                                  `Travelers: ${travelersField.value}\n\n` +
                                  `Tour Type: ${tourField.value}\n\n` +
                                  `Message:\n${messageField.value.trim() || 'No additional notes provided.'}`;

            // Transform parameters cleanly to URL parameters using standard encoding
            const whatsappBaseUrl = "https://wa.me/255743828620";
            const finalDispatchUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(messageString)}`;
            
            // Direct system tab push initialization
            window.open(finalDispatchUrl, '_blank', 'noopener');
        } else {
            // Trigger UI alerts on incomplete fields
            if (!isNameValid) nameField.parentElement.classList.add('invalid');
            if (!isCountryValid) countryField.parentElement.classList.add('invalid');
            if (!isDateValid) dateField.parentElement.classList.add('invalid');
            if (!isTravelersValid) travelersField.parentElement.classList.add('invalid');
            if (!isTourValid) tourField.parentElement.classList.add('invalid');
            
            // Scroll safely back to form boundaries to notify client
            document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Global Key Listener Architecture for Accessibility Escapes
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeModalWindow();
        }
    });
});
