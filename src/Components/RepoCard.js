import { AiFillStar } from 'react-icons/ai';
import { convertToKMB } from "../Utils";
import { Link } from "react-router-dom";

export const RepoCard = ({ repo, starRepo, isStarred }) => {
    const { id, name, html_url, description, language, stars } = repo;
    return (

        <div className="repo">
            <div className="repo-main">
                <h3 className="repo-name">
                    <Link to={{ pathname: html_url }} target="_blank">
                        {name}
                    </Link>
                </h3>
                <div className="add-repo-star">
                    <AiFillStar
                        color={isStarred ? "#ffc107" : "#e4e5e9"}
                        size={25}
                        onClick={() => starRepo(id)}
                    />
                </div>
            </div>
            <div className="repo-description">
                <p>{description}</p>
            </div>
            <div className="repo-metadata">
                <div className="repo-language language">{language ?? "Unknown"}</div>
                <div className="repo-star">
                    <AiFillStar
                        color={"#e4e5e9"}
                        size={25}
                    />
                    <span>{convertToKMB(stars)}</span>
                </div>
            </div>
        </div>

    )
}

export default RepoCard;