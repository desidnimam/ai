CREATE TABLE IF NOT EXISTS "likes_session" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;