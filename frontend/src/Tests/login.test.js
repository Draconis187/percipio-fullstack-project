import { render, screen } from "@testing-library/react";
import Login from "../Components/Login";
import "@testing-library/jest-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  // ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login", () => {
  test("Username input field should exist", () => {
    render(<Login />);
    const username = screen.getByLabelText("Username");
    expect(username).toBeInTheDocument();
  });
});
