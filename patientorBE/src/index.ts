import express from 'express';
import diagnoseRouter from './routes/diagnosis';
import patientRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3001;

app.get('/api/ping', (_req, _res) => {
    console.log('Pong');
});

app.use('/api/patients', patientRouter); 

app.use('/api/diagnosis', diagnoseRouter);

app.listen(PORT, () => {
    console.log(`Server running. Port: ${PORT}`);
});