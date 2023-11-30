// react-router-dom components
import { useAppState } from "context/manageState";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Button as ButtonMaterial,
  Typography,
  Spinner,
} from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { useLogin } from "hooks/useLogin";
import { Spin } from "antd";

function Cover() {
  const navigate = useNavigate();
  const { isLoading, isLoginIn, error } = useLogin();
  const { register, reset, formState, handleSubmit } = useForm();

  function onSubmit(data) {
    isLoginIn(data, {
      onSettled: () => {
        reset();
      },
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          height: "100vh",
        }}
      >
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Welcome back,
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your email and password to continue.
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                {...register("email", { required: "This field is required" })}
                size="lg"
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                required
                color="orange"
                disabled={isLoading}
              />

              <Input
                {...register("password", { required: "This field is required" })}
                size="lg"
                label="Password"
                name="password"
                type="password"
                required
                color="orange"
                disabled={isLoading}
              />
            </div>

            <ButtonMaterial
              className="mt-6 flex items-center justify-center"
              fullWidth
              color="orange"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spin /> : "Submit"}
            </ButtonMaterial>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don&lsquo;t have an account?
              <Link
                to="/authentication/sign-in"
                className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
              >
                Create a free account
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Cover;
