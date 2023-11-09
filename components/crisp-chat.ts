"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0fb2c808-5aff-4cd6-8a43-5ef67852dca5");
  }, []);

  return null;
};