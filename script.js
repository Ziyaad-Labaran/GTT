// ✅ Register GSAP plugin ONCE
gsap.registerPlugin(ScrollTrigger);

// ✅ Images & Loader Animation
const images = gsap.utils.toArray('img');
const loader = document.querySelector('.loader--text');

const updateProgress = (instance) => {
  loader.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;
};

const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);
  gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });

  // ✅ Horizontal scroll animations
  gsap.utils.toArray('section').forEach((section, index) => {
    const w = section.querySelector('.wrapper');
    if (!w) return; // skip sections without wrapper

    const [x, xEnd] = (index % 2)
      ? ['100%', (w.scrollWidth - section.offsetWidth) * -1]
      : [w.scrollWidth * -1, 0];

    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: { 
        trigger: section,
        scrub: 0.5 
      }
    });
  });
};

// ✅ Wait for images to load
imagesLoaded(images)
  .on('progress', updateProgress)
  .on('always', showDemo);

// ✅ Box Animation Timeline (simple pin + scrub)
gsap.timeline({
  scrollTrigger: {
    trigger: ".trigger",
    scrub: 0.5,
    pin: true,
    start: "top top",
    end: "+=150%"
  }
})
.to(".box", {
  force3D: true,
  duration: 1,
  xPercent: 100,
  ease: "power1.inOut",
  stagger: { amount: 1 }
})
.to(".box", { ease: "power1.out", duration: 1, rotation: "45deg" }, 0)
.to(".box", { ease: "power1.in", duration: 1, rotation: "0deg" }, 1);



gsap.utils.toArray(".section").forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top top", 
    pin: true, 
    pinSpacing: false 
  });
});



  gsap.registerPlugin(ScrollTrigger);
    gsap.to(".single-usage", {
  scrollTrigger: {
    start: "0 40%",
    end: "50% 30%",
    trigger: ".effipac-usage",
    scrub: 0.5,
  },
  delay: 1,
  stagger: 1,
  clipPath: "inset(0 0 0% 0)"
});





class AccordionSlider {
	constructor() {
		this.slides = document.querySelectorAll(".slide");
		this.prevBtn = document.querySelector(".nav-prev");
		this.nextBtn = document.querySelector(".nav-next");
		this.currentIndex = -1;

		this.init();
	}

	init() {
		this.slides.forEach((slide, index) => {
			slide.addEventListener("click", () => this.setActiveSlide(index));
		});

		this.prevBtn.addEventListener("click", () => this.previousSlide());
		this.nextBtn.addEventListener("click", () => this.nextSlide());

		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") this.previousSlide();
			if (e.key === "ArrowRight") this.nextSlide();
		});
	}

	setActiveSlide(index) {
		if (this.currentIndex === index) {
			this.slides.forEach((slide) => slide.classList.remove("active"));
			this.currentIndex = -1;
		} else {
			this.slides.forEach((slide) => slide.classList.remove("active"));
			this.slides[index].classList.add("active");
			this.currentIndex = index;
		}
	}

	nextSlide() {
		const nextIndex =
			this.currentIndex === -1 ? 0 : (this.currentIndex + 1) % this.slides.length;
		this.setActiveSlide(nextIndex);
	}

	previousSlide() {
		const prevIndex =
			this.currentIndex === -1
				? this.slides.length - 1
				: (this.currentIndex - 1 + this.slides.length) % this.slides.length;
		this.setActiveSlide(prevIndex);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new AccordionSlider();
});


 gsap.registerPlugin(ScrollTrigger);

    const video = document.getElementById("scrollVideo");

    // Ensure metadata is loaded so duration is available
    video.addEventListener('loadedmetadata', () => {
      let duration = video.duration;

      gsap.to(video, {
        currentTime: duration,
        ease: "none",
        scrollTrigger: {
          trigger: ".video-section",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: "#srollvideo", // keeps video fixed while scrolling
        }
      });
    });