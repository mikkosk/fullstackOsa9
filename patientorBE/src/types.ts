export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
    description: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
    employerName: string;
    type: "OccupationalHealthcare";
    sickLeave?: SickLeave;
}

export type Entry = 
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type PatientNoSsn = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NewEntry = Omit<HospitalEntry, "id"> | Omit<OccupationalHealthCareEntry, "id"> | Omit<HealthCheckEntry, "id">;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

