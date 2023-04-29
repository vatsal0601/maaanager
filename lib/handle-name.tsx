import * as React from "react";
import { z } from "zod";

export interface Name {
  value: string;
  error: string;
}

export const handleName = (
  name: Name,
  setName: React.Dispatch<React.SetStateAction<Name>>
) => {
  const nameSchema = z.string().min(3, "Name must be at least 3 characters");

  const result = nameSchema.safeParse(name.value);

  if (result.success === false) {
    setName(prev => ({ ...prev, error: result.error.issues[0].message }));
    return result.success;
  }

  setName({ value: result.data, error: "" });
  return result.success;
};
