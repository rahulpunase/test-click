import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import React from "react";

/**
 * Check if a child matches a specific type or displayName
 */
export function isChildByType(
  child: React.ReactNode,
  type: React.ElementType | string,
): boolean {
  if (!React.isValidElement(child)) return false;

  if (typeof type === "string") {
    return (child.type as { displayName?: string })?.displayName === type;
  }

  return (
    child.type === type ||
    (child.type as { displayName?: string })?.displayName ===
      (type as { displayName?: string })?.displayName
  );
}

/**
 * Find a specific child component by type or displayName
 * @param children - React children to search
 * @param type - Component type or displayName string to match
 * @returns The found child element or undefined
 */
export function getChildByType(
  children: React.ReactNode,
  type: React.ElementType | string,
): React.ReactElement | undefined {
  const childrenArray = React.Children.toArray(children);
  return childrenArray.find((child) => isChildByType(child, type)) as
    | React.ReactElement
    | undefined;
}
