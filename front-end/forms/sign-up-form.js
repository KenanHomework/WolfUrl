"use client";
import { Button, Link } from "@nextui-org/react";
import TextInput from "@/components/form/text-input";
import PasswordInput from "@/components/form/password-input";
import { Form, Formik } from "formik";
import { SignUpSchema } from "@/validation/Schemas/SignUpSchema";
import { register } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "@/utils/auth";
import ErrorMessage from "@/components/errorMessage";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={(values, actions) => {
        register(values)
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
                setErrorMessage("User already exists");
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
      validationSchema={SignUpSchema}
    >
      {({ isSubmitting }) => (
        <Form className={"w-[500px]  flex flex-col gap-4"}>
          <h1 className={"text-3xl  font-extrabold"}>Create your account </h1>
          <h2>
            Already have an account? <Link href={"/auth/sign-in"}>Log in</Link>{" "}
          </h2>

          <TextInput
            name={"username"}
            label={"Username"}
            autoComplete={"name"}
          />

          <TextInput name={"email"} label={"Email"} autoComplete={"email"} />

          <PasswordInput name={"password"} label={"Password"} />

          {errorMessage && <ErrorMessage message={errorMessage} />}

          <Button type={"submit"} color={"primary"} isLoading={isSubmitting}>
            Create Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
