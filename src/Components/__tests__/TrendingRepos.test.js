import { render, screen } from '@testing-library/react';
import TrendingRepos from "../TrendingRepos";

describe("TrendingRepos", () => {

    it("should render TrendingRepos", () => {
        render(<TrendingRepos  />);
        expect(screen.getByText("Trending Repositories")).toBeInTheDocument();
    });
});