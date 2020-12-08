import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../views/homepage";
import arabic from "../lang/arabic.json";
import Surahs from "../data/surahs.json";
import { Router, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

test("Homepage: Bismi Allah", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  let re_basmallah = new RegExp(arabic.basmalah);
  expect(screen.getByText(re_basmallah)).toBeInTheDocument();
});

test("Homepage: Surahs", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  for (let i = 0; i < 114; i++) {
    let re_surah = new RegExp(Surahs[i].name);
    screen.getAllByText(re_surah);
  }
});

test("Homepage: Goes to pretest on click!", () => {
  const history = createMemoryHistory();

  // mock push function
  history.push = jest.fn();

  render(
    <Router history={history}>
      <App />
    </Router>
  );
  for (let i = 0; i < 114; i++) {
    const surahLink = new RegExp(Surahs[i].name + "$");
    fireEvent.click(screen.getByText(surahLink), { button: 0 });
    expect(history.push).toHaveBeenCalledWith(`/pretest/${i + 1}`);
  }
});
