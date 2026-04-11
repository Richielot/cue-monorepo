import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../input";

describe("Input", () => {
  it("renders without label", () => {
    render(<Input id="test" placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Input id="name" error="Name is required" />);
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("applies error styling when error is present", () => {
    render(<Input id="name" error="Required" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-red-300");
  });

  it("applies normal styling without error", () => {
    render(<Input id="name" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-gray-300");
  });
});
