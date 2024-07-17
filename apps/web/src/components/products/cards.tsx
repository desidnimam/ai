"use client";

import Link from "next/link";
import { CardStack } from "@/components/ui/image-card";

const GRADS = [
  {
    id: 0,
    name: "Graaadients",
    src: "/images/products/grad-full.jpg",
    designation: "Download. Edit. Upload.",
    content: (
      <p>
        +1000 abstract gradient elements and backgrounds for your amazing design
        projects.
      </p>
    ),
  },
];

const ICONS3D = [
  {
    id: 1,
    name: "3D Icons",
    src: "/images/products/3dicons.jpg",
    designation: "Download. Edit. Upload.",
    content: <p>+100 Beautifully designed components.</p>,
  },
];

export function Graaadients() {
  return (
    <div className="grid justify-center">
      <Link href="/products/graaadients">
        <CardStack items={GRADS} />
      </Link>
    </div>
  );
}
