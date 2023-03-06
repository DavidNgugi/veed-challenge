import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import RepoCard from "../RepoCard";

describe("RepoCard", () => {

    it("should render RepoCard", async () => {
        const repo = {
            id: 1,
            name: "test",
            html_url: "test",
            description: "test description",
            language: "JavaScript",
            stars: 10500
        };
        const starRepo = jest.fn((repo) => Promise.resolve());
        const isStarred = false;
        
        render(<RepoCard repo={repo} starRepo={starRepo} isStarred={isStarred} />);
        expect(screen.getByTestId("name")).toHaveTextContent(repo["name"]);
        expect(screen.getByTestId("stars")).toHaveTextContent("10.5k");
        expect(screen.getByTestId("description")).toHaveTextContent(repo["description"]);
        expect(screen.getByTestId("language")).toHaveTextContent(repo["language"]);
    });

    it("should increase star count when star button is clicked", () => {
        let repo = {
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

        const starsElement = screen.getByTestId("stars");
        expect(starsElement).toHaveTextContent("1.0k");

        const starButton = screen.getByTestId("star");
        fireEvent.click(starButton);

        expect(starRepo).toHaveBeenCalledTimes(1);
        expect(starsElement).toHaveTextContent("1.1k");
    });

    it("should reduce count when unstar button is clicked", () => {
        let repo = {
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

        const starsElement = screen.getByTestId("stars");
        expect(starsElement).toHaveTextContent("1.0k");
        
        const starButton = screen.getByTestId("star");
        fireEvent.click(starButton);

        expect(starRepo).toHaveBeenCalledTimes(1);
        expect(repo.stars).toBe(900);

        expect(starsElement).toHaveTextContent("900");
    });
});