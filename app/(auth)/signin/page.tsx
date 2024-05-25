"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current && passwordRef.current) {
      setUsername(usernameRef.current.value);
      setPassword(passwordRef.current.value);
    }
  }, []);

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    if (result?.error) {
      console.error("Error during sign in:", result.error);
      setError("Incorrect username or password. Please try again.");
    } else {
      toast.success("Successfully logged in", {
        duration: 3000,
        description: "You have been successfully signed in",
        position: "top-center"
      })
      router.push("/");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="jsmith"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <span className="">
            {error ? <AlertDestructive error={error} /> : ""}
          </span>
          <Button type="submit" className="w-full" onClick={onSubmit}>
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive({ error }: { error: string }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Invalid Credentials</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
