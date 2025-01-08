"use client"

import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../InputError";
import { Button, buttonVariants } from "../ui/button";
import { ChromeIcon, LoaderIcon, LogInIcon, UserRoundPlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/hooks/use-toast";


function UserAuthForm() {

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { data, setData, post, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
});

useEffect(() => {
    return () => {
        reset('password');
    };
}, []);

const submit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    post(route('login'), {
        onError: (errors) => {
            setIsLoading(false);
            toast({
                title: "Login Failed",
                description: errors.email || errors.password,
                variant: "destructive",
            });
        },
        onSuccess: () => {
            setIsLoading(false);
            toast({
                title: "Login Success 🎉",
                description: "You have successfully logged in",
                variant: "default",
            });
        },
        onFinish: () => setIsLoading(false),
    });
};

  return (
    <div className={cn("grid gap-4")}>
      <form onSubmit={submit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="nv-label" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              name="email"
              value={data.email}
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              autoFocus={true}
              onChange={(e) => setData('email', e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className="grid gap-1">
            <Label className="nv-label" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              value={data.password}
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              onChange={(e) => setData('password', e.target.value)}
              autoCorrect="off"
              disabled={isLoading}
            />
            <InputError message={errors.password} className="mt-2" />
          </div>
            <label className="flex items-center">
                <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                />
                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
          <Button disabled={isLoading}>
            {isLoading && (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
            <LogInIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
      <div className='flex row justify-center gap-2 items-center'>
        <Button className='w-full' variant="destructive" type="button" disabled={isLoading}>
            {isLoading ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <ChromeIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Google
        </Button>
        <Link
        className={cn(buttonVariants({variant: 'outline'}))}
        disabled={isLoading}
        href={route('register')}
        >
            {isLoading ? (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
            <UserRoundPlusIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Sign Up
        </Link>
      </div>
    </div>
  )
}

export default UserAuthForm
