import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { fetchWeatherForCity } from "../redux/weather/thunks";
import { removeCity } from "../redux/weather/actions";
import { CityCard } from "../components/CityCard";

// Мокаємо Redux dispatch (custom hook)
jest.mock("../hooks/useAppDispatch", () => ({
  useAppDispatch: () => jest.fn(),
}));

// Мокаємо Thunks/Actions
jest.mock("../redux/weather/thunks", () => ({
  fetchWeatherForCity: jest.fn((city: string) => ({
    type: "FETCH",
    payload: city,
  })),
}));
jest.mock("../redux/weather/actions", () => ({
  removeCity: jest.fn((city: string) => ({ type: "REMOVE", payload: city })),
}));

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

const mockWeatherData = {
  id: 1,
  city: "Kyiv",
  temperature: 18.5,
  description: "Clear sky",
  icon: "01d",
  lastUpdated: new Date().toISOString(),
};

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <Provider store={mockStore({})}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );

describe("CityCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders weather data correctly", () => {
    renderWithProviders(<CityCard data={mockWeatherData} />);

    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText("Clear sky")).toBeInTheDocument();
    expect(screen.getByText(/°C/)).toBeInTheDocument();
    expect(screen.getByAltText(/піктограма погоди/i)).toBeInTheDocument();
  });

  it("dispatches fetchWeatherForCity on 'Оновити' click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CityCard data={mockWeatherData} />);

    const refreshButton = screen.getByRole("button", { name: "Оновити" });
    await user.click(refreshButton);

    expect(fetchWeatherForCity).toHaveBeenCalledWith("Kyiv");
  });

  it("dispatches removeCity on 'Видалити' click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<CityCard data={mockWeatherData} />);

    const deleteButton = screen.getByRole("button", { name: "Видалити" });
    await user.click(deleteButton);

    expect(removeCity).toHaveBeenCalledWith("Kyiv");
  });
});
