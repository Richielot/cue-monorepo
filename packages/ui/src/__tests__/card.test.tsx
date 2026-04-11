import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardDescription, CardHeader, CardTitle } from "../card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies medium padding by default", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass("p-6");
  });

  it("applies large padding", () => {
    const { container } = render(<Card padding="lg">Content</Card>);
    expect(container.firstChild).toHaveClass("p-8");
  });

  it("applies no padding", () => {
    const { container } = render(<Card padding="none">Content</Card>);
    expect(container.firstChild).not.toHaveClass("p-4");
    expect(container.firstChild).not.toHaveClass("p-6");
    expect(container.firstChild).not.toHaveClass("p-8");
  });
});

describe("CardHeader / CardTitle / CardDescription", () => {
  it("renders title and description", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Title</CardTitle>
          <CardDescription>My description</CardDescription>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("My description")).toBeInTheDocument();
  });
});
