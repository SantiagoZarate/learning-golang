ALTER TABLE "user" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_email_unique" UNIQUE("email");