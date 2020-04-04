import patientData from '../../data/patients.json';
import { PatientNoSsn, Patient, NewPatient } from '../types';
import crypto from 'crypto';

const getPatientsNoSsn = (): PatientNoSsn[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatient ): Patient => {

    const newPatient = {
        id: crypto.randomBytes(20).toString('hex'),
        ...entry
    };
    
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatientsNoSsn,
    addPatient
};