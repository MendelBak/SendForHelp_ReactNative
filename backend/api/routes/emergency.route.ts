import express, { Router } from 'express';
const router: Router = express.Router();
import emergencyController from '../../controllers/emergency.controller';
import db from '../../index';

// Returns allEmergencies
router.get('/', async (req, res, next) => {
  const emergencies = emergencyController.getAllEmergencies();
  console.log('🚀 ~ router.get ~ emergencies ', emergencies);

  res.status(200).send(emergencies);

  //   db.collection('emergencies').findOne({}, function (err: any, result: any) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });

  // const emergencies = await test.getAllEmergencies();
  // console.log('🚀 ~ router.post ~ author', emergencies);

  //   res.status(201).json({
  //     message: 'Created successfully',
  //     author,
  //   });
});

// module.exports = router;
export default router;
