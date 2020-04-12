import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient }from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log(patientService.getPatientsNoSsn());
    res.json(patientService.getPatientsNoSsn());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const patient = patientService.getPatient(id);
        res.json(patient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;