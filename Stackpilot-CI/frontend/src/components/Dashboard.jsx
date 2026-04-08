import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRepos = async () => {
    try {
      const res = await fetch(`${API_URL}/repos`);
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const triggerBuild = async (repoId) => {
    try {
      await fetch(`${API_URL}/build`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_id: repoId })
      });
      fetchRepos();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : 'unknown';
    return <span className={`badge ${s}`}>{status || 'No builds'}</span>;
  };

  if (loading) return <div style={{ color: 'var(--text-muted)' }}>Loading repositories...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <Link to="/add" className="btn btn-primary">+ Add New Repo</Link>
      </div>

      {repos.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>
          No repositories found. Add one to get started.
        </div>
      ) : (
        <div className="card-grid">
          {repos.map((repo) => (
            <div className="card" key={repo.id}>
              <div className="card-header">
                <div>
                  <h3 className="card-title">{repo.name}</h3>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer" className="card-subtitle" style={{ display: 'block', marginTop: '4px' }}>{repo.url}</a>
                </div>
                {getStatusBadge(repo.latest_build_status)}
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--panel-border)' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={() => triggerBuild(repo.id)}
                  disabled={repo.latest_build_status === 'Running'}
                >
                  {repo.latest_build_status === 'Running' ? 'Building...' : 'Trigger Build'}
                </button>
                <Link to={`/logs/${repo.id}`} className="btn" style={{ flex: 1, textAlign: 'center' }}>
                  View Logs
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
