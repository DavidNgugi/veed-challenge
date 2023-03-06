import React, { Suspense, lazy } from "react";
import ErrorBoundary from "./ErrorBoundary";

const RepoCard = lazy(() => import("./RepoCard"));

const RepoList = ({ data, starRepo, starred }) => {

    return (
        <div className="repo-list">
            <ErrorBoundary key="error-boundary" data-testid="error-boundary">
            {data && data.map((repo, index) => {
                const isStarred = starred.includes(repo);
                return (
                    <Suspense key={`suspense-${index}`} fallback={<RepoGlimmer />}>
                        <RepoCard
                            key={index}
                            repo={repo}
                            starRepo={starRepo}
                            isStarred={isStarred}
                        />
                    </Suspense>
                )
            })}
            </ErrorBoundary>
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