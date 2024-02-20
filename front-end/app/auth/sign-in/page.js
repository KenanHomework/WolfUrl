import SignInForm from "@/forms/sign-in-form";

export const metadata = {
  title: "Sign In | Wolf Url",
};

export default function Page() {
  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <SignInForm />
    </div>
  );
}
