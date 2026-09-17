import { render, screen } from "@testing-library/react";
import Login from "../Components/Login";
import "@testing-library/jest-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe("Login", () => {
  test("Heading should display", () => {
    render(<Login />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("Username input field should exist", () => {
    render(<Login />);
    const username = screen.getByLabelText("Username");
    expect(username).toBeInTheDocument();
  });

  test("Login button should exist", () => {
    render(<Login />);
    const loginButton = screen.getByText("Log in");
    expect(loginButton).toBeInTheDocument();
  });
});
