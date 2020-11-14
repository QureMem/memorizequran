import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../views/homepage";
import arabic from "../lang/arabic.json";
import Surahs from "../data/surahs.json";
import { BrowserRouter as Router } from "react-router-dom";

test("Homepage: Bismi Allah", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  let re_basmallah = new RegExp(arabic.basmalah);
  expect(screen.getByText(re_basmallah)).toBeInTheDocument();
});

test("Homepage: Surahs", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  for (let i = 0; i < 114; i++) {
    let re_surah = new RegExp(Surahs[i].name);
    screen.getAllByText(re_surah);
  }
});
