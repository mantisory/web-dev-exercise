import React, { useState } from "react";
import axios from "axios";
import FormInput from "../FormInput";

export default function LoginForm(props) {
  const [formState, setFormState] = useState({
    email: null,
    password: null,
    rememberMe: false,
  });
  const inputs = [
    {
      id: "email",
      name: "email",
      type: "text",
      label: "Email",
      htmlFor: "email",
      errorMessage: "Invalid email address",
      pattern: "^[a-z0-9]+@[a-z]+.[a-z]{2,3}$",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      htmlFor: "password",
      pattern: "^[A-Za-z0-9]{8,16}$",
      errorMessage: "Invalid password",
      required: true,
    },
    {
      id: "rememberMe",
      name: "rememberMe",
      type: "checkbox",
      label: "Remember me?",
      htmlFor: "rememberMe",
    },
  ];
  const handleSubmit = (event) => {
    event.preventDefault(); //don't want page to refresh after submission

    axios
      .post("http://localhost:8000/api/login", {
        email: formState.email,
        password: formState.password,
        remember: formState.rememberMe,
      })
      .then((res) => {
        alert(res.data);
      });
  };
  function handleClick(event) {
    console.log(event);
  }
  const handleChange = (event) => {
    console.log(event.target.name);
    setFormState({
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  return (
    <div className="form__container">
      <span className="form__title form__label">Sign In</span>
      <form onSubmit={handleSubmit} className="form">
        {inputs.map((input) => (
          <FormInput
            {...input}
            key={input.id}
            onChange={handleChange}
          ></FormInput>
        ))}
        <input type="submit" className="form__submit" value="Submit" />
      </form>
      <button
        onClick={() => {
          handleClick("forgot");
        }}
        className="form__text-button"
      >
        Forgot Password?
      </button>
      <label htmlFor="signup" className="form__text-button-label">
        Don't have an account?{" "}
        <button
          id="signup"
          name="signup"
          className="form__text-button"
          onClick={() => {
            handleClick("signup");
          }}
        >
          Sign up
        </button>
      </label>
      <button
        className="form__text-button"
        onClick={() => {
          handleClick("resend");
        }}
      >
        Resend email confirmation
      </button>
    </div>
  );
}
