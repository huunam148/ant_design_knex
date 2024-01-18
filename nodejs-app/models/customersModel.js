import db from './db.js';

async function getCustomers() {
  try {
    return await db.select('*').from('Customers');
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

export {
  getCustomers,
}


