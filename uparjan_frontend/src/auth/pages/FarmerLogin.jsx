import LoginForm from "../components/LoginForm";

import useLogin from "../hooks/useLogin";

export default function FarmerLogin() {

  const {
    formData,
    handleChange,
    handleSubmit,
  } = useLogin("FARMER");

  return (
    <LoginForm
      title="Farmer Login"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}