"use client";
import { useEffect, useRef } from "react";
import { useScrollScenes } from "@/components/shared/useScrollScenes";
export function OrionMotion() {
  const root = useRef<HTMLElement | null>(null);
  useEffect(() => { root.current = document.querySelector(".orion-page"); }, []);
  useScrollScenes(root, "orion");
  return null;
}
