import { useState } from 'react';

const API_URL = 'http://localhost:5000/api/signup';

const validators = {
  email(v) {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Please enter a valid email address.';
    return null;
  },
};

export function useSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function validate(value) {
    const err = validators.email(value) ?? '';
    setError(err);
    return err === '';
  }

  function handleChange(e) {
    setEmail(e.target.value);
    if (touched) validate(e.target.value);
  }

  function handleBlur() {
    setTouched(true);
    validate(email);
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setTouched(true);
    setStatus(null);
    if (!validate(email)) return false;

    setLoading(true);
    try {
      const res  = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: email.split('@')[0], email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: `🎉 You're in! Your coupon code: ${data.coupon}` });
        setEmail('');
        setTouched(false);
        return true;
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Could not connect to the server. Please try again.' });
    } finally {
      setLoading(false);
    }
    return false;
  }

  return {
    email,
    error,
    touched,
    status,
    loading,
    handleChange,
    handleBlur,
    handleSubmit
  };
}
