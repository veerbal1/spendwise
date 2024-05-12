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

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE spendwise_categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES spendwise_users(id) NULL,
      name VARCHAR(255) NOT NULL
    );
    `;

    console.log('Created categories table');

    await client.sql`
    INSERT INTO spendwise_categories (user_id, name) VALUES
      ('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 'Groceries'),
      ('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 'Utilities'),
      ('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 'Entertainment'),
      ('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 'Travel'),
      ('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 'Dining Out'),
      ('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 'Healthcare'),
      ('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 'Transportation');
    `;
    console.log('Inserted Categories');
  } catch (error) {
    console.log('error');
  }
}

async function seedExpenses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
    CREATE TABLE spendwise_expenses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES spendwise_users(id),
      amount INTEGER NOT NULL,
      category_id UUID REFERENCES spendwise_categories(id) NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
    `;

    console.log('Created spendwise_expenses table');

    await client.sql`
    INSERT INTO spendwise_expenses (user_id, amount, category_id, description, date) VALUES
('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 5000, 'f359da84-06ec-43c5-801c-ca945eea7d99', 'Grocery shopping', '2023-12-01'),
('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 2000, '1814e6a2-98e4-4152-9668-2bd4e21af78f', 'Electricity bill', '2023-12-02'),
('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 1500, '2a5d94e6-2174-40f0-ad95-da7fcb8bc030', 'Monthly Netflix subscription', '2023-12-03'),
('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 800, '22c8c576-4f40-4902-aa80-3ec4fdda7292', 'Coffee with friends', '2023-12-04'),
('eecf405f-9a65-4ed8-9091-6c54ea6b4de1', 3000, '6bb3728f-060c-4bf4-9208-55b5ac14cfdd', 'Weekend getaway deposit', '2023-12-05');
    `;
    console.log('Inserted Expenses');
  } catch (error) {
    console.log('error');
  }
}

async function main() {
  const client = await db.connect();
  // await seedUser(client);
  // await seedCategories(client);
  await seedExpenses(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
