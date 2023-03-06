import React from "react";
import { render, screen } from '@testing-library/react';
import RepoCard from "../RepoCard";

describe("RepoCard", () => {

    it("should render RepoCard", () => {
        const repo = {
            id: 1,
            name: "test",
            html_url: "test",
            description: "test description",
            language: "JavaScript",
            stars: 1000
        };
        const starRepo = jest.fn();
        const isStarred = false;
        
        render(<RepoCard repo={repo} starRepo={starRepo} isStarred={isStarred} />);
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("1k")).toBeInTheDocument();
        expect(screen.getByText("test description")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });

    it("should increase star count when star button is clicked", () => {
        const repo = {
            id: 1,
            name: "test",
            html_url: "test",
            description: "test description",
            language: "JavaScript",
            stars: 1000
        };
        const starRepo = jest.fn( () => {
            repo.stars = 1100;
        });
        const isStarred = false;
        
        render(<RepoCard repo={repo} starRepo={starRepo} isStarred={isStarred} />);
        expect(screen.getByText("1k")).toBeInTheDocument();
        screen.getByText("Star").click();
        expect(starRepo).toHaveBeenCalledTimes(1);
        expect(screen.getByText("1.1k")).toBeInTheDocument();
    });

    it("should reduce count when unstar button is clicked", () => {
        const repo = {
            id: 1,
            name: "test",
            html_url: "test",
            description: "test description",
            language: "JavaScript",
            stars: 1000
        };
        const starRepo = jest.fn( () => {
            repo.stars = 900;
        });
        const isStarred = true;
        
        render(<RepoCard repo={repo} starRepo={starRepo} isStarred={isStarred} />);
        expect(screen.getByText("1k")).toBeInTheDocument();
        screen.getByText("Unstar").click();
        expect(starRepo).toHaveBeenCalledTimes(1);
        expect(screen.getByText("900")).toBeInTheDocument();
    });
});