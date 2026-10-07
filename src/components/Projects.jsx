import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data based on your engineering portfolio
const projectsData = [
  {
    title: "TravelAgency Web Application",
    category: "Full-Stack Architecture",
    description: "Develop a custom frontend UI with a responsive interface, conditional rendering, and dynamic routing, integrated with a robust backend API for seamless data management.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    match: "99%",
    episode: "S01 E01"
  },
  {
    title: "Multi-ECommerce Websites CMS",
    category: "Shopify & WooCommerce Development",
    description: "Multisite eCommerce website with custom Shopify Hydrogen storefronts, WooCommerce integration, and headless CMS architecture.",
    tags: ["Liquid code", "GraphQL", "Remix", "Custom StoreFront API", "Headless Commerce", "Shopify Hydrogen", "WooCommerce", "PHP", "WordPress"],
    match: "98%",
    episode: "S01 E02"
  },
  {
    title: "Payment Gateway System",
    category: "Fintech Architecture",
    description: "Simulates complex transaction state management, webhook verification, and multi-method processing.",
    tags: ["JavaScript", "PostgreSQL", "REST APIs", "Docker"],
    match: "97%",
    episode: "S01 E03"
  },
  {
    title: "Productivity Suite Extension",
    category: "Client-Side Engineering",
    description: "Custom Chrome extension built with Chrome APIs and advanced JavaScript for task automation and management.",
    tags: ["JavaScript", "Chrome APIs", "Tailwind CSS", "HTML5"],
    match: "99%",
    episode: "S01 E04"
  },
  {
    title: "QT & QML Diagnostic UI",
    category: "Artificial Intelligence",
    description: "Design a Qt cross platform apps with animated models and visually UI.",
    tags: ["Qt", "QML", "NLP", "AWS"],
    match: "96%",
    episode: "S01 E05"
  },
  {
    title: "Algorithmic Problem Solver",
    category: "Competitive Programming",
    description: "Optimized data structure solutions across LeetCode, CodeChef, and GeeksforGeeks platforms.",
    tags: ["Data Structures", "Algorithms", "C++", "JavaScript"],
    match: "99%",
    episode: "S01 E06"
  },
  {
    title: "Portfolio Cinematics v2.6",
    category: "UI/UX & Animation",
    description: "Award-winning dark studio interactive portfolio featuring GSAP physics and responsive layouts.",
    tags: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
    match: "100%",
    episode: "S01 E07"
  },
  {
    title: "Cloud CI/CD Pipeline",
    category: "DevOps & Infrastructure",
    description: "Automated deployment workflows using GitHub Actions and containerized Docker environments.",
    tags: ["Docker", "GitHub Actions", "CI/CD", "Render"],
    match: "98%",
    episode: "S01 E08"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    let cleanupActiveCardScroll = null;

    let ctx = gsap.context(() => {

      // Set initial origins
      gsap.set(
        [folderBackRef.current, folderFrontRef.current],
        {
          xPercent: -50,
          yPercent: -50
        }
      );

      gsap.set(folderFrontRef.current, {
        transformOrigin: "bottom center"
      });

      const getGridPos = (index) => {
        let row, col;

        if (index < 3) {
          row = 0;
          col = index;
        } else if (index === 3) {
          row = 1;
          col = 0;
        } else if (index === 4) {
          row = 1;
          col = 2;
        } else {
          row = 2;
          col = index - 5;
        }

        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)"
        },
        (context) => {

          let { isDesktop, isMobile } = context.conditions;

          // =========================
          // DESKTOP ANIMATION
          // =========================
          if (isDesktop) {

            let floatTween;

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 50%",
                end: "bottom 50%",
                toggleActions: "play reverse play reverse",

                onEnter: () => {
                  if (floatTween) floatTween.kill();
                },

                onEnterBack: () => {
                  if (floatTween) floatTween.kill();
                },

                onLeave: () => {
                  if (floatTween) floatTween.kill();
                },

                onLeaveBack: () => {
                  if (floatTween) floatTween.kill();
                }
              },

              onComplete: () => {
                floatTween = gsap.to(cardsRef.current, {
                  y: "+=12",
                  rotation: "+=1",
                  duration: 3.5,
                  yoyo: true,
                  repeat: -1,
                  ease: "sine.inOut",
                  stagger: {
                    amount: 1.5,
                    from: "random"
                  }
                });
              }
            });

            // 1. Folder opens
            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 1.2,
              ease: "power3.inOut"
            });

            // 2. Cards rise
            tl.to(
              cardsRef.current,
              {
                y: -140,
                scale: 0.9,
                zIndex: 70,
                duration: 0.6,
                stagger: 0.04,
                ease: "back.out(1.2)"
              },
              "-=0.6"
            );

            // 3. Cards spread into grid
            tl.to(
              cardsRef.current,
              {
                x: (i) => {
                  const w =
                    Math.max(
                      ...cardsRef.current.map(
                        c => c?.offsetWidth || 0
                      )
                    ) || 360;

                  const gap = 40;
                  const { col } = getGridPos(i);

                  return (col - 1) * (w + gap);
                },

                y: (i) => {
                  const h =
                    Math.max(
                      ...cardsRef.current.map(
                        c => c?.offsetHeight || 0
                      )
                    ) || 240;

                  const gap = 40;
                  const { row } = getGridPos(i);

                  return (row - 1) * (h + gap);
                },

                rotation: () =>
                  gsap.utils.random(-3, 3),

                scale: 1,

                duration: 1.4,

                stagger: {
                  amount: 0.4,
                  from: "center"
                },

                ease: "expo.out"
              },
              "-=0.2"
            );
          }

          // =========================
          // MOBILE ANIMATION
          // =========================
          if (isMobile) {

            const cardW = window.innerWidth * 0.8;
            const gap = 20;

            mobileCardsRef.current.forEach((card, i) => {

              gsap.set(card, {
                x: -(i * (cardW + gap)),
                y: 0,
                scale: 0.4,
                opacity: 0,
                rotation: gsap.utils.random(-15, 15)
              });

            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%"
              }
            });

            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 0.8,
              ease: "power3.inOut"
            });

            tl.to(
              mobileCardsRef.current,
              {
                y: -100,
                opacity: 1,
                scale: 0.85,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.2)"
              },
              "-=0.4"
            );

            tl.to(
              mobileCardsRef.current,
              {
                x: 0,
                y: 0,

                rotation: 0,

                scale: (i) =>
                  i === 0 ? 1 : 0.92,

                opacity: (i) =>
                  i === 0 ? 1 : 0.5,

                duration: 0.8,

                stagger: 0.08,

                ease: "expo.out",

                onComplete: () => {

                  const carousel = mobileCarouselRef.current;

                  if (carousel) {

                    carousel.style.overflowX = 'auto';
                    carousel.style.pointerEvents = 'auto';

                    let rafId = null;

                    const updateActiveCard = () => {
                      const carouselRect = carousel.getBoundingClientRect();
                      const carouselCenter = carouselRect.left + carouselRect.width / 2;

                      let closestIndex = 0;
                      let closestDistance = Infinity;

                      mobileCardsRef.current.forEach((card, idx) => {
                        if (!card) return;

                        const rect = card.getBoundingClientRect();
                        const cardCenter = rect.left + rect.width / 2;
                        const distance = Math.abs(cardCenter - carouselCenter);

                        if (distance < closestDistance) {
                          closestDistance = distance;
                          closestIndex = idx;
                        }
                      });

                      activeIndexRef.current = closestIndex;

                      mobileCardsRef.current.forEach((card, idx) => {
                        if (!card) return;

                        gsap.to(card, {
                          scale: idx === closestIndex ? 1 : 0.92,
                          opacity: idx === closestIndex ? 1 : 0.5,
                          duration: 0.3,
                          ease: "power2.out",
                          overwrite: "auto"
                        });
                      });
                    };

                    const handleScroll = () => {
                      if (rafId) cancelAnimationFrame(rafId);
                      rafId = requestAnimationFrame(updateActiveCard);
                    };

                    carousel.addEventListener('scroll', handleScroll, { passive: true });

                    // Autoplay: advance to the next card on a timer
                    let autoplayId = null;
                    let resumeTimeoutId = null;

                    const goToNext = () => {
                      const total = mobileCardsRef.current.length;
                      const nextIndex = (activeIndexRef.current + 1) % total;
                      const nextCard = mobileCardsRef.current[nextIndex];

                      if (nextCard) {
                        const targetLeft =
                          nextCard.offsetLeft -
                          (carousel.offsetWidth - nextCard.offsetWidth) / 2;

                        carousel.scrollTo({
                          left: targetLeft,
                          behavior: 'smooth'
                        });
                      }
                    };

                    const startAutoplay = () => {
                      stopAutoplay();
                      autoplayId = setInterval(goToNext, 3500);
                    };

                    const stopAutoplay = () => {
                      if (autoplayId) clearInterval(autoplayId);
                      autoplayId = null;
                    };

                    const pauseThenResume = () => {
                      stopAutoplay();
                      if (resumeTimeoutId) clearTimeout(resumeTimeoutId);
                      resumeTimeoutId = setTimeout(startAutoplay, 4500);
                    };

                    carousel.addEventListener('touchstart', pauseThenResume, { passive: true });
                    carousel.addEventListener('pointerdown', pauseThenResume, { passive: true });

                    startAutoplay();

                    cleanupActiveCardScroll = () => {
                      carousel.removeEventListener('scroll', handleScroll);
                      carousel.removeEventListener('touchstart', pauseThenResume);
                      carousel.removeEventListener('pointerdown', pauseThenResume);
                      if (rafId) cancelAnimationFrame(rafId);
                      stopAutoplay();
                      if (resumeTimeoutId) clearTimeout(resumeTimeoutId);
                    };

                  }

                }
              },
              "-=0.2"
            );
          }
        }
      );

    }, containerRef);

    return () => {
      ctx.revert();
      if (cleanupActiveCardScroll) cleanupActiveCardScroll();
    };

  }, []);

  return (

    <section
      id="projects"
      ref={containerRef}
      className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-12 md:py-40 select-none"
    >

      {/* Episode Badge */}
      <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-[#71ff64]/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-[#71ff64] animate-ping"></span>
        <span className="text-[#71ff64] font-bold">EPISODE 03</span>
        <span className="text-white/40">|</span>
        <span>FEATURED PROJECTS</span>
      </div>

      {/* Background Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">

        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>

      </div>


      {/* Ambient Green Glow Behind Folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-[#71ff64]/15 rounded-full blur-[160px] pointer-events-none z-0" />


      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">

        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">


          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-[#71ff64]/40 shadow-[0_20px_50px_rgba(113,255,100,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >

            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-[#71ff64]/30" />

            <div className="relative z-10 text-[#71ff64] font-mono font-black text-2xl tracking-widest uppercase opacity-60">
              ARCHIVE_SLOTS
            </div>

          </div>


          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (

            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >

              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-[#71ff64] hover:shadow-[0_35px_80px_rgba(113,255,100,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between">


                {/* Top Card Header */}
                <div className="flex items-center justify-between">

                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#71ff64] bg-[#71ff64]/10 px-2.5 py-1 rounded border border-[#71ff64]/20">
                    {project.episode}
                  </span>

                  <div className="flex items-center gap-2">

                    <span className="text-xs font-mono text-[#71ff64] font-bold">
                      {project.match} Match
                    </span>

                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">
                      HD
                    </span>

                  </div>

                </div>


                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">

                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-[#71ff64] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                </div>


                {/* Bottom Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">

                  {project.tags.map((tag, tIdx) => (

                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-[#71ff64]/30 transition-colors"
                    >
                      {tag}
                    </span>

                  ))}

                </div>


                {/* Green Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#71ff64] group-hover:shadow-[0_0_15px_#71ff64] transition-all" />

              </div>

            </div>

          ))}


          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >

            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-[#71ff64]/40">

              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />

            </div>

          </div>

        </div>

      </div>


      {/* Mobile Swipeable Carousel */}
      <div
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >

        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>


        {projectsData.map((project, i) => (

          <div
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >

            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">

              <div className="flex items-center justify-between">

                <span className="text-[10px] font-mono font-bold tracking-widest text-[#71ff64] bg-[#71ff64]/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>

                <span className="text-xs font-mono text-[#71ff64] font-bold">
                  {project.match} Match
                </span>

              </div>


              <div className="space-y-2">

                <h3 className="text-xl font-black text-white">
                  {project.title}
                </h3>

                <p className="text-xs text-white/70 font-light line-clamp-2">
                  {project.description}
                </p>

              </div>


              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">

                {project.tags.slice(0, 3).map((tag, tIdx) => (

                  <span
                    key={tIdx}
                    className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Projects;