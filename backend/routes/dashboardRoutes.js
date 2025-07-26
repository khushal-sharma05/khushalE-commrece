import express from 'express';
import { getDashboardData,addReview} from '../controllers/dashboardController.js';
// import { getAllDashboardData } from '../controllers/allData.js'
const router = express.Router();

router.post("/review", addReview);
router.get('/dashboard', getDashboardData);
// router.get('/alldata', getAllDashboardData);


export default router;
