import React from 'react'
import { CoursePart } from '../types'

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

        switch (part.name) {
            case "Fundamentals":
                return(
                    <div>
                        <p>Name: {part.name} </p>
                        <p>Exercise count: {part.exerciseCount} </p>
                        <p>Description: {part.description} </p>
                    </div>
                );
            case "Using props to pass data":
                return(
                    <div>
                        <p>Name: {part.name} </p>
                        <p>Exercise count: {part.exerciseCount} </p>
                        <p>Group project count: {part.groupProjectCount} </p>
                    </div>
                );
            case "Deeper type usage":
                return(
                    <div>
                        <p>Name: {part.name} </p>
                        <p>Exercise count: {part.exerciseCount} </p>
                        <p>Description: {part.description} </p>
                        <p>Exercise submission link: {part.exerciseSubmissionLink}</p>
                    </div>
                );
            case "This":
                return(
                    <div>
                        <p>Name: {part.name} </p>
                        <p>Description: {part.description} </p>
                        <p>Exercise count: {part.exerciseCount} </p>
                        <p>Info: {part.info} </p>
                    </div>
                );
            default:
                return assertNever(part);
        }

}

export default Part;