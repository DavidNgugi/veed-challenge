import React from 'react';

const Topics = ({ topics }) => {
    return (
        <div className="repo-topics" data-testid="topics">
            {topics && topics.map((topic, index) => (
                <span className="topic" data-testid={`topic-${index}`} key={index}>
                    {topic}
                </span>
            ))};
        </div>
    )
};

export default Topics;