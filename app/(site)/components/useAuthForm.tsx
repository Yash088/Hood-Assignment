"use client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {  SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { API_ROUTES } from "@/app/Routes/apiRoutes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Variant = "LOGIN" | "REGISTER";
export interface SIGNUPFORM {
  name?: string;
  email: string;
  password: string;
}
const useAuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup
    .object({
      name: yup
        .string()
        .min(3, "Name Should be greater than 3")
        .matches(/^[a-zA-Z\s]+$/, "Special characters are not allowed.")
        .required("Name is required."),
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          "Email is invalid"
        )
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(4, "Password should be greater than 4 letter "),
    })
    .required();
  const loginSchema = yup
    .object({
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          "Email is invalid"
        )
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(4, "Password should be greater than 4 letter "),
    })
    .required();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SIGNUPFORM>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(variant === "LOGIN" ? loginSchema : schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SIGNUPFORM> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post(API_ROUTES.REGISTER_USER, data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return {
    handleSubmit,
    onSubmit,
    variant,
    isLoading,
    register,
    errors,
    toggleVariant,
    isValid,
    isDirty,
  };
};

export default useAuthForm;
