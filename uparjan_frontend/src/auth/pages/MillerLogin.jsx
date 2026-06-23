import LoginForm from "../components/LoginForm";

import useLogin from "../hooks/useLogin";

export default function MillerLogin() {

  const {
    formData,
    handleChange,
    handleSubmit,
  } = useLogin("MILLER");

  return (
    <LoginForm
      title="Miller Login"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}