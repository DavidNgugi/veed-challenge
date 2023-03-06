import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import RepoList from "../RepoList";

describe("RepoList", () => {

    it("should render RepoList", async () => {
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
                language: "Python",
                stars: 2000
            }
        ];
        const starRepo = jest.fn(() => Promise.resolve(999));
        const starred = [];

        render(<RepoList data={data} starRepo={starRepo} starred={starred} />);

        await waitFor(() => expect(screen.getAllByTestId("repo-card")).toHaveLength(2));
    });

    it("should not render RepoList with no data", async () => {
        const data = [];
        const starRepo = jest.fn();
        const starred = [];

        render(<RepoList data={data} starRepo={starRepo} starred={starred} />);

        const repoCard = screen.queryByTestId("repo-card");
        await waitFor(() => expect(repoCard).toBeNull());
    });

});