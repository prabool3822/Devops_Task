const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Helper for simulating builds
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function simulateBuild(buildId) {
  const appendLog = async (logLine) => {
    await pool.query(
      "UPDATE builds SET logs = logs || $1 || E'\\n' WHERE id = $2",
      [logLine, buildId]
    );
  };

  try {
    await appendLog(`[${new Date().toISOString()}] Initializing build environment...`);
    await delay(1500);
    await appendLog(`[${new Date().toISOString()}] Cloning repository...`);
    await delay(2000);
    await appendLog(`[${new Date().toISOString()}] Installing dependencies...`);
    await delay(3000);
    await appendLog(`[${new Date().toISOString()}] Running test suite...`);
    await delay(2000);

    // 10% chance of random failure to simulate real environments
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      await appendLog(`[${new Date().toISOString()}] Tests passed successfully.`);
      await appendLog(`[${new Date().toISOString()}] Build completed successfully.`);
      await pool.query("UPDATE builds SET status = 'Success' WHERE id = $1", [buildId]);
    } else {
      await appendLog(`[${new Date().toISOString()}] Test suite failed. Exit code 1.`);
      await pool.query("UPDATE builds SET status = 'Failed' WHERE id = $1", [buildId]);
    }
  } catch (error) {
    await appendLog(`[${new Date().toISOString()}] System error: ${error.message}`);
    await pool.query("UPDATE builds SET status = 'Failed' WHERE id = $1", [buildId]);
  }
}

// Add a repository
app.post('/repos', async (req, res) => {
  const { name, url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO repos (name, url) VALUES ($1, $2) RETURNING *',
      [name, url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// List repositories
app.get('/repos', async (req, res) => {
  try {
    const reposResult = await pool.query(`
      SELECT r.*, 
             (SELECT status FROM builds b WHERE b.repo_id = r.id ORDER BY created_at DESC LIMIT 1) as latest_build_status 
      FROM repos r
      ORDER BY r.id DESC
    `);
    res.json(reposResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Trigger build
app.post('/build', async (req, res) => {
  const { repo_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO builds (repo_id, status) VALUES ($1, 'Running') RETURNING *",
      [repo_id]
    );
    const buildId = result.rows[0].id;
    
    // Kick off asynchronous build
    simulateBuild(buildId);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get logs for latest build of a repo
app.get('/logs/:repo_id', async (req, res) => {
  const { repo_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM builds WHERE repo_id = $1 ORDER BY created_at DESC LIMIT 1',
      [repo_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No builds found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
