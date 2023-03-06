import React, { useState, useEffect, lazy, Suspense, useRef, useMemo } from "react";

import * as ApiService from "../Services/ApiService";
import * as StorageService from "../Services/StorageService";

import Loader from "./Loader";
import ErrorBoundary from "./ErrorBoundary";

const RepoList = lazy(() => import("./RepoList"));

const TrendingRepos = () => {
    const [data, setData] = useState([]);
    const [starred, setStarred] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageFilter, setLanguageFilter] = useState(null);
    
    const languageRef = useRef();
    const allRepos = useRef();
    const starredRepos = useRef();
    const allReposContent = useRef();
    const starredReposContent = useRef();


    useEffect(() => {
        const filter_params = languageFilter ? `&language=${languageFilter}` : "";
        ApiService.getTrendingRepos(filter_params).then((repos) => setData(repos));
    }, [languageFilter]);

    useEffect(() => {
        if(data){
            const languages = data.map((repo) => repo.language).filter((language) => language !== null);
            const uniqueLanguages = [...new Set(languages)];
            setLanguages(uniqueLanguages);
        }
    }, [data]);

    // useEffect(() => {
    //     const filter_params = languageFilter ? `&language=${languageFilter}` : "";
    //     ApiService.getTrendingRepos(filter_params).then((repos) => setData(repos));
    // }, [languageFilter]);

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
        newData[index].stars += 1000;
        setData(newData);
        
        const newStarred = [...starred];
        const inStarredIndex = newStarred.findIndex((repo) => repo.id === id);

        if (newStarred.length === 0 || inStarredIndex === -1) {
            newStarred.push(data[index]);
            setStarred(newStarred);
            StorageService.appendToItem("starredRepos", data[index]);
        } else {
            newData[index].stars -= 1000;
            setData(newData);
            newStarred.splice(inStarredIndex, 1);
            setStarred(newStarred);
            StorageService.removeFromItem("starredRepos", data[index]);
        }
    };

    const onSelectFilterLanguage = (e) => {
        const language = e.target.value;
        console.log('language', language);
        setLanguageFilter(language);
    };

    const clearLanguageFilter = () => {
        setLanguageFilter(null);
    };

    return (
        <div className="container">
            <h1>Trending Repositories</h1>
            <div className="repo-filters">
                <p>Filter By:</p>
                <div className="language-filter">
                    <p>Language:</p>
                    <select className="language-filter-select" >
                        <option value="all" onClick={clearLanguageFilter}>All</option>
                        {languages.map((language, index) => (
                            <option key={index} value={language} ref={languageRef} onClick={onSelectFilterLanguage}>
                                {language}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <ErrorBoundary>
                <div className="tabs">
                    <button className="tablinks active" data-tab="all-repos" ref={allRepos} onClick={openTab}>All Repos</button>
                    <button className="tablinks" data-tab="starred-repos" ref={starredRepos} onClick={openTab}>Starred Repos</button>
                </div>

                <div className="tabcontent show" ref={allReposContent}>
                    <Suspense fallback={<Loader />}>
                        <RepoList data={data} starRepo={starRepo} starred={starred} />
                    </Suspense>
                </div>
                <div className="tabcontent" ref={starredReposContent}>
                    <Suspense fallback={<Loader />}>
                        <RepoList data={starred} starRepo={starRepo} starred={starred} />
                    </Suspense>
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default TrendingRepos;