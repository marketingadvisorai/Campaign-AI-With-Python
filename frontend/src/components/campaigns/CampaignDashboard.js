'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createCampaign, getCampaigns } from '@/lib/api';
import CampaignList from './CampaignList';
import CampaignForm from './CampaignForm';

export default function CampaignDashboard() {
  const { data: campaigns, error, isLoading, mutate } = useSWR('/campaigns', () => getCampaigns());
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreate(values) {
    try {
      setIsSubmitting(true);
      await createCampaign(values);
      await mutate();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <header>
        <h1>Campaign overview</h1>
        <p>Monitor performance of your AI-generated campaigns and launch new experiments.</p>
      </header>
      <CampaignForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
      {isLoading && <p>Loading campaigns…</p>}
      {error && <p role="alert">Failed to load campaigns: {error.message}</p>}
      {campaigns && <CampaignList campaigns={campaigns.results || campaigns} />}
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        header h1 {
          margin: 0;
          font-size: 2.2rem;
        }
        header p {
          color: rgba(226, 232, 240, 0.7);
        }
      `}</style>
    </section>
  );
}
