import type { ReactNode } from "react";

export default function MarketingLayout(props: { children: ReactNode }) {
  return <main>{props.children}</main>;
}
