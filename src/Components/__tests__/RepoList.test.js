import React from "react";
import { render, screen } from '@testing-library/react';
import RepoList from "../RepoList";

describe("RepoList", () => {

    it("should render RepoList", () => {
        const data = [
            {
                id: 1,
                name: "test",
                html_url: "test",
                description: "test description",
                language: "JavaScript",
                stars: 1000
            },
            {
                id: 2,
                name: "test2",
                html_url: "test2",
                description: "test description2",
                language: "JavaScript",
                stars: 2000
            }
        ];
        const starRepo = jest.fn();
        const starred = [];

        render(<RepoList data={data} starRepo={starRepo} starred={starred} />);
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("1k")).toBeInTheDocument();
        expect(screen.getByText("test description")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
        expect(screen.getByText("test2")).toBeInTheDocument();
        expect(screen.getByText("2k")).toBeInTheDocument();
        expect(screen.getByText("test description2")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });

    it("should render RepoList with no data", () => {
        const data = [];
        const starRepo = jest.fn();
        const starred = [];

        render(<RepoList data={data} starRepo={starRepo} starred={starred} />);
        expect(screen.getByText("No repos found")).toBeInTheDocument();
    });

    // it("should show loader component when loading", () => {});

    it("should render ErrorBoundary when error", () => {
        const data = [
            {
                id: 1,
                name: "test",
                html_url: "test",
                description: "test description",
                language: "JavaScript",
                stars: 1000
            },
            {
                id: 2,
                name: "test2",
                html_url: "test2",
                description: "test description2",
                language: "JavaScript",
                stars: 2000
            }
        ];
        const starRepo = jest.fn();
        const starred = [];

        render(<RepoList data={data} starRepo={starRepo} starred={starred} error="error" />);
        expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    });

});