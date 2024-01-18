import db from './db.js';

async function getCustomers() {
  try {
    const users = await db.select('*').from('Customers');
    return users;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

export {
  getCustomers,
}


