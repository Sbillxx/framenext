"use client";

import { login } from "@/lib/action";
import { useActionState, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const passRef = useRef<HTMLInputElement>(null);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
    if (passRef.current) {
      const len = passRef.current.value.length;
      setTimeout(() => {
        passRef.current?.focus();
        passRef.current?.setSelectionRange(len, len);
      }, 0);
    }
  };

  const [state, formAction, isPending] = useActionState(login, undefined);
  const error = state?.fields && JSON.parse(state.fields);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>
        <form action={formAction} className="space-y-5">
          <div>
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              id="Username"
              name="username"
              type="text"
              defaultValue={state?.values?.username}
              className="mt-1 text-slate-600 w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ketikkan username disini"
            />
            <span className="text-red-500 text-xs italic">
              {error?.username && error.username[0]}
            </span>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="pr-4 mt-1 w-full flex justify-between items-center rounded-lg border border-gray-300 text-sm shadow-sm focus-within:border-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500">
              <input
                ref={passRef}
                id="Password"
                name="password"
                type={isOpen ? "text" : "password"}
                defaultValue={state?.values?.password}
                className="mt-1 w-full focus:outline-none p-3 text-slate-600"
                placeholder="••••••••"
              />
              {isOpen ? (
                <FaEyeSlash
                  size={20}
                  className="hover:cursor-pointer"
                  onClick={handleIsOpen}
                />
              ) : (
                <FaEye
                  size={20}
                  className="hover:cursor-pointer"
                  onClick={handleIsOpen}
                />
              )}
            </div>
            <span className="text-red-500 text-xs italic">
              {error?.password && error.password[0]}
            </span>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <span className="text-red-500 text-xs italic">{state?.message}</span>
        </form>
      </div>
    </div>
  );
}
