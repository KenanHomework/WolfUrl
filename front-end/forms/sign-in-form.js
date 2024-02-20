"use client";
import { Button, Link } from "@nextui-org/react";
import TextInput from "@/components/form/text-input";
import PasswordInput from "@/components/form/password-input";
import { Form, Formik } from "formik";
import { LoginSchema } from "@/validation/Schemas/LoginSchema";
import ErrorMessage from "@/components/errorMessage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { signInUser } from "@/utils/auth";

const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, actions) => {
        login(values)
          .then((user) => {
            signInUser(user);
            router.push("/");
          })
          .catch((err) => {
            switch (err.status) {
              case 404:
                setErrorMessage("User not found");
                break;
              case 400:
                setErrorMessage("Invalid Login");
                break;
              default:
                setErrorMessage(
                  "A problem has occurred please try again later"
                );
                break;
            }
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
      validationSchema={LoginSchema}
    >
      {({ isSubmitting }) => (
        <Form className={"w-[500px] h-[400px] flex flex-col gap-4"}>
          <h1 className={"text-3xl  font-extrabold"}>
            Log in and start sharing
          </h1>
          <h2>
            Don&apos;t have an account?{" "}
            <Link href={"/auth/sign-up"}>Sign up</Link>{" "}
          </h2>
          <TextInput name={"email"} label={"Email"} />

          <PasswordInput name={"password"} label={"Password"} />

          {errorMessage && <ErrorMessage message={errorMessage} />}

          <Button type={"submit"} color={"primary"} isLoading={isSubmitting}>
            Log in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
