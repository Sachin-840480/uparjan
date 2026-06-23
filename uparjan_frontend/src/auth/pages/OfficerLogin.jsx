import LoginForm from "../components/LoginForm";

import useLogin from "../hooks/useLogin";

export default function OfficerLogin() {

  const {
    formData,
    handleChange,
    handleSubmit,
  } = useLogin("OFFICER");

  return (
    <LoginForm
      title="Officer Login"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}