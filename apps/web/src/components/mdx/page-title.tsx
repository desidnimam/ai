"use client";

import { Separator } from "@designali/ui/separator";
import { motion } from "framer-motion";

type PageTitleProps = {
  title: string;
  description: string;
  animate?: boolean;
};

const animation = {
  hide: {
    x: 0,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

const PageTitle = (props: PageTitleProps) => {
  const { title, description, animate = true } = props;

  return (
    <div className="mb-16 mt-6 text-center sm:mb-24 sm:mt-12">
      <motion.h2
        className="my-4 inline-flex items-baseline bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 bg-clip-text px-6 pb-1 text-2xl font-bold text-transparent dark:bg-gradient-to-r dark:from-slate-600 dark:via-slate-200 dark:to-slate-600 dark:bg-clip-text sm:text-5xl"
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
        })}
      >
        {title}
      </motion.h2>
      <motion.p
        className="mb-6 text-sm text-slate-600 dark:text-slate-400"
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
          transition: {
            delay: 0.05,
          },
        })}
      >
        {description}
      </motion.p>
      <Separator className="absolute inset-x-0 translate-y-2 opacity-25 sm:translate-y-6" />
    </div>
  );
};

export default PageTitle;
