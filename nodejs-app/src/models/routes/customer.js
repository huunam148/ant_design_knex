import express from "express";
import customerController from '../controllers/CustomerController.js'

const router = express.Router();

router.use('/update', customerController.update);
router.use('/', customerController.show);

export default router;
