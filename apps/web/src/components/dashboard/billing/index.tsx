import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@designali/ui/button";

import PageTitle from "../../mdx/page-title";

const tiers = [
  {
    name: "Basic",
    id: "tier-hobby",
    href: "#",
    priceMonthly: "₹4999",
    description:
      "Modi dolorem expedita deleniti. Corporis iste qui inventore pariatur adipisci vitae.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
  },
  {
    name: "Premium",
    id: "tier-team",
    href: "#",
    priceMonthly: "₹9999",
    description:
      "Explicabo quo fugit vel facere ullam corrupti non dolores. Expedita eius sit sequi.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
  },
];

export default function FUIPricingWithSpecialTwo() {
  return (
    <div className="relative isolate overflow-hidden bg-transparent">
      <div className="-z-1 absolute inset-0  h-[600px] w-full bg-transparent bg-[linear-gradient(to_right,#505050_1px,transparent_1px),linear-gradient(to_bottom,#505050_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <PageTitle
          title="Pricing"
          description={`The right price for you,  whoever you are`}
        />
        <div className="relative mt-6 opacity-10">
          <svg
            viewBox="0 0 1208 1024"
            className="-z-8 absolute -top-10 left-1/2 h-[64rem] -translate-x-1/2 opacity-70 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="z-20 flow-root bg-transparent pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="z-10 flex flex-col justify-between rounded-3xl  p-8 shadow-xl ring-1 ring-gray-900/10 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] sm:p-10"
                >
                  <div>
                    <h3
                      id={tier.id}
                      className="text-base font-semibold leading-7 text-ali"
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight ">
                        {tier.priceMonthly}
                      </span>
                      <span className="text-base font-semibold leading-7 ">
                        /month
                      </span>
                    </div>
                    <p className="mt-6 text-base leading-7 ">
                      {tier.description}
                    </p>
                    <ul
                      role="list"
                      className="mt-10 space-y-4 text-sm leading-6"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <Icons.check
                            className="h-6 w-5 flex-none text-green-400"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10">
                    <Button variant="default" size="lg">
                      <Link
                        href={tier.href}
                        aria-describedby={tier.id}
                        className=""
                      >
                        Get started today
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-gray-900/10 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] sm:gap-y-10 sm:p-10 lg:col-span-2  lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                  <h3 className="text-xl font-semibold leading-8 tracking-tight ">
                    Discounted
                  </h3>
                  <p className="mt-1 text-sm  leading-7 text-slate-600 dark:text-slate-400 ">
                    Dolor dolores repudiandae doloribus. Rerum sunt aut eum.
                    Odit omnis non voluptatem sunt eos nostrum.
                  </p>
                </div>
                <Button variant="outline" size="lg">
                  <Link href="#" className="">
                    Buy discounted license <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
