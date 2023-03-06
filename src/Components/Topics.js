const Topics = ({ topics }) => {
    return (
        <div className="repo-topics">
            {topics.map((topic, index) => (
                <span className="topic" key={index}>
                    {topic}
                </span>
            ))};
        </div>
    )
};

export default Topics;