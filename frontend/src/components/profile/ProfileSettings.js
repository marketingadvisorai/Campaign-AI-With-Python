'use client';

import { useEffect, useState } from 'react';
import { getCurrentProfile, updateProfile } from '@/lib/api';

const initialState = {
  company: '',
  job_title: '',
  avatar_url: '',
};

export default function ProfileSettings() {
  const [values, setValues] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getCurrentProfile();
        setValues({
          company: data.company || '',
          job_title: data.job_title || '',
          avatar_url: data.avatar_url || '',
        });
      } catch (error) {
        setMessage({ type: 'error', text: error.message });
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsSaving(true);
      await updateProfile(values);
      setMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="profile-settings">
      <h1>Account profile</h1>
      <p>Keep your organisation details in sync with downstream integrations.</p>
      {message && <p className={`message message--${message.type}`}>{message.text}</p>}
      {isLoading ? (
        <p>Loading profile…</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" value={values.company} onChange={handleChange} />

          <label htmlFor="job_title">Job title</label>
          <input id="job_title" name="job_title" value={values.job_title} onChange={handleChange} />

          <label htmlFor="avatar_url">Avatar URL</label>
          <input id="avatar_url" name="avatar_url" value={values.avatar_url} onChange={handleChange} />

          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      )}
      <style jsx>{`
        .profile-settings {
          display: grid;
          gap: 1.5rem;
          max-width: 560px;
        }
        form {
          display: grid;
          gap: 1rem;
          padding: 2rem;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(148, 163, 184, 0.8);
        }
        input {
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.3);
          padding: 0.75rem 1rem;
          background: rgba(15, 23, 42, 0.8);
          color: #f8fafc;
        }
        button {
          justify-self: flex-start;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #34d399 0%, #0ea5e9 100%);
          color: #0f172a;
          font-weight: 600;
        }
        .message {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-weight: 500;
        }
        .message--success {
          background: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }
        .message--error {
          background: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }
      `}</style>
    </section>
  );
}
