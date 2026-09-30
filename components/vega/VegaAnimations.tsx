"use client";
import { useEffect, useRef } from "react";
import { useScrollScenes } from "@/components/shared/useScrollScenes";
export function VegaAnimations() {
  const root = useRef<HTMLElement | null>(null);
  useEffect(() => { root.current = document.querySelector("#vega-page"); }, []);
  useScrollScenes(root, "vega");
  return null;
}
