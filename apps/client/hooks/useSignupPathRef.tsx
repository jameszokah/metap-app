import { useEffect, useRef } from "react";

export const useSignupPathRef = () => {
  const signupBtnRef = useRef<HTMLButtonElement>(null);


  return signupBtnRef;
}
