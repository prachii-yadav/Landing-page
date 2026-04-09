import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

import iconTrack       from '../assets/benefits/Benefits_Icon_Track.svg';
import iconPrioritize  from '../assets/benefits/Benefits_Icon_Priotitize.svg';
import iconCollaborate from '../assets/benefits/Benefits_Icon_Collaborate.svg';

const CARDS = [
  {
    icon:  iconTrack,
    title: 'Keep tasks in one place',
    desc:  'Save time, avoid losing work and information, delegate, and track tasks to stay on schedule',
  },
  {
    icon:  iconPrioritize,
    title: 'Prioritize your work',
    desc:  'Tracking tasks allows everyone to understand which are more important or require more time, so',
  },
  {
    icon:  iconCollaborate,
    title: 'Improve collaboration',
    desc:  'Tracking tasks allows everyone to understand which are more important or require more time, so',
  },
];

function BenefitCard({ icon, title, desc, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.setProperty('--card-delay', `${index * 0.55}s`);
        el.classList.add('card-visible');
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div className="benefit-card" ref={ref}>
      <div className="benefit-icon">
        <img src={icon} alt={title} width="40" height="40" />
      </div>
      <h3 className="benefit-name">{title}</h3>
      <p className="benefit-desc">{desc}</p>
    </div>
  );
}

export default function Benefits() {
  const sectionRef = useIntersectionObserver(
    (el) => el.classList.add('section-visible'),
    { threshold: 0.1 }
  );

  return (
    <section className="benefits" id="benefits" ref={sectionRef}>
      <h2 className="benefits-title">
        Key benefits of using task<br />management software
      </h2>
      <div className="benefits-grid">
        {CARDS.map((card, i) => (
          <BenefitCard key={card.title} {...card} index={i} />
        ))}
      </div>
    </section>
  );
}
