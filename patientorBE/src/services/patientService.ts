import patientData from '../../data/patients';
import { PatientNoSsn, Patient, NewPatient, NewEntry, Entry } from '../types';
import crypto from 'crypto';

const getPatient = ( id: string ): Patient => {
    const patient = patientData.find(p => p.id === id);
    if(!patient) {
        throw new Error('Patient missing');
    }
    return {...patient};
};

const getPatientsNoSsn = (): PatientNoSsn[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
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

const addEntry = ( entry: NewEntry, patientId: string ): Entry => {
    const patient = patientData.find(p => p.id === patientId);
    const newEntry = {...entry, id: crypto.randomBytes(20).toString('hex')};
    const updatePatient = patient?.entries.concat(newEntry);
    patientData.map(p => p.id === patientId ? updatePatient : p);

    return newEntry;
};

export default {
    getPatientsNoSsn,
    addPatient,
    getPatient,
    addEntry
};