import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import TrendingRepos from "../TrendingRepos";

describe("TrendingRepos", () => {

    it("should render TrendingRepos", async () => {
        render(<TrendingRepos />);
        await waitFor(() => {
            expect(screen.getByText("Trending Repositories")).toBeInTheDocument();
        });
    });
});