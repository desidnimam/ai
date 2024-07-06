"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@designali/ui";

export default function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="space-y-4 p-3">
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="w-full rounded-xl object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              "mr-2   cursor-pointer border hover:border-orange-600",
              current === index && "  border-orange-500",
            )}
            onClick={() => setCurrent(index)}
          >
            <Image src={image} alt={"image"} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
