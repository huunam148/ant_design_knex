import {list_all_customers} from '../controllers/customersController.js'

export default function(app) {
  app.route('/api/customers')
    .get(list_all_customers);
};