import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  varchar,
  serial,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";

export const lessonTypeEnum = pgEnum("lesson_type", [
  "video",
  "text",
  "quiz",
  "assignment",
  "project",
  "live",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  total_xp: integer("total_xp").default(0),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  company_id: integer("company_id").references(() => companies.id),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  logo_url: varchar("logo_url", { length: 500 }).default(""),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  company_id: integer("company_id")
    .notNull()
    .references(() => companies.id),
  total_xp: integer("total_xp").default(0),
  category: varchar("category", { length: 100 }),
  level: varchar("level", { length: 50 }),
  is_published: boolean("is_published").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  type: lessonTypeEnum("type").notNull(),
  course_id: integer("course_id")
    .notNull()
    .references(() => courses.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"), // JSON stored as string for flexibility
  order: integer("order").notNull(),
  xp: integer("xp").default(10).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  xp_threshold: integer("xp_threshold").notNull(),
});
export const userBadges = pgTable(
  "user_badges",
  {
    user_id: text("user_id")
      .references(() => user.id)
      .notNull(),
    badge_id: integer("badge_id")
      .references(() => badges.id)
      .notNull(),
    awarded_at: timestamp("awarded_at").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.user_id, t.badge_id] })]
);

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(user, {
    fields: [userBadges.user_id],
    references: [user.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badge_id],
    references: [badges.id],
  }),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
  users: many(userBadges),
}));

export const userCompletedLessons = pgTable(
  "user_completed_lessons",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    lessonId: integer("lesson_id")
      .notNull()
      .references(() => lessons.id),
    completed_at: timestamp("completed_at").defaultNow().notNull(),
    xp_earned: integer("xp_earned").default(0).notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })]
);

export const userRelations = relations(user, ({ many, one }) => ({
  badges: many(userBadges),
  company: one(companies, {
    fields: [user.company_id],
    references: [companies.id],
  }),
  lessons: many(userCompletedLessons),
}));

export const courseRelations = relations(courses, ({ many, one }) => ({
  lessons: many(lessons),
  company: one(companies, {
    fields: [courses.company_id],
    references: [companies.id],
  }),
}));

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.course_id],
    references: [courses.id],
  }),
  users: many(userCompletedLessons),
}));

export const userCompletedLessonsRelations = relations(
  userCompletedLessons,
  ({ one }) => ({
    user: one(user, {
      fields: [userCompletedLessons.userId],
      references: [user.id],
    }),
    lesson: one(lessons, {
      fields: [userCompletedLessons.lessonId],
      references: [lessons.id],
    }),
  })
);
