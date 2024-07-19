export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Designali";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "The Deaignali built with Next.js, Postgres, Shadcn";

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["Paytm", "Stripe"];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"];

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};



export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  price: "0",
  stock: 5,
  rating: "5",
  numReviews: 0,
  isFeatured: false,
  banner: null,
};

export const reviewFormDefaultValues = {
  title: "",
  comment: "",
  rating: 5,
};
