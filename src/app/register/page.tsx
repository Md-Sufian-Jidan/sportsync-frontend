"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import AuthScene from "@/components/modules/auth/AuthScene";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { register } from "@/services/authService";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum(["driver", "admin"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "driver",
    },
  });

  async function onSubmit(values: RegisterForm) {
    try {
      await register(
        values.name,
        values.email,
        values.password,
        values.role
      );

      toast.success("Registration successful");

      router.push("/login");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
        "Unable to register. Please try again."
      );
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center p-6 overflow-hidden">
      <AuthScene />

      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-xs font-body text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center space-y-2 mb-8">
          <h1 className="font-heading text-5xl font-black tracking-wider text-white">
            SPORT<span className="text-secondary">SYNC</span>
          </h1>

          <p className="font-body text-xs text-white">
            Create an account to reserve and monitor parking slots
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-10 space-y-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="John Doe"
                      autoComplete="off"
                      className="h-12 rounded-xl pl-11"
                    />

                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      autoComplete="off"
                      className="h-12 rounded-xl pl-11"
                    />

                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="h-12 rounded-xl pl-11"
                    />

                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12 rounded-xl cursor-pointer"
            >
              {form.formState.isSubmitting ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-border text-xs font-body text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-secondary hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}