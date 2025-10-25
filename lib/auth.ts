import { db } from "@/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import * as schema from "@/server/db/schema";
import { resend } from "./resend";
import EmailTemplate from "@/components/email-template";

// your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Lexora <onboarding@resend.dev>",
          to: [email],
          subject: "Here's you OTP code",
          react: EmailTemplate({ userFirstname: email, otp: otp }),
        });
      },
    }),
  ],
});
