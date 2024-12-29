import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const repositories = sqliteTable("repositories", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const commits = sqliteTable("commits", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  repository_id: integer("repository_id").references(() => repositories.id),
  message: text("message"),
  commiter: text("commiter"),
  created_at: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const files = sqliteTable("files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  commit_id: integer("commit_id").references(() => commits.id),
  name: text("name"),
  size: text("size"),
  upload_url: text("upload_url"),
  created_at: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const commit_histories = sqliteTable("commit_histories", {
  commit_id: integer("commit_id")
    .primaryKey()
    .references(() => commits.id),
  previous_commit_id: integer("previous_commit_id").references(
    () => commits.id
  ),
});
