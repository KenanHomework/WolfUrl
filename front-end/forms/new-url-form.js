"use client";
import TextInput from "@/components/form/text-input";
import AlertBrand from "@/components/alert-brand";
import { Button } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useUserSignedIn } from "@/utils/auth";
import { shortLink } from "@/services/url";
import { useState } from "react";
import ErrorMessage from "@/components/errorMessage";
import { NewUrlSchema } from "@/validation/Schemas/NewUrlSchema";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/navigation";

export default function NewUrlForm() {
  const router = useRouter();
  const [animationParent] = useAutoAnimate();

  const [errorMessage, setErrorMessage] = useState("");
  const signedIn = useUserSignedIn();

  return (
    <Formik
      initialValues={{
        destination: "",
        label: "",
        backHalf: "",
      }}
      onSubmit={(values, actions) => {
        setErrorMessage("");
        shortLink(values)
          .then((link) => {
            router.push("/links");
          })
          .catch((err) => {
            console.log(err);
            switch (err.status) {
              case 400:
                setErrorMessage(err.message);
                break;
              case 500:
                setErrorMessage(
                  "A problem has occurred please try again later"
                );
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
      validationSchema={NewUrlSchema}
    >
      {({ isSubmitting }) => (
        <Form
          className={
            "w-full h-fit bg-white rounded-xl border border-[#e8e9eb] py-8 px-10 flex flex-col gap-4 drop-shadow-md"
          }
          ref={animationParent}
        >
          <h1 className={"font-extrabold text-2xl"}>Shorten a long link </h1>

          <div className={"flex flex-col gap-4"}>
            <TextInput
              name={"destination"}
              label={"Paste auth long URL"}
              placeholder={"Example: https://super-long-link.com/shortent-it"}
            />

            <div className={"w-full grid grid-cols-2 gap-4"}>
              <TextInput
                name={"label"}
                label={"Label"}
                placeholder={"Example: Favorite Link Label"}
              />
              <TextInput
                name={"backHalf"}
                label={"Enter a back-half (optional)"}
                placeholder={"example:favorite-link"}
              />
            </div>

            {!signedIn && (
              <AlertBrand
                message={"End your link with words that will make it unique"}
              />
            )}

            {errorMessage && <ErrorMessage message={errorMessage} />}

            <Button
              size={"lg"}
              color={"primary"}
              className={"w-fit"}
              isLoading={isSubmitting}
              type={"submit"}
            >
              {signedIn ? "Create" : "Sign Up and get your link"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
