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


// ✅ ======================
// ✅ Apple Animation Section
// ✅ ======================

// // Utility math functions
// const LERP = (x, y, a) => x * (1 - a) + y * a;
// const CLAMP = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
// const INVLERP = (x, y, a) => CLAMP((a - x) / (y - x));
// const RANGE = (x1, y1, x2, y2, a) => LERP(x2, y2, INVLERP(x1, y1, a));

// // ✅ SVG Mask Setup
// const setClip = () =>
//   gsap.set('svg.apple-video path', {
//     x: () => window.innerWidth / 2 - 12,
//     y: () => window.innerHeight / 2 - 12,
//     scale: 0,
//     transformOrigin: '50% 50%',
//   });

// setClip();
// ScrollTrigger.addEventListener('refresh', () => {
//   setClip();
//   document.documentElement.scrollTop = 0;
// });

// // ✅ Collect Frames
// const COMPLETE_FRAMES = document.querySelectorAll('.apple-image.apple-image--complete');
// const GOBBLE_FRAMES = document.querySelectorAll('.apple-image.apple-image--gobble');

// // ✅ INTRO sequence
// function INTRO() {
//   const introSection = document.querySelector('.section--intro');
//   return gsap.timeline({
//     scrollTrigger: {
//       scrub: 0.5,
//       trigger: introSection,
//       pin: '.section--intro .section__content',
//       start: 'top top',
//       end: 'bottom bottom',
//     },
//   })
//     .set('.section--intro .text', { y: '+=100%', opacity: 0 })
//     .set('.section--intro .blurb p', { y: '+=100%', opacity: 0 })
//     .to('.section--intro .section__content', {
//       scrollTrigger: {
//         scrub: 0.5,
//         trigger: introSection,
//         start: 'top top',
//         end: 'top -=25%',
//         onUpdate: self =>
//           document.documentElement.style.setProperty('--alpha', self.progress / 2),
//       },
//     })
//     .to('.section--intro .text', {
//       y: 0,
//       opacity: 1,
//       stagger: 0.1,
//       scrollTrigger: {
//         scrub: 0.5,
//         trigger: introSection,
//         start: "top 10%",
//         end: "top 20%",
//       },
//     })
//     .fromTo(
//       '.section--intro .text',
//       { y: 0, opacity: 1 },
//       { y: '-=100%', opacity: 0, stagger: 0.1,
//         scrollTrigger: {
//           scrub: 0.5,
//           trigger: introSection,
//           start: "top 30%",
//           end: "top 40%",
//         }
//       }
//     );
// }

// // ✅ DANCE sequence
// function DANCE() {
//   const danceSection = document.querySelector('.section--dance');
//   return gsap.timeline({
//     scrollTrigger: {
//       scrub: true,
//       pin: '.section--apple',
//       trigger: '.section--intro',
//       endTrigger: danceSection,
//       start: 'top top',
//       end: 'bottom bottom',
//     },
//   })
//     .set('.section--apple__apple', { x: 0 })
//     .set(COMPLETE_FRAMES[0], { display: 'block' })
//     .to({}, {
//       scrollTrigger: {
//         scrub: true,
//         trigger: danceSection,
//         start: 'top -=55%',
//         end: 'top -=65%',
//         onUpdate: self => {
//           let index;
//           const start = 0.1, end = 0.9;
//           if (self.progress < start) index = 0;
//           else if (self.progress > end) index = COMPLETE_FRAMES.length - 1;
//           else index = Math.floor(RANGE(start, end, 0, COMPLETE_FRAMES.length - 1, self.progress));

//           gsap.set(COMPLETE_FRAMES, { display: 'none' });
//           gsap.set(COMPLETE_FRAMES[index], { display: 'block' });
//         }
//       }
//     });
// }

// // ✅ CLIPPER sequence
// function CLIPPER() {
//   const clipSection = document.querySelector('.section--clipper');
//   return gsap.timeline({
//     scrollTrigger: {
//       scrub: 0.5,
//       trigger: clipSection,
//       endTrigger: '.section--outro',
//       pin: '.section--clipper .section__content',
//       start: 'top top',
//       end: 'bottom -=50%',
//     },
//   })
//     .set('.section--clipper .text', { opacity: 0, y: '100%' })
//     .to('.section--clipper .text', {
//       y: '-50%',
//       opacity: 1,
//       scrollTrigger: {
//         scrub: 0.5,
//         trigger: clipSection,
//         start: 'top top',
//         end: 'top -10%',
//       },
//     });
// }

// // ✅ GOBBLE sequence
// function GOBBLE() {
//   const outroSection = document.querySelector('.section--outro');
//   return gsap.timeline({
//     scrollTrigger: {
//       scrub: 0.5,
//       pin: '.section--outro .section__content',
//       trigger: outroSection,
//       start: 'top top',
//       end: 'bottom bottom',
//       onUpdate: self => {
//         let index;
//         const start = 0.25, end = 0.5;
//         if (self.progress < start) index = 0;
//         else if (self.progress > end) index = GOBBLE_FRAMES.length - 1;
//         else index = Math.floor(RANGE(start, end, 0, GOBBLE_FRAMES.length - 1, self.progress));

//         gsap.set(GOBBLE_FRAMES, { display: 'none' });
//         gsap.set(GOBBLE_FRAMES[index], { display: 'block' });
//       },
//     },
//   });
// }

// // ✅ Master Timeline for Apple Section
// gsap.timeline()
//   .add(INTRO())
//   .add(DANCE())
//   .add(CLIPPER())
//   .add(GOBBLE());
