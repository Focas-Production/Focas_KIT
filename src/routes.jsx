import { Routes, Route } from "react-router-dom";

import Shop_Study_Metrials from "./Pages/Shop/Shop_Study_Meterials/Shop_Study_Metrials";
import Selected_Study_Metrials from "./Pages/Shop/Selected_Study_Metrials/Selected_Study_Metrials";
// Remove Cart import since we're not using it anymore
// import Cart from "./Pages/Cart/Cart";
import MetrialDetail from "./Pages/Shop/Metrial_detail/MetrialDetail";
import FormPage from "./Components/Form/ProForm";
import LiteForm from "./Components/Form/LiteForm";
import ProSuccessPage from "./Components/Form/ProSuccessPage";
import LiteSuccessPage from "./Components/Form/LiteSuccessPage";
import RtiLandingPage from "./Components/Rti_Components/RTILanding"
import AuditCoursePage from "./Components/AuditCourse_Components/AuditCourseLanding" 
import PlannerPage from "./Components/Planner_Components/PlannerLanding"


const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" index element={<Shop_Study_Metrials/>} /> */}
      <Route path="/" element={<Selected_Study_Metrials />} />
      {/* Remove cart route since we're redirecting to external shop paths */}
      {/* <Route path="/cart" element={<Cart />} /> */}

      {/* Updated route parameter to match the keyName from products */}
      <Route path="/material/:keyName" element={<MetrialDetail />} />
      <Route path="/proform" element={<FormPage />} />
      <Route path="/liteform" element={<LiteForm />} />
      <Route path="/proform/success" element={<ProSuccessPage />} />
      <Route path="/liteform/success" element={<LiteSuccessPage />} />
      <Route path="/rti" element={<RtiLandingPage />} />
      <Route path="/audit_course" element={<AuditCoursePage />} /> 
      <Route path="/planner" element={<PlannerPage />} />
    </Routes>
  );
};

export default AppRoutes;
