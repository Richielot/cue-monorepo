import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "../avatar";

describe("Avatar", () => {
  it("shows initials from full name", () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("shows single initial from first name only", () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("falls back to email initial when no name", () => {
    render(<Avatar email="bob@example.com" />);
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("shows ? when neither name nor email", () => {
    render(<Avatar />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("applies size class", () => {
    const { container } = render(<Avatar name="Test" size="lg" />);
    expect(container.firstChild).toHaveClass("h-12", "w-12");
  });

  it("applies deterministic color from name", () => {
    const { container: c1 } = render(<Avatar name="Alice" />);
    const { container: c2 } = render(<Avatar name="Alice" />);
    expect(c1.firstChild?.className).toEqual(c2.firstChild?.className);
  });
});
