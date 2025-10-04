const { Pool } = require("pg")
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// optional: quick self-test
(async () => {
  try {
    const r = await pool.query("SELECT NOW() AS now");
    console.log("✅ Postgres OK:", r.rows[0].now);
  } catch (e) {
    console.error("❌ Postgres failed:", e.message);
  }
})();

module.exports = pool