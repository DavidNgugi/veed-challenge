import React, {useState} from 'react';

import { AiFillStar } from 'react-icons/ai';
import { convertToKMB } from "../Utils";

export const RepoCard = ({ repo, starRepo, isStarred }) => {
    const { id, name, description, language } = repo;
    const [stars, setStars] = useState(repo.stars);

    const handleStarRepo = (id) => {
        starRepo(id);
        setStars(repo.stars);
    };
    
    return (

        <div className="repo" data-testid="repo-card">
            <div className="repo-main">
                <h3 className="repo-name" data-testid="name">
                    {name}
                </h3>
                <div className="add-repo-star">
                    <AiFillStar
                        data-testid="star"
                        color={isStarred ? "#ffc107" : "#e4e5e9"}
                        size={25}
                        onClick={() => handleStarRepo(id)}
                    />
                </div>
            </div>
            <div className="repo-description" data-testid="description">
                <p>{description}</p>
            </div>
            <div className="repo-metadata">
                <div className="repo-language language" data-testid="language">{language ?? "Unknown"}</div>
                <div className="repo-star">
                    <AiFillStar
                        color={"#e4e5e9"}
                        size={25}
                    />
                    <span data-testid="stars">{convertToKMB(stars)}</span>
                </div>
            </div>
        </div>

    )
}

export default RepoCard;