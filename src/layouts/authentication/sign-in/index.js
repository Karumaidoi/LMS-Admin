// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import "react-status-alert/dist/status-alert.css";
import { Card, Input, Checkbox, Button, Typography, Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useSignUp } from "hooks/useSignUp";

function Basic() {
  const navigate = useNavigate();
  const { isSigningUp, isLoading: isLoading, error } = useSignUp();
  const { handleSubmit, reset, register, formState } = useForm();

  const { errors } = formState;
  console.log(errors);

  function onSubmit(data) {
    isSigningUp(data, {
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
          margin: "0 auto",
          height: "100vh",
        }}
      >
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Create a free account
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter details to create an LMS admin account
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                {...register("email", { required: "This field is required" })}
                size="lg"
                label="Email address"
                type="email"
                color="orange"
                error={error?.email?.message}
              />

              <Input
                {...register("userName", { required: "This field is required" })}
                size="lg"
                label="Username"
                type="text"
                color="orange"
                error={error?.useName?.message}
                autoComplete={false}
              />

              <Input
                {...register("phone", { required: "This field is required" })}
                size="lg"
                label="Phone"
                type="number"
                color="orange"
                error={error?.phone?.message}
              />

              <Input
                {...register("description", { required: "This field is required" })}
                size="lg"
                label="Description"
                type="text"
                color="orange"
                error={error?.description?.message}
              />

              <Input
                {...register("password", { required: "This field is required" })}
                size="lg"
                label="Password"
                type="password"
                color="orange"
                error={error?.password?.message}
              />
            </div>
            <Checkbox
              color="orange"
              label={
                <Typography variant="small" color="gray" className="flex items-center font-normal">
                  I agree the
                  <a href="#" className="font-medium transition-colors hover:text-gray-900">
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button
              className="mt-6 flex items-center justify-center"
              fullWidth
              color="orange"
              type="submit"
            >
              {isLoading ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?
              <Link
                to="/authentication/sign-up"
                className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
              >
                Log In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Basic;
