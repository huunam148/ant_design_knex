import knex from './db.js';

async function getCustomers() {
  try {
    const customers = await knex.select('*').from('Customers');
    return customers;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  } 
}

async function putCustomers(id, updatedItem) {
  try {
    const result = await knex('Customers')
      .where('customer_id', id)
      .update(updatedItem);
    if (result > 0) {
      console.log(`Customers: ${id} -> updated successfully`);
    } else {
      console.log(`Customers: ${id} -> not found`);
    }
  } catch (error) {
    console.error('Error putCustomers:', error.message);
  } 
}

async function postCustomers(updatedItem) {
  try {
    const { customer_name, email, phone_number } = updatedItem;

    const existingCustomer = await knex('Customers')
      .where('email', email)
      .first();

    if (existingCustomer) {
      throw new Error('Customer already exists!');
    }

    const [insertedCustomerId] = await knex('Customers')
      .insert({ customer_name, email, phone_number })
      .returning('customer_id');

    return {
      success: true,
      message: 'Customer added successfully',
      insertedCustomerId,
      updatedItem,
    };
  } catch (error) {
    console.error('Error postCustomers:', error.message);
    throw {
      success: false,
      message: 'Failed to add customer',
      error: error.message,
    };
  }
}

async function deleteCustomers(id) {
  try {
    const result = await knex('Customers')
      .where('customer_id', id)
      .del()
    if (result > 0) {
      console.log(`Customers: ${id} -> deleted successfully`);
    } else {
      console.log(`Customers: ${id} -> not found`);
    }
  } catch (error) {
    console.error('Error deleteCustomers:', error.message);
  } 
}

export {
  getCustomers,
  putCustomers,
  postCustomers,
  deleteCustomers,
}


