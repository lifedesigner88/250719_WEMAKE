import { bigint, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "~/features/jobs/constants/constants";

export const jobTypes = pgEnum("job_type", JOB_TYPES.map(type => type.value) as [string, ...string[]]);
export const jobLocations = pgEnum("job_location", LOCATION_TYPES.map(type => type.value) as [string, ...string[]]);
export const salaryRange = pgEnum("salay_rage", SALARY_RANGE.map(range => range) as [string, ...string[]])

export const jobs = pgTable("jobs", {
    job_id: bigint({mode:"number"}).primaryKey().generatedAlwaysAsIdentity(),
    position : text().notNull(),
    overview : text().notNull(),
    responsibilities : text().notNull(),
    qualifications : text().notNull(),
    benefits: text().notNull(),
    skills:text().notNull(),
    company_name: text().notNull(),
    company_logo_url : text().notNull(),
    company_location : text().notNull(),
    apply_url : text().notNull(),
    job_types: jobTypes().notNull(),
    job_location: jobLocations().notNull(),
    salary_range: salaryRange().notNull(),
    create_at: timestamp().notNull().defaultNow(),
    update_at: timestamp().notNull().defaultNow(),
})