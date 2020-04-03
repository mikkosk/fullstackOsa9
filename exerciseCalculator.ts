interface Result {
    periodLength: number,
    trainingDays: number,
    success: Boolean,
    rating: rate,
    ratingDescription: String,
    target: number,
    average: number
}

interface Arguments {
    exercise: Array<number>,
    target: number
}
type rate = 1 | 2 | 3 | 4;

const parseArgumentsExer = (args: Array<String>): Arguments => {
    if (args.length < 4) throw new Error('Not enough args');
    const values = args.slice(2, args.length - 1);
    const workouts = values.map(n => !isNaN(Number(n)) ? Number(n) : null);
    const target = args[args.length - 1]
    if(values.length !== workouts.length || isNaN(Number(target))) {
        throw new Error('Not all arguments were numbers')
    }
    return ({
        exercise: workouts,
        target: Number(target)
    })
}

const ratingDescription = (rate: rate): String => {
    switch(rate) {
        case 1:
            return 'Not good';
        case 2:
            return 'Could be better';
        case 3:
            return 'Nice work';
        case 4:
            return 'Oh yeah!';
        default:
            throw new Error('Not on the scale')
    }
}

const rateNumber = (a: number, t: number): rate => {
    const total = a / t;
    if(total > 2) {
        return 4;
    } else if (total > 1) {
        return 3;
    } else if (total < 0.5) {
        return 1;
    } else {
        return 2;
    }
}

const calculate = (e: Array<number>, target: number): Result => {
    const periodLength = e.length;
    const trainingDays = e.filter(n => n !== 0).length;
    const average = e.reduce((total, number) => total + number) / periodLength;
    const success = average >= target;
    const rate = rateNumber(average, target);
    const result = {
        periodLength,
        trainingDays,
        success,
        rating: rate,
        ratingDescription: ratingDescription(rate),
        target,
        average
    }
    return result;
}

try {
    const { exercise, target } = parseArgumentsExer(process.argv);
    console.log(calculate(exercise, target));
} catch (e) {
    console.log('That did not go too well. Check this: ' + e.message)
}