import FarmerDetailsForm from "../components/FarmerDetailsForm";
import useFarmerDetails from "../hooks/useFarmerDetails";

export default function FarmerDetails() {
  const hook = useFarmerDetails();
  return <FarmerDetailsForm {...hook} />;
}
