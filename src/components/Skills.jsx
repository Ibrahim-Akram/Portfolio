import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'FullStack Frontend Engineering',
    desc: 'Crafting responsive and interactive user interfaces using React, JavaScript, HTML5, CSS3, and Tailwind CSS.',
    tag: 'UI / INTERACTION',
    skills: ['React', 'Next.js', 'TypeScript', 'tailwind CSS', 'Framer Motion']
  },
  {
    title: 'eCommerce & Headless Commerce',
    desc: 'Building and scaling eCommerce-CMS applications using Shopify, WooCommerce, and Custom Theme Build.',
    tag: 'ECOMMERCE',
    skills: ['Shopify Plus', 'Shopify Hydrogen', 'WooCommerce', 'Microservices',  'Storefront API, Apps, & Admin', 'Plugin Development - Theme and plugin customization', 'Remix', 'GraphQL', 'Headless Commerce']
  },
  {
    title: 'Backend & Databases',
    desc: 'Building secure REST APIs, authentication flows, server-side applications, and high-performance database architectures.',
    tag: 'ARCHITECTURE',
    skills: ['Node.js', 'Nest.js', 'Redux', 'Express', 'PHP', 'MySQL MongoDB PostgreSQL DB', 'Python']
  },
  {
    title: 'CMS & Custom Development',
    desc: 'Developed a Custom CMS solution with advanced customization options, allowing users to manage content, templates, and workflows efficiently.',
    tag: 'CMS & CUSTOMIZATION',
    skills: ['WordPress', 'Webflow', 'Wix']
  },
  {
    title: 'AI & Tools',
    desc: 'Equipped with industry-grade instruments for version control, productivity extensions, and workflow management.',
    tag: 'PRODUCTIVITY',
    skills: ['Git', 'Chrome APIs', 'Claude Code', 'Google Cloud', 'Linux server commands', 'N8n Automation', 'CI/CD', 'Slack', 'Trello', 'VS Code',]
  },
  {
    title: 'Cybersecurity & Cloud',
    desc: 'Developing intelligent applications leveraging WAF, generative AI workflows, security protocols, and Vulnerability Assessment with Compliance challenges.',
    tag: '  CYBERSECURITY',
    skills: ['CIA-Traid', 'Generative AI', 'Penetration Testing', 'WAF', 'Cloud Security']
  },
  {
    title: 'Algorithmic Problem Solving',
    desc: 'Optimizing data structures and solving complex algorithmic challenges across competitive programming platforms.',
    tag: 'COMPETITIVE',
    skills: ['Data Structures', 'Algorithms', 'LeetCode', 'CodeChef', 'GFG']
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);
  const carouselRef = useRef(null);
  const activeIndexRef = useRef(0);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;

    const container = e.target;
    const center =
      container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardCenter =
        card.offsetLeft + card.offsetWidth / 2;

      const diff = Math.abs(cardCenter - center);

      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    activeIndexRef.current = activeIdx;

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, {
          scale: i === activeIdx ? 1 : 0.9,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        gsap.to(bg, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: "auto"
        });
      }
    });

    textRefs.current.forEach((txt, i) => {
      if (txt) {
        gsap.to(txt, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: "auto"
        });
      }
    });
  };

  useLayoutEffect(() => {
    let cleanupAutoplay = null;

    let ctx = gsap.context(() => {

      let mm = gsap.matchMedia();

      // =========================
      // DESKTOP
      // =========================
      mm.add("(min-width: 769px)", () => {

        const updateCards = (p) => {

          cardsRef.current.forEach((card, i) => {

            if (!card) return;

            const offset = i - p;

            const radius = 1800;
            const angleSpread = 18;

            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;

            const x = Math.sin(rad) * radius;
            const y =
              radius - (Math.cos(rad) * radius);

            const z = -Math.abs(offset) * 50;

            const scale = Math.max(
              0.4,
              1 - Math.abs(offset) * 0.15
            );

            const rotateZ = angle;

            const opacity = Math.max(
              0.1,
              1 - Math.abs(offset) * 0.3
            );

            const zIndex = Math.round(
              100 - Math.abs(offset) * 10
            );

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0,
              opacity: opacity,
              zIndex: zIndex,
            });

          });

          bgRefs.current.forEach((bg, i) => {

            if (!bg) return;

            const itemOpacity =
              Math.max(0, 1 - Math.abs(i - p));

            gsap.set(bg, {
              opacity: itemOpacity
            });

            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], {
                opacity: itemOpacity
              });
            }

          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1,

          onUpdate: (self) => {
            const p =
              self.progress *
              (skillCategories.length - 1);

            updateCards(p);
          }
        });

      });


      // =========================
      // MOBILE
      // =========================
      mm.add("(max-width: 768px)", () => {

        cardsRef.current.forEach((card, i) => {

          if (card) {

            gsap.set(card, {
              clearProps:
                "x,y,z,rotation,scale,opacity,position"
            });

            gsap.set(card, {
              scale: i === 0 ? 1 : 0.9
            });

          }

        });

        bgRefs.current.forEach((bg, i) => {

          if (bg) {

            gsap.set(bg, {
              clearProps: "all",
              opacity: i === 0 ? 1 : 0
            });

          }

        });

        textRefs.current.forEach((txt, i) => {

          if (txt) {

            gsap.set(txt, {
              clearProps: "all",
              opacity: i === 0 ? 1 : 0
            });

          }

        });

        // Autoplay: advance to the next skill card on a timer
        const carousel = carouselRef.current;

        if (carousel) {

          let autoplayId = null;
          let resumeTimeoutId = null;

          const goToNext = () => {
            const total = cardsRef.current.length;
            const nextIndex = (activeIndexRef.current + 1) % total;
            const nextCard = cardsRef.current[nextIndex];

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

          cleanupAutoplay = () => {
            carousel.removeEventListener('touchstart', pauseThenResume);
            carousel.removeEventListener('pointerdown', pauseThenResume);
            stopAutoplay();
            if (resumeTimeoutId) clearTimeout(resumeTimeoutId);
          };

        }

      });

    }, sectionRef);

    return () => {
      ctx.revert();
      if (cleanupAutoplay) cleanupAutoplay();
    };

  }, []);

  return (

    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >

      {/* Episode Badge */}
      <div className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-[#71ff64]/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-[#71ff64] animate-ping"></span>
        <span className="text-[#71ff64] font-bold">EPISODE 03</span>
        <span className="text-white/40">|</span>
        <span>SKILL MATRIX</span>
      </div>

      {/* Dynamic Green Dark Background Vignettes */}
      {skillCategories.map((_, i) => (

        <div
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#071007] to-black"
        />

      ))}


      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">

        {skillCategories.map((_, i) => (

          <h1
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{
              WebkitTextStroke:
                `2px ${
                  i % 2 === 0
                    ? 'rgba(113,255,100,0.3)'
                    : 'rgba(255,255,255,0.15)'
                }`,
              opacity: 0
            }}
          >
            SKILLS
          </h1>

        ))}

      </div>


      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >

        {skillCategories.map((category, i) => (

          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-[#71ff64]/80 transition-colors duration-500"
          >

            {/* Inner Green Glossy Reflection */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-[#71ff64]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            />


            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">

              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#71ff64] bg-[#71ff64]/10 px-3 py-1 rounded border border-[#71ff64]/20">
                {category.tag}
              </span>

              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>

            </div>


            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">

              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-[#71ff64] transition-colors duration-300">
                {category.title}
              </h3>

              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>

            </div>


            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">

              {category.skills.map((skill, sIdx) => (

                <span
                  key={sIdx}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-[#71ff64]/30 transition-colors"
                >
                  {skill}
                </span>

              ))}

            </div>


            {/* Bottom Green Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#71ff64] group-hover:shadow-[0_0_15px_#71ff64] transition-all" />

          </div>

        ))}

      </div>

    </section>
  );
};

export default Skills;