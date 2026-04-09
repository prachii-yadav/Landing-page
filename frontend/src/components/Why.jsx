import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import whyShapes   from '../assets/why/Why_Shapes.svg';
import whyIllustration from '../assets/why/Why_Illustration.svg';
import arrowIcon   from '../assets/why/Arrow_icon.svg';


export default function Why() {
  const sectionRef = useIntersectionObserver(
    (el) => el.classList.add('section-visible'),
    { threshold: 0.1 }
  );

  const rightRef   = useRef(null);
  const card1Ref   = useRef(null);
  const shapeRef   = useRef(null);

  useEffect(() => {
    const rightEl = rightRef.current;
    if (!rightEl) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        rightEl.classList.add('panel-visible');
        obs.unobserve(rightEl);
      }
    }, { threshold: 0.2 });
    obs.observe(rightEl);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const cards = [
      { el: card1Ref.current, delay: 0 },
    ];

    const observers = cards.map(({ el, delay }) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('card-visible'), delay);
          obs.unobserve(el);
        }
      }, { threshold: 0.2 });
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const section = shapeRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.querySelectorAll('.why-shape-bg').forEach(el => el.classList.add('shapes-active'));
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="why" id="why" ref={sectionRef}>

      {/* ── Left: decorative shapes + illustration cards ── */}
      <div className="why-left" ref={shapeRef}>
        {/* Decorative background shapes */}
        <img src={whyShapes} alt="" aria-hidden="true" className="why-shape-bg why-shape-main" />

        {/* Illustration cards */}
        <div className="why-illustrations">
          <img
            ref={card1Ref}
            src={whyIllustration}
            alt="Task Management Illustration"
            className="why-illus"
          />
        </div>
      </div>

      {/* ── Right: text content ── */}
      <div className="why-right" ref={rightRef}>
        <h2 className="why-title">
          Why do you need<br />task management<br />software?
        </h2>
        <p className="why-desc">
          Do you waste time organizing sticky notes, searching your email and
          apps for to-dos, and figuring out what to work on first? Then you need
          one solution to prioritize your tasks, manage your time, and meet your
          deadlines.
        </p>
        <a href="#signup" className="learn-more">
          LEARN MORE
          <img src={arrowIcon} alt="" aria-hidden="true" className="learn-more-arrow" />
        </a>
      </div>

    </section>
  );
}
