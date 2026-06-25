import FarmerDetailsForm from "../components/FarmerDetailsForm";
import useFarmerDetails from "../hooks/useFarmerLandDetails";

export default function FarmerDetails() {
  const hook = useFarmerDetails();
  return <FarmerDetailsForm {...hook} />;
}
