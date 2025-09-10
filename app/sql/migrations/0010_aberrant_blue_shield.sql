ALTER TABLE "team" DROP CONSTRAINT "product_description_check";--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "leader_id" uuid;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_leader_id_profiles_profile_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "product_description_check" CHECK (LENGTH
            ("team"."product_description")
            <= 200);