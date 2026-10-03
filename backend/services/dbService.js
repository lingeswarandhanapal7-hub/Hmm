import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

let pool = null;
let isConnected = false;

/**
 * Initializes MySQL Connection Pool and creates required tables if they don't exist.
 */
export async function initializeDatabase() {
  let host = process.env.MYSQLHOST || process.env.DB_HOST || 'localhost';
  let port = Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306;
  let user = process.env.MYSQLUSER || process.env.DB_USER || 'root';
  let password = process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || process.env.DB_PASSWORD || '';
  let database = process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'hmm_db';

  // Support direct connection URI (Railway, TiDB, Aiven)
  const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
  if (connectionUrl) {
    try {
      const parsedUrl = new URL(connectionUrl);
      host = parsedUrl.hostname || host;
      port = Number(parsedUrl.port) || port;
      user = parsedUrl.username || user;
      password = decodeURIComponent(parsedUrl.password) || password;
      database = parsedUrl.pathname.replace(/^\//, '') || database;
    } catch (e) {
      console.warn('[DB Service] Could not parse MYSQL_URL, using individual parameters');
    }
  }

  try {
    // 1. Initial connection without database to ensure database exists
    const initialConn = await mysql.createConnection({
      host,
      port,
      user,
      password
    });

    await initialConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await initialConn.end();

    // 2. Create connection pool to the database
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const testConn = await pool.getConnection();
    testConn.release();

    // 3. Create tables
    await createTables();

    isConnected = true;
    console.log(`[MySQL DB] Successfully connected to MySQL database: "${database}" on ${host}:${port}`);
    return true;
  } catch (err) {
    isConnected = false;
    console.warn(`[MySQL DB Notice] Could not connect to MySQL (${err.message}). Set DB_PASSWORD in backend/.env to connect.`);
    return false;
  }
}

/**
 * Creates users and documents tables
 */
async function createTables() {
  if (!pool) return;

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const createDocsTable = `
    CREATE TABLE IF NOT EXISTS documents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      filename VARCHAR(255) NOT NULL,
      document_type VARCHAR(100) DEFAULT 'general',
      language VARCHAR(10) NOT NULL,
      summary TEXT,
      key_facts JSON,
      next_steps JSON,
      urgency VARCHAR(50),
      grounded_reference TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await pool.query(createUsersTable);
  await pool.query(createDocsTable);
}

/**
 * Register a new user in MySQL
 */
export async function registerUser(name, email, password) {
  if (!pool || !isConnected) {
    throw new Error('Database is currently not connected. Please verify MySQL credentials in backend/.env');
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  // Check if user already exists
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [cleanEmail]);
  if (existing.length > 0) {
    const error = new Error('An account with this email address already exists. Please log in.');
    error.statusCode = 409;
    throw error;
  }

  // Hash password with salt
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [cleanName, cleanEmail, passwordHash]
  );

  return {
    id: result.insertId,
    name: cleanName,
    email: cleanEmail,
    initials: getInitials(cleanName)
  };
}

/**
 * Authenticate a user in MySQL
 */
export async function authenticateUser(email, password) {
  if (!pool || !isConnected) {
    throw new Error('Database is currently not connected. Please verify MySQL credentials in backend/.env');
  }

  const cleanEmail = email.trim().toLowerCase();

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
  if (rows.length === 0) {
    const error = new Error('Invalid email or password. Please check your credentials.');
    error.statusCode = 401;
    throw error;
  }

  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    const error = new Error('Invalid email or password. Please check your credentials.');
    error.statusCode = 401;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    initials: getInitials(user.name)
  };
}

/**
 * Save simplified document log to MySQL
 */
export async function saveDocumentRecord({
  userId = null,
  filename,
  documentType,
  language,
  summary,
  keyFacts = [],
  nextSteps = [],
  urgency = 'Notice',
  groundedReference = ''
}) {
  if (!pool || !isConnected) return null;

  try {
    const [result] = await pool.query(
      `INSERT INTO documents 
        (user_id, filename, document_type, language, summary, key_facts, next_steps, urgency, grounded_reference)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        filename,
        documentType,
        language,
        summary,
        JSON.stringify(keyFacts),
        JSON.stringify(nextSteps),
        urgency,
        groundedReference
      ]
    );

    return result.insertId;
  } catch (err) {
    console.warn('[MySQL Save Record Error]:', err.message);
    return null;
  }
}

/**
 * Retrieve document history for a user
 */
export async function getUserDocuments(userId) {
  if (!pool || !isConnected || !userId) return [];

  try {
    const [rows] = await pool.query(
      'SELECT id, filename, document_type, language, summary, urgency, created_at FROM documents WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
      [userId]
    );
    return rows;
  } catch (err) {
    console.warn('[MySQL History Error]:', err.message);
    return [];
  }
}

/**
 * Health status helper
 */
export function getDbStatus() {
  return {
    connected: isConnected,
    type: 'MySQL Server 8.0'
  };
}

function getInitials(fullName) {
  if (!fullName) return 'U';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
