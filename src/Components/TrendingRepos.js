import React, { useState, useEffect, lazy, Suspense, useRef } from "react";

import * as ApiService from "../Services/ApiService";
import * as StorageService from "../Services/StorageService";
import { convertToKMB } from "../Utils";

import Loader from "./Loader";
import ErrorBoundary from "./ErrorBoundary";

const RepoList = lazy(() => import("./RepoList"));

const TrendingRepos = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [starred, setStarred] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageFilter, setLanguageFilter] = useState(null);

    const allRepos = useRef();
    const starredRepos = useRef();
    const allReposContent = useRef();
    const starredReposContent = useRef();

    useEffect(() => {
        ApiService.getTrendingRepos().then((repos) => setData(repos));
    }, []);

    useEffect(() => {
        if (data) {
            const languages = data.map((repo) => repo.language).filter((language) => language !== null);
            const uniqueLanguages = [...new Set(languages)];
            setLanguages(uniqueLanguages);
        }
    }, [data]);

    useEffect(() => {
        const starredReposJSON = StorageService.get("starredRepos");
        if (starredReposJSON) {
            const starredRepos = JSON.parse(starredReposJSON);
            setStarred(starredRepos);
        }
    }, []);

    const openTab = (event) => {
        const tabName = event.target.getAttribute('data-tab');
        if (tabName === 'all-repos') {
            allRepos.current.classList.add('active');
            starredRepos.current.classList.remove('active');
            allReposContent.current.classList.add('show');
            starredReposContent.current.classList.remove('show');
        } else {
            starredRepos.current.classList.add('active');
            allRepos.current.classList.remove('active');
            starredReposContent.current.classList.add('show');
            allReposContent.current.classList.remove('show');
        }
    }

    const starRepo = (id) => {
        const newData = [...data];
        const index = newData.findIndex((repo) => repo.id === id);
        newData[index].stars += 1;
        setData(newData);

        const newStarred = [...starred];
        const inStarredIndex = newStarred.findIndex((repo) => repo.id === id);

        if (newStarred.length === 0 || inStarredIndex === -1) {
            newStarred.push(data[index]);
            setStarred(newStarred);
            StorageService.appendToItem("starredRepos", data[index]);
        } else {
            newData[index].stars -= 1;
            setData(newData);
            newStarred.splice(inStarredIndex, 1);
            setStarred(newStarred);
            StorageService.removeFromItem("starredRepos", data[index]);
        }
    };

    const onSelectFilterLanguage = (event) => {
        const language = event.target.value;
        if (language === 'All') {
            setLanguageFilter(null);
            setFilteredData([]);
        }else {
            const filteredRepos = data.filter((repo) => `${repo.language}`.toLowerCase() === `${language}`.toLowerCase());
            setLanguageFilter(language);
            setFilteredData(filteredRepos);
        }
    };

    return (
        <div className="container" data-testid="repo-container">
            <h1>Trending Repositories</h1>
            <div className="repo-filters">
                <p>Filter By:</p>
                <div className="language-filter">
                    <p>Language:</p>
                    <select className="language-filter-select" onChange={onSelectFilterLanguage}>
                        <option value="All">All</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language}>
                                {language}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="tabs">
                <button className="tablinks active" data-tab="all-repos" ref={allRepos} onClick={openTab}>All Repos - <span className="repo-count">{convertToKMB(languageFilter ? filteredData.length : data.length)}</span></button>
                <button className="tablinks" data-tab="starred-repos" ref={starredRepos} onClick={openTab}>Starred Repos - <span className="repo-count">{convertToKMB(starred.length)}</span></button>
            </div>
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <div className="tabcontent show" ref={allReposContent}>

                        <RepoList data={languageFilter ? filteredData : data} starRepo={starRepo} starred={starred} />
                    </div>
                    <div className="tabcontent" ref={starredReposContent}>
                        <RepoList data={starred} starRepo={starRepo} starred={starred} />
                    </div>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default TrendingRepos;