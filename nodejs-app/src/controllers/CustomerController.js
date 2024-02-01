import {getCustomers, putCustomers, postCustomers, deleteCustomers} from '../models/customersModel.js';

class CustomersController {
  // [GET] /customers
  async show (req, res) {
    try {
      const customers = await getCustomers();
      res.status(200).json({
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
  // [PUT] /customers/:id
  async update (req, res) {
    try {
      const itemId = req.params.id;
      const { customer_name, email, phone_number } = req.body;
      const updatedItem = {
        customer_name,
        email,
        phone_number
      };
      const query = await putCustomers(itemId, updatedItem);
      res.status(200).json({
        message: 'PUT customers successfully',
        parameter: itemId,
        updatedItem: updatedItem,
        dataQuery: query,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: err.message || 'Error method PUT all customers',
      });
    }
  };

  // [POST] /customers
  async create (req, res) {
    try {
      const { customer_name, email, phone_number } = req.body;
      const updatedItem = {
        customer_name,
        email,
        phone_number
      };
      const query = await postCustomers(updatedItem);
      if (query.success) {
        res.status(200).json({
          message: 'Successfully added customers',
          updatedItem: updatedItem,
        });
      } else {
        res.status(400).json({
          status: false,
          message: query.message,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: err.message || 'Error method POST all customers',
      });
    }
  };

  // [DELETE] /customers/:id
  async destroy (req, res) {
    try {
      const itemId = req.params.id;
      const query = await deleteCustomers(itemId);
      res.status(200).json({
        message: 'Delete customers successfully',
        parameter: itemId,
        dataQuery: query,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: err.message || 'Error method Delete all customers',
      });
    }
  };
}

export default new CustomersController;
