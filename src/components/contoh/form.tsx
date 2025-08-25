//client component
"use client";

import { login } from "@/lib/action";
import { useActionState } from "react";

export const Form = () => {
  const [state, FormAction, isLoading] = useActionState(login, undefined);
  console.log(state);
  return (
    <form action={FormAction}>
      <div>
        <label htmlFor="Username">Username</label>
        <input type="text" name="username" id="Username" />
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <input type="password" name="password" id="Password" />
      </div>
      <button type="submit">Kirim</button>
    </form>
  );
};
