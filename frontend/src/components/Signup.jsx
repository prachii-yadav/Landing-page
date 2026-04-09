import { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useSignup } from '../hooks/useSignup';
import signupShape from '../assets/signup/Signup_Shape.svg';

export default function Signup() {
  const {
    email,
    error,
    touched,
    status,
    loading,
    handleChange,
    handleBlur,
    handleSubmit: baseHandleSubmit
  } = useSignup();

  const formRef = useRef(null);

  const innerRef = useRef(null);

  const sectionRef = useIntersectionObserver(
    (el) => {
      el.classList.add('section-visible');
      // Shape slides in from left, content fades from right
      el.querySelector('.signup-shape')?.classList.add('shape-visible');
      setTimeout(() => {
        innerRef.current?.classList.add('content-visible');
      }, 200);
    },
    { threshold: 0.15 }
  );

  async function handleSubmit(e) {
    const success = await baseHandleSubmit(e);
    if (success) {
      formRef.current?.classList.add('submitted');
      setTimeout(() => formRef.current?.classList.remove('submitted'), 400);
    }
  }

  return (
    <section className="signup" id="signup" ref={sectionRef}>
      <img src={signupShape} alt="" aria-hidden="true" className="signup-shape" />

      <div className="signup-inner" ref={innerRef}>
        <h2 className="signup-title">Get better work done</h2>
        <p className="signup-subtitle">
          See why millions of people across 195<br />countries use TaskMan.
        </p>

        <form className="signup-form" onSubmit={handleSubmit} noValidate ref={formRef}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, maxWidth: 340 }}>
            <input
              type="email"
              className={`signup-input${error && touched ? ' invalid' : ''}`}
              placeholder="Name@company.com"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!(error && touched)}
            />
            <span className="field-error" role="alert">{touched ? error : ''}</span>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending…' : 'Try for free'}
          </button>
        </form>

        {status && (
          <div className={`form-message ${status.type}`} role="alert" aria-live="polite">
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
}
