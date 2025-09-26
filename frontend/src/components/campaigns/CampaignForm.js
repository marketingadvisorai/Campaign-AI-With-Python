'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

const initialValues = {
  name: '',
  objective: '',
  budget: 1000,
  status: 'draft',
};

export default function CampaignForm({ onSubmit, isSubmitting }) {
  const [values, setValues] = useState(initialValues);

  function updateValue(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(values);
    setValues(initialValues);
  }

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      <div className="field">
        <label htmlFor="name">Campaign name</label>
        <input id="name" name="name" value={values.name} onChange={updateValue} required />
      </div>
      <div className="field">
        <label htmlFor="objective">Objective</label>
        <input id="objective" name="objective" value={values.objective} onChange={updateValue} />
      </div>
      <div className="field">
        <label htmlFor="budget">Budget ($)</label>
        <input id="budget" name="budget" type="number" min="0" value={values.budget} onChange={updateValue} />
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={values.status} onChange={updateValue}>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Create campaign'}
      </button>
      <style jsx>{`
        .campaign-form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        label {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.8);
        }
        input,
        select {
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.3);
          padding: 0.6rem 0.8rem;
          background: rgba(15, 23, 42, 0.8);
          color: #f8fafc;
        }
        button {
          align-self: end;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          color: #0f172a;
          font-weight: 600;
          transition: transform 0.2s ease;
        }
        button:disabled {
          opacity: 0.6;
          cursor: progress;
        }
        button:not(:disabled):hover {
          transform: translateY(-1px);
        }
      `}</style>
    </form>
  );
}

CampaignForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

CampaignForm.defaultProps = {
  isSubmitting: false,
};
