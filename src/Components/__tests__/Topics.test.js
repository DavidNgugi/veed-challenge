import React from "react";
import { render, screen } from '@testing-library/react';
import Topics from "../Topics";

describe("Topics", () => {

    const topics = ["test", "test2"];

    it("should render Topics", () => {

        render(<Topics topics={topics}  />);
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("test2")).toBeInTheDocument();
    });

    it("should render Topics with no data", () => {
        const topics = [];
        render(<Topics topics={topics}  />);
        expect(screen.getByTestId("topic")).toBeInTheDocument();
    });

});