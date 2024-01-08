import { createContext } from "react";

// todo: drop
export interface AuthInfo {
  user: {
    name: string;
  };
}

export const anonymousUser = {
  name: "Anonymous",
};

export const AuthContext = createContext<AuthInfo>({ user: anonymousUser });
