import FarmerLandForm from "../components/FarmerLandForm";
import useFarmerLandDetails from "../hooks/useFarmerLandDetails";

export default function FarmerLandDetails() {
  const hook = useFarmerLandDetails();
  return <FarmerLandForm {...hook} />;
}
