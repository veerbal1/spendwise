const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function seedUser(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE spendwise_users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
    `;

    const password = '12345678';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    console.log('Created user table');

    await client.sql`
        INSERT INTO spendwise_users(email, password, name) VALUES('veerbal@gmail.com', ${hashedPassword}, 'Veerbal Singh');
    `;
    console.log('Inserted user succesfully');
  } catch (error) {
    console.log('error');
  }
}

async function main() {
  const client = await db.connect();
  await seedUser(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
