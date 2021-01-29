import express, { Router } from 'express';
const router: Router = express.Router();
import test from '../../controllers/emergency.controller';

router.get('/', async (req, res, next) => {
  console.log('this is the emergency controller imported as  "test" ->', test);
  res.status(200).send();

  //   db.collection('emergencies').findOne({}, function (err: any, result: any) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });

  //   const author = await test.getAllEmergencies();
  //   console.log('🚀 ~ router.post ~ author', author);

  //   res.status(201).json({
  //     message: 'Created successfully',
  //     author,
  //   });
});

// module.exports = router;
export default router;
