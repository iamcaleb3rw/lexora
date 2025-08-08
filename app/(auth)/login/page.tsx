"use client";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import React, { useState, useTransition } from "react";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import Separator from "@/components/separator-one";

const Login = () => {
  const router = useRouter();
  const [isGoogleSignInPending, startGoogleSignIn] = useTransition();
  const [isEmailSignInPending, startEmailSignIn] = useTransition();
  const [emailAdress, setEmailAdress] = useState("");
  async function signInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          toast.success("You're in, Successfully signed in!");
        },
        onError: (e) => {
          toast.error(e.error.message);
        },
      },
    });
  }

  async function signInWithEmail() {
    await authClient.emailOtp.sendVerificationOtp({
      email: emailAdress,
      type: "sign-in",
      fetchOptions: {
        onSuccess: () => {
          toast.success(" A verification code has been sent to your email.");
          router.push(`/verify-otp/`);
        },
        onError: (e) => {
          toast.error(e.error.message);
        },
      },
    });
  }
  return (
    <div className="p-6">
      <div className="">
        <Link href="/" className="">
          <Button variant={"ghost"} size={"icon"} className="cursor-pointer">
            <ArrowLeft
              strokeWidth={3}
              className="font-medium h-4 w-4 text-muted-foreground"
            />
          </Button>
        </Link>
      </div>
      <div className="min-h-[calc(100vh-124px)]  w-full flex items-center justify-center">
        <div className="max-w-[275px] flex flex-col h-full w-full">
          <p className="text-xl font-semibold tracking-wide mb-7 text-center">
            Login or Sign Up
          </p>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="w-full"
            disabled={isGoogleSignInPending}
            onClick={() => {
              startGoogleSignIn(async () => {
                await signInWithGoogle();
              });
            }}
          >
            {isGoogleSignInPending && <Spinner />}
            <svg
              width="256"
              height="262"
              viewBox="0 0 256 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
            <p className="font-medium">Continue with Google</p>
          </Button>
          <Separator />
          <div className="flex gap-3 flex-col">
            <Input
              placeholder="Email"
              value={emailAdress}
              onChange={(e) => setEmailAdress(e.target.value)}
              className="ring-3 border-0 ring-muted focus-visible:ring-3 focus-visible:ring-purple-500"
            />
            <Button
              size={"lg"}
              className="w-full"
              disabled={isGoogleSignInPending}
              onClick={() => {
                startEmailSignIn(async () => {
                  await signInWithEmail();
                });
              }}
            >
              {isEmailSignInPending && <Spinner />}
              Continue with Email
            </Button>
          </div>
          <div className="mt-7 text-center text-muted-foreground tracking-tight">
            Join 1200+ law students
          </div>
        </div>
      </div>
      <div className="text-muted-foreground text-center">
        By continuing you agree to <br /> Lexora's{" "}
        <Link href={"#"} className="border-b-[2px]">
          Terms
        </Link>{" "}
        and{" "}
        <Link href={"#"} className="border-b-[2px]">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Login;
