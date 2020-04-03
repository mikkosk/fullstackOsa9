interface ArgValues {
    height: number,
    weight: number
}

const parseArguments = (args: Array<String>): ArgValues => {
    if (args.length > 4) throw new Error('Toom many args');
    if (args.length < 4) throw new Error('Not enough args');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {

        return {
          height: Number(args[2]),
          weight: Number(args[3])
        }
      } else {
        throw new Error('Arguments must be numbers');
      }
}

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height / 100) ^ 2)
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 25) {
        return 'Overweight';
    } else {
        return 'Normal (healthy weight)';
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log('Current BMI is: ' + calculateBmi(height, weight));
} catch (e) {
    console.log('Something went wrong: ' + e.message);
}
