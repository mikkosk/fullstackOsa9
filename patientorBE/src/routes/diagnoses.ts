import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log(diagnoseService.getDiagnoses());
    res.json(diagnoseService.getDiagnoses());
});

export default router;