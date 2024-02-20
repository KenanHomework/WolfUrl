import SignUpForm from "@/forms/sign-up-form";

export const metadata = {
  title: "Sign Up | Wolf Url",
};

export default function Page() {
  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <SignUpForm />
    </div>
  );
}
