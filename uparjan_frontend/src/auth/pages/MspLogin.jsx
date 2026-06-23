import LoginForm from "../components/LoginForm";

import useLogin from "../hooks/useLogin";

export default function MspLogin() {

  const {
    formData,
    handleChange,
    handleSubmit,
  } = useLogin("MSP");

  return (
    <LoginForm
      title="MSP Login"
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}