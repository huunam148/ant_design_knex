import customerController from '../controllers/CustomerController.js'

function routes(app){
  app.get('/customers', customerController.show);
  // app.put('/customers/:id', customerController.update);
  // app.post('/customers', customerController.create);
  // app.delete('/customers/:id', customerController.destroy);
}

export default routes;
