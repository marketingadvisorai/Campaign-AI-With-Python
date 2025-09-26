'use client';

import PropTypes from 'prop-types';

export default function CampaignList({ campaigns }) {
  if (!campaigns.length) {
    return <p>No campaigns yet. Create your first campaign above.</p>;
  }

  return (
    <div className="campaign-list">
      {campaigns.map((campaign) => (
        <article key={campaign.id} className="campaign-card">
          <header>
            <h2>{campaign.name}</h2>
            <span className={`status status--${campaign.status}`}>{campaign.status}</span>
          </header>
          <dl>
            <div>
              <dt>Objective</dt>
              <dd>{campaign.objective || '—'}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>${Number(campaign.budget || 0).toLocaleString()}</dd>
            </div>
            <div>
              <dt>Dates</dt>
              <dd>
                {campaign.start_date || 'TBD'} → {campaign.end_date || 'TBD'}
              </dd>
            </div>
          </dl>
        </article>
      ))}
      <style jsx>{`
        .campaign-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .campaign-card {
          border-radius: 16px;
          padding: 1.5rem;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 10px 30px rgba(8, 47, 73, 0.2);
        }
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        h2 {
          margin: 0;
          font-size: 1.4rem;
        }
        .status {
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          padding: 0.3rem 0.6rem;
          border-radius: 9999px;
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
        }
        dl {
          margin: 0;
          display: grid;
          gap: 0.75rem;
        }
        dt {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(148, 163, 184, 0.8);
        }
        dd {
          margin: 0;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

CampaignList.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      objective: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
    })
  ),
};

CampaignList.defaultProps = {
  campaigns: [],
};
