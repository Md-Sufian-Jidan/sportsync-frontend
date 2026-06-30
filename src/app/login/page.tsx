"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthScene from "@/components/modules/auth/AuthScene";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { login } from "@/services/authService";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginForm) {
    try {
      await login(values.email, values.password);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ?? "Unable to login. Please try again."
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
            Sign in to manage and reserve your parking spot
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-10 space-y-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="off"
                      className="h-12 w-full rounded-xl border border-border focus:border-primary bg-background pl-11 pr-4 text-sm shadow-sm transition-all placeholder:text-foreground focus:border-primary outline-none focus:ring-4 focus:ring-primary transition-colors"
                    />
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="off"
                      className="h-12 w-full rounded-xl border border-border focus:border-primary bg-background pl-11 pr-4 text-sm shadow-sm transition-all placeholder:text-foreground focus:border-primary outline-none focus:ring-4 focus:ring-primary transition-colors"
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
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-border text-xs font-body text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-secondary hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}