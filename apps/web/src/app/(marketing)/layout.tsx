import type { ReactNode } from "react";

export default function MarketingLayout(props: { children: ReactNode }) {
  return <main className="flex-1">{props.children}</main>;
}
