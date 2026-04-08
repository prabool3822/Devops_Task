import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function BuildLogsViewer() {
  const { repoId } = useParams();
  const [logs, setLogs] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const logsEndRef = useRef(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/logs/${repoId}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || 'No logs available.');
        setStatus(data.status);
      } else {
        setLogs('Build not found or no logs available.');
      }
    } catch (err) {
      console.error(err);
      setLogs('Error fetching logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    
    // Polling
    const interval = setInterval(() => {
      if (status === 'Running' || status === '') {
        fetchLogs();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [repoId, status]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : 'unknown';
    return <span className={`badge ${s}`}>{status || 'Unknown'}</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Build Logs</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Status:</span>
            {getStatusBadge(status)}
          </div>
        </div>
        <Link to="/" className="btn">Back to Dashboard</Link>
      </div>

      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
          <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            bash - build_output.log
          </span>
        </div>
        <div className="terminal-body">
          {loading ? 'Loading logs...' : logs}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
}

export default BuildLogsViewer;
