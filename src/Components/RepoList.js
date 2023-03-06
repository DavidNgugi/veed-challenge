import { Suspense, lazy } from "react";

const RepoCard = lazy(() => import("./RepoCard"));

const RepoList = ({ data, starRepo, starred }) => {

    return (
        <div className="repo-list">
            {data.map((repo, index) => {
                const isStarred = starred.includes(repo);
                return (
                    <Suspense fallback={<RepoGlimmer />}>

                        <RepoCard
                            key={index}
                            repo={repo}
                            starRepo={starRepo}
                            isStarred={isStarred}
                        />
                    </Suspense>
                )
            })}
        </div>
    );
}

const RepoGlimmer = () => {
    return (
        <div className="glimmer-repo">
            <div className="glimmer-line" />
            <div className="glimmer-line" />
            <div className="glimmer-line" />
        </div>
    );
}

export default RepoList;