import { render, screen } from "@testing-library/react"

import { Card } from "../index"

describe("Back", () => {
  test("should render with default text", () => {
    render(
      <Card>
        <p>card</p>
      </Card>
    )

    const element = screen.getByText(/card/i)
    screen.debug(element)
    expect(element).toBeInTheDocument()
  })

  test("should render <p>card</p>", () => {
    const { asFragment } = render(
      <Card>
        <p>card</p>
      </Card>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render <Card/>", () => {
    const { asFragment } = render(<Card />)

    expect(asFragment()).toMatchSnapshot()
  })
})
