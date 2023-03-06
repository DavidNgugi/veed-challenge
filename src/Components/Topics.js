const Topics = ({ topics }) => {
    return (
        <div className="repo-topics">
            {topics && topics.map((topic, index) => (
                <span className="topic" data-testid="topic" key={index}>
                    {topic}
                </span>
            ))};
        </div>
    )
};

export default Topics;