import postgres from 'postgres'

const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL
//console.log('connection string missing', connectionString)

if (!connectionString) {
	throw new Error('No database connection string found. Set NEON_DATABASE_URL or DATABASE_URL')
}

// Use ssl: { rejectUnauthorized: false } for environments like Neon where a TLS connection is required.
const sql = postgres(connectionString, {
	ssl: { rejectUnauthorized: false },
})

export { sql }
