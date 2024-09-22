"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const router = useRouter();
  const { toast } = useToast();
  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setIsSubmitting(false);
      console.error("Error:", JSON.stringify(err, null, 2));
      console.log(JSON.stringify(err));
      toast({
        variant: "destructive",
        title: "Error!",
        description: JSON.parse(JSON.stringify(err?.errors[0]?.message)),
      });
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/sign-in");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setIsVerifying(false);

      console.error("Error:", JSON.stringify(err, null, 2));
      console.log(JSON.stringify(err));
      toast({
        variant: "destructive",
        title: "Error!",
        description: JSON.parse(JSON.stringify(err?.errors[0]?.message)),
      });
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
          <div className="absolute inset-0  bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full">
              <div className="text-center">
                <p className="mt-2 text-gray-500">Enter your code below</p>
              </div>
              <div className="mt-8">
                <form onSubmit={handleVerify}>
                  <div className="mb-6">
                    <label
                      id="code"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Enter your verification code
                    </label>
                    <input
                      value={code}
                      id="code"
                      name="code"
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2.5 placeholder-gray-300 shadow shadow-gray-100 focus:border-gray-500 focus:outline-none valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                    />
                    <span className="mt-2 hidden text-sm text-red-400">
                      Please enter a valid email address.{" "}
                    </span>
                  </div>

                  <div className="mb-6">
                    <Button
                      type="submit"
                      className="w-full rounded-md px-3 py-2 text-white bg-[#772432] hover:bg-[#923847]  focus:outline-none group-invalid:pointer-events-none group-invalid:opacity-70"
                    >
                      {isVerifying ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        ""
                      )}
                      Verify
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <h1>Verify your email</h1>
        <form onSubmit={handleVerify}>
          <label id="code">Enter your verification code</label>
          <input
            value={code}
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form> */}
      </>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="absolute inset-0  bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">Welcome</h1>
              <p className="mt-2 text-gray-500">
                Sign up below to create your account
              </p>
            </div>
            <div className="mt-8">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2.5 placeholder-gray-300 shadow shadow-gray-100 focus:border-gray-500 focus:outline-none valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                    autoComplete="off"
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-400">
                    Please enter a valid email address.{" "}
                  </span>
                </div>
                <div className="mb-6">
                  <div className="mb-2 flex justify-between">
                    <label htmlFor="password" className="text-sm text-gray-600">
                      Password
                    </label>
                    <a
                      href="#!"
                      className="text-sm text-gray-400 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                    className="peer w-full rounded-md border border-gray-300 px-3 py-2.5 placeholder-gray-300 shadow shadow-gray-100 focus:border-gray-500 focus:outline-none valid:[&:not(:placeholder-shown)]:border-green-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-400">
                    Password must be atleast six characters.{" "}
                  </span>
                </div>
                <div className="mb-6">
                  <Button
                    type="submit"
                    className="w-full rounded-md px-3 py-2 text-white bg-[#772432] hover:bg-[#923847]  focus:outline-none group-invalid:pointer-events-none group-invalid:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      ""
                    )}
                    Sign in
                  </Button>
                </div>
                {/* <p className="text-center text-sm text-gray-500">
                  Don&#x27;t have an account yet?{" "}
                  <a
                    href="#!"
                    className=" font-semibold text-black  focus:underline focus:outline-none"
                  >
                    Sign in
                  </a>
                  .
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Next</button>
        </div>
      </form> */}
    </>
  );
}
