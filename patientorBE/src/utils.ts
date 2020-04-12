/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, NewEntry, Discharge, HealthCheckRating, SickLeave, Diagnosis } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    console.log(Object.values(HealthCheckRating));
    console.log(param);
    return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: any): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDate = (date: any): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const parseSsn = (ssn: any): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }

    return ssn;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }

    return occupation;
};

const parseSpecialist = (specialist: any): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }

    return specialist;
}; 

const parseDescription = (description: any): string => {
    if(!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }

    return description;
}; 

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }

    return gender;
};

const parseHealthCheckRating = (hcr: any): HealthCheckRating => {
    console.log(hcr);
    if((!hcr && hcr !== 0) || !isHealthCheckRating(hcr)) {
        throw new Error('Incorrect or missing healthcheck rating ' + hcr);
    }

    return hcr;
};

const parseDiagnosisCode = (dCode: any): Diagnosis['code'] => {
    if(!dCode || !isString(dCode)) {
        throw new Error('Faulty diganosis code' + dCode);
    }
    return dCode;
};

const parseDiagnosisCodes = (dCodes: any): Array<Diagnosis['code']> => {
    if(!dCodes || !Array.isArray(dCodes)) {
        throw new Error('Incorrect or missing diagnosis code array');
    }
    dCodes.forEach((d: any): Diagnosis['code'] => parseDiagnosisCode(d));

    return dCodes;
};

const parseDischarge = (discharge: any): Discharge => {
    if(!discharge || !discharge.dischargeDate || !discharge.criteria || !isDate(discharge.dischargeDate) || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge');
    }
    return {date: discharge.dischargeDate, criteria: discharge.criteria};
};

const parseSickleave = (sickleave: any): SickLeave => {
    if(!sickleave || !sickleave.startDate || !sickleave.endDate || !isDate(sickleave.startDate) || !isString(sickleave.endDate)) {
        throw new Error('Incorrect or missing sickleave');
    }
    return sickleave;
};

const parseEntryType = (type: any): "HealthCheck" | "Hospital"  | "OccupationalHealthcare" => {
    if(!type || !isString(type) || (type !== "HealthCheck" && type !== "Hospital" && type !== "OccupationalHealthcare")) {
        throw new Error('Incorrect or missing entry type ' + type);
    }
    return type;
};

const parseEntries = (entries: any): Entry[] => {
    if(!entries || !Array.isArray(entries)) {
        throw new Error('Incorrect or missing entry array');
    }
    entries.forEach((e: any) => parseEntryType(e.type));

    return entries;
};


export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries),
    };
};

export const toNewEntry = (object: any): NewEntry => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    if(!object || !object.type || !isString(object.type)) {
        throw new Error('Entry or its type is missing');
    }

    const type = parseEntryType(object.type);

    const entryBase = {
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        description: parseDescription(object.description),
    };

    let entry;
    if(object.diagnosisCodes) {
        const diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        entry = {...entryBase, diagnosisCodes};
    }  else {
        entry = entryBase;
    }

    switch(type) {
        case "HealthCheck":
            return {
                ...entry,
                type:"HealthCheck",
                healthCheckRating: parseHealthCheckRating(Number(object.healthCheckRating))
            };
        case "Hospital":
            return {
                ...entry,
                type: "Hospital",
                discharge: parseDischarge(object.discharge)
            };
        case "OccupationalHealthcare":
            if(object.sickLeave) {
                return {
                    ...entry,
                    type: "OccupationalHealthcare",
                    sickLeave: parseSickleave(object.sickLeave),
                    employerName: parseName(object.employerName)
                };
            } else 
            return {
                ...entry,
                type: "OccupationalHealthcare",
                employerName: parseName(object.employerName)
            };
        default:
            return assertNever(type);
    }
};
