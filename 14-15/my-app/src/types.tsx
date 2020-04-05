interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescripton extends CoursePartBase {
    description: string;
}
  
interface CoursePartOne extends CoursePartDescripton {
    name: "Fundamentals";
}
  
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}
  
interface CoursePartThree extends CoursePartDescripton {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescripton {
    name: "This";
    info: string;
}
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;