import { Fade } from "@mui/material";
import AddCityForm from "../components/AddCityForm";
import { CityList } from "../components/CityList";

export const HomePage = () => {
  return (
    <Fade in timeout={900}>
      <div className="container">
        <AddCityForm />
        <CityList />
      </div>
    </Fade>
  );
};
