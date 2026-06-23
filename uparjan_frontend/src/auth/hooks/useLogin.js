import { useState } from "react";

export default function useLogin(role) {

  const [formData, setFormData] =
    useState({
      userId: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(role, formData);

    alert(role + " Login Success");
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
}