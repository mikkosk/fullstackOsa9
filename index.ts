
import express = require('express');
import { parseArguments, calculateBmi } from './bmiCalculator';
import { calculate, parseArgumentsExer } from './exerciseCalculator';

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((_err, _req, res, _next) =>  {
    res.status(500).send('Something is not right!');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const { height, weight } = parseArguments(['','',req.query.height, req.query.weight]);
        const bmi = calculateBmi(height, weight);
        const json = {
            weight,
            height,
            bmi
        };
        res.json(json);
    } catch (e) {
        res.status(400).json({error: "malformatted parameters"});
    }
    
});

app.post('/exercises', (req, res) => {
    const values = req.body;

    if(!values.daily_exercises || !values.target) {
        res.status(400).json({error: "parameters missing"});
    }

    const valuesArray = ['','', ...values.daily_exercises, values.target];

    try {
        const { exercise, target } = parseArgumentsExer(valuesArray);
        const result = calculate(exercise, target);
        res.json(result);
    } catch(e) {
        if(e.message === 'Not enough args') {
            res.status(400).json({error: "parameters missing"});
        } else {
            res.status(400).json({error: "malformatted parameters"});
        }
    }

  });

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Running. Port: ${PORT}`);
});