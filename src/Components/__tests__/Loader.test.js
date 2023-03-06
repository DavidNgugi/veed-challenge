import React from "react";
import { render, screen } from '@testing-library/react';
import Loader from "../Loader";

describe("Loader", () => {

    it("should render Loader", () => {
        render(<Loader />);
        expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

});