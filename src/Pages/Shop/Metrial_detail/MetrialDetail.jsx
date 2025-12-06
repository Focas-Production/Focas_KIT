import MaterialDetailComponent from "../../../Components/Shop_Components/MetrialDetailComponent/MetrialDetailComponent";
import { KitProvider } from "../../../context/KitContext";

const MetrialDetail = () => {
  return (
    <KitProvider>
      <MaterialDetailComponent />
    </KitProvider>
  );
};

export default MetrialDetail;
