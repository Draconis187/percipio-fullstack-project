import { render, screen } from "@testing-library/react";
import Login from "../../Components/Login";
import { TextEncoder } from "util";

describe("Login", () => {
  test("Username input field should exist", () => {
    render(<Login />);
    const username = screen.getByLabelText("Username");
    expect(username).toExist();
  });
});
