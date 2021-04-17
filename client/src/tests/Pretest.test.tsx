import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../views/pretest";
import arabic from "../lang/arabic.json";
import Surahs from "../data/surahs.json";
import { BrowserRouter} from "react-router-dom"; // Router, MemoryRouter
// import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import RenderWithRoute from "./renderWithRoute";

test("Pretest: Title", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  let pretestTitle = new RegExp(arabic.pretestTitle);
  expect(screen.getByText(pretestTitle)).toBeInTheDocument();
});

test("Pretest: Corrent start input", () => {
  const { getByText, getByLabelText } = RenderWithRoute(App, {
    path: "/pretest/:id",
    route: "/pretest/1",
  });

  let inputStart = getByLabelText(arabic.pretestStart + ":");
  let inputEnd = getByLabelText(arabic.pretestEnd + ":");
  let submit = getByText(arabic.pretestSubmit);

  fireEvent.change(inputEnd, { target: { value: "2" } });
  fireEvent.change(inputStart, { target: { value: "3" } });
  fireEvent.click(submit, { button: 0 });

  expect(getByText(arabic.pretestEndError)).toBeInTheDocument();
});

test("Pretest: Corrent End input", () => {
  //TODO
  for (let i = 114; i <= 114; i++) {
    const { getByLabelText, getByTestId, getByText } = RenderWithRoute(App, {
      path: "/pretest/:id",
      route: `/pretest/${i}`,
    });

    let inputEnd = getByLabelText(arabic.pretestEnd + ":");
    let submit = getByTestId("submit-button");

    fireEvent.change(inputEnd, {
      target: { value: `${Surahs[i - 1].total_verses + 1}` },
    });
    fireEvent.click(submit, { button: 0 });

    expect(getByText(arabic.pretestEndError)).toBeInTheDocument();
  }
});
