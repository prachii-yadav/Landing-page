import { useEffect, useRef } from 'react';

import Logos from './Logos';
import { useSignup } from '../hooks/useSignup';

// Combined shapes decoration (blue + gold + navy circles)
import heroShapes from '../assets/hero/Hero_Shapes.svg';

// Illustration cards
import card1Img   from '../assets/hero/Hero_Illustration_Card-1.svg'; // profile/task card
import card2Img   from '../assets/hero/Hero_Illustration_Card-2.svg'; // analytics chart
import card3Img   from '../assets/hero/Hero_Illustration_Card-3.svg'; // RANK/PROJECTS
import card4Img   from '../assets/hero/Hero_Illustration_Card-4.svg'; // numbered task list

export default function Hero() {
  const {
    email,
    error,
    touched,
    status,
    loading,
    handleChange,
    handleBlur,
    handleSubmit
  } = useSignup();

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useEffect(() => {
    // Switch each card to infinite float after its entrance animation ends.
    // Negative delays stagger the float phase so cards never move in sync.
    const timings = [
      { ref: card3Ref, startMs: 3100, duration: '6.8s', delay: '-1.2s' },
      { ref: card4Ref, startMs: 3600, duration: '8.0s', delay: '-3.8s' },
      { ref: card2Ref, startMs: 4100, duration: '6.2s', delay: '-1.8s' },
      { ref: card1Ref, startMs: 4600, duration: '7.0s', delay: '0s'    },
    ];
    timings.forEach(({ ref, startMs, duration, delay }) => {
      setTimeout(() => {
        const el = ref.current;
        if (!el) return;
        el.style.animationDuration = duration;
        el.style.animationDelay    = delay;
        el.classList.add('hero-card-floating');
      }, startMs);
    });
  }, []);

  return (
    <section className="hero" id="hero">
      {/* ── Hero topbar spanning entire width ── */}
      <div className="hero-topbar">
        <div className="hero-brand">TaskMan</div>
        <a href="#signup" className="btn btn-outline hero-top-button">Try free</a>
      </div>

      {/* ── Left: white content panel ── */}
      <div className="hero-left">
        <h1 className="hero-title">
          Task Management<br />And Lists Tool
        </h1>
        <p className="hero-subtitle">
          There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by
          injected humour.
        </p>
        <form className="hero-form" onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 220 }}>
            <input
              type="email"
              className={`hero-input${error && touched ? ' invalid' : ''}`}
              placeholder="Name@company.com"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="field-error" role="alert" style={{marginLeft: '12px'}}>{touched ? error : ''}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: '54px' }}>
              {loading ? 'Sending…' : 'Try for free'}
            </button>
            <span className="field-error" style={{visibility: 'hidden'}}>spacer</span>
          </div>
        </form>
        {status && (
          <div className={`form-message ${status.type}`} role="alert" style={{ marginTop: '12px', maxWidth: '420px' }}>
            {status.message}
          </div>
        )}

        {/* Logos directly under form on the left side */}
        <Logos />
      </div>

      {/* ── Right: dark navy panel ── */}
      <div className="hero-right">


        {/* Decorative shapes cluster (blue + gold + navy) */}
        <img src={heroShapes} alt="" aria-hidden="true" className="hero-shape" />
        {/* Layer 4 (front): Illustration cards cluster */}
        <div className="hero-cards-cluster">

          {/* Card-1: profile/task card — upper right, most prominent */}
          <img ref={card1Ref} src={card1Img} alt="Task card"        className="hero-card hero-card-1" />

          {/* Card-2: analytics chart — middle, wide */}
          <img ref={card2Ref} src={card2Img} alt="Analytics chart"  className="hero-card hero-card-2" />

          {/* Card-4: numbered task list — right side */}
          <img ref={card4Ref} src={card4Img} alt="Task list"        className="hero-card hero-card-4" />

          {/* Card-3: RANK/PROJECTS — lower left, partially behind */}
          <img ref={card3Ref} src={card3Img} alt="Rankings card"    className="hero-card hero-card-3" />

        </div>
      </div>

    </section>
  );
}
