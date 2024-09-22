"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { toast } = useToast();
  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setIsSubmitting(false);
      console.error(JSON.stringify(err, null, 2));
      console.log(JSON.stringify(err));
      toast({
        variant: "destructive",
        title: "Error!",
        description: JSON.parse(JSON.stringify(err?.errors[0]?.message)),
      });
    }
  };

  // Display a form to capture the user's email and password
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div className="absolute inset-0  bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">
                Welcome back
              </h1>
              <p className="mt-2 text-gray-500">
                Sign in below to access your account
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
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
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
                    {/* <a
                      href="#!"
                      className="text-sm text-gray-400 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
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
                    Sign up
                  </a>
                  .
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <h1>Sign in</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
          />
        </div>
        <button type="submit">Sign in</button>
      </form> */}
    </>
  );
}
