import React from 'react';
import { CoursePart } from '../types';
import Part from '../components/Part';

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
    return (
        <div>
            <div>
                {courseParts.map(cp => 
                    <Part key={cp.name} part={cp} />
                )}
            </div>
        </div>
    )
};

export default Content;