import React from "react";
import { render, screen } from '@testing-library/react';
import Topics from "../Topics";

describe("Topics", () => {

    const topics = ["test", "test2"];

    it("should render Topics", () => {

        render(<Topics topics={topics}  />);
        expect(screen.getByTestId("topic-0")).toHaveTextContent("test");
        expect(screen.getByTestId("topic-1")).toHaveTextContent("test2");
    });

    it("should render Topics with no data", () => {
        const topics = [];
        render(<Topics topics={topics}  />);
        expect(screen.getByTestId("topics")).toBeInTheDocument();
    });

});