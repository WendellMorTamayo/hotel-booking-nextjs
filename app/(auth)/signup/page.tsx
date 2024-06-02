"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterProps, registerUser } from "../action";
import { useEffect, useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertDestructive } from "@/components/AlertDestructive";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SignUpSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
});

export default function Page() {
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  if (session) {
    redirect("/");
    return null;
  }

  const handleRegister = async (data: any) => {
    const user: RegisterProps = {
      username: data.username,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
    };

    try {
      const registeredUser = await registerUser(user);
      if (registeredUser.user) {
        router.push("/signin");
        toast.success("Successfully registered", {
          duration: 3000,
          description: "You have been successfully registered",
        });
      } else {
        toast.error("Registration failed", {
          duration: 3000,
          description: "Failed to register user",
        });
        setError((err) => {
          throw err;
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed", {
        duration: 3000,
        description: "Failed to register user",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleRegister)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Max"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="text-red-500">
                  {errors.firstname.message as string}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Robinson"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="text-red-500">
                  {errors.lastname.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message as string}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johnsmith"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500">
                {errors.username.message as string}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <span className="">
            {error ? (
              <AlertDestructive title={"Something went wrong!"} error={error} />
            ) : (
              ""
            )}
          </span>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
