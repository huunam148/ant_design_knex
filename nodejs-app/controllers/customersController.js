import {getCustomers} from '../models/customersModel.js';

async function list_all_customers (req, res) {
  try {
    const customers = await getCustomers();
    res.json({
      message: 'Get customers successfully',
      data: customers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: err.message || 'Error method GET all customers',
    });
  }
};

export {
  list_all_customers,
}