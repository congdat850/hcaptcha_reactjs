import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useForm } from "react-hook-form";

function App() {
  const [token, setToken] = useState(null);

  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    if (!token) {
      return alert("Captcha token required");
    }

    try {
      const result = await axios.post(
        `http://localhost:1337/api/candidates`,
        {
          data: {
            name: values.name,
            phoneNumber: values.message,
            Token: token,
          },
        }
      );

      if (result) {
        console.log(result);
        alert("Message sent! :D");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <h2>HCaptcha With Strapi</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label for="name">Name:</label>
        <input name="name" type="text" required {...register("name")} />
        <br />
        <br />
        <label for="message">Message:</label>
        <textarea name="message" required {...register("message")} />
        <br />
        <br />
        <HCaptcha
          sitekey="771bdc28-1afa-46be-9a41-95ac7f103380"
          onVerify={setToken}
          onError={() => setToken(null)}
          onExpire={() => setToken(null)}
          theme="dark"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
