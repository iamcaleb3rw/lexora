import { InferSelectModel, relations, sql } from "drizzle-orm";

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
  vector,
  index,
  uuid,
} from "drizzle-orm/pg-core";

export const lessonTypeEnum = pgEnum("lesson_type", [
  "video",
  "text",
  "quiz",
  "assignment",
  "project",
  "live",
]);

export const difficultyTypeEnum = pgEnum("difficulty_level", [
  "novice",
  "intermediate",
  "expert",
]);

export const suggestionTypeEnum = pgEnum("suggestion_type", [
  "grammar", // e.g., grammar/spelling corrections
  "clarity", // unclear or wordy statements
  "impact", // low-impact wording (replace with strong verbs/results)
  "structure", // poor organization or flow
  "ats", // ATS keyword or formatting issue
  "tone", // tone too informal or inconsistent
  "consistency", // inconsistent tense, style, or formatting
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
  owner_id: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 255 }).notNull(),
  logo_url: varchar("logo_url", { length: 500 }).default(""),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow(),
});

export const courses = pgTable(
  "courses",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    thumbnail_url: text("thumbnail_url"),
    company_id: integer("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    is_published: boolean("is_published").default(false),
    created_at: timestamp("created_at").defaultNow(),
    embedding: vector("embedding", { dimensions: 3072 }),
  },
  (table) => [
    index("courses_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.title} || ' ' || coalesce(${table.description}, ''))`
    ),
  ]
);

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),
  owner_id: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  file_url: text("file_url").notNull(),
  ats_score: integer("ats_score").default(0),
  created_at: timestamp("created_at").defaultNow(),
  job_description: text("job_description"),
  job_title: text("job_title").notNull(),
});

export const resumeSuggestions = pgTable("resume_suggestions", {
  id: uuid("id").defaultRandom().primaryKey(),
  resume_id: uuid("resume_id")
    .references(() => resumes.id, { onDelete: "cascade" })
    .notNull(),
  start: integer("start").notNull(),
  end: integer("end").notNull(),
  issue: text("issue").notNull(),
  suggestion: text("suggestion").notNull(),
  replacement: text("replacement"),
  type: suggestionTypeEnum("type").default("grammar").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  type: lessonTypeEnum("type").notNull(),
  difficulty_level: difficultyTypeEnum("difficulty_level")
    .notNull()
    .default("novice"),
  course_id: integer("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  video_url: text("video_url"),
  deliverables: text("deliverables"), // JSON stored as string for flexibility
  order: integer("order").notNull(),
  xp: integer("xp").default(10).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  evaluation_criteria: text("evaluation_criteria"),
  feedback: text("feedback"),
  submission_url: text("submission_url"),
  embedding: vector("embedding", { dimensions: 3072 }),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  xp_threshold: integer("xp_threshold").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
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
  companies: many(companies),
  resumes: many(resumes),
  lessons: many(userCompletedLessons),
}));

export const resumeRelations = relations(resumes, ({ one, many }) => ({
  owner: one(user, {
    fields: [resumes.owner_id],
    references: [user.id],
  }),
  suggestions: many(resumeSuggestions),
}));

export const suggestionRelations = relations(resumeSuggestions, ({ one }) => ({
  resume: one(resumes, {
    fields: [resumeSuggestions.resume_id],
    references: [resumes.id],
  }),
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  owner: one(user, {
    fields: [companies.owner_id],
    references: [user.id],
  }),
  courses: many(courses),
}));

export const courseRelations = relations(courses, ({ many, one }) => ({
  lessons: many(lessons),
  categories: many(coursesToCategories),
  company: one(companies, {
    fields: [courses.company_id],
    references: [companies.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(coursesToCategories),
}));

export const coursesToCategories = pgTable("courses_to_categories", {
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export const coursesToCategoriesRelations = relations(
  coursesToCategories,
  ({ one }) => ({
    course: one(courses, {
      fields: [coursesToCategories.courseId],
      references: [courses.id],
    }),
    category: one(categories, {
      fields: [coursesToCategories.categoryId],
      references: [categories.id],
    }),
  })
);

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

export type Company = InferSelectModel<typeof companies>;
export type Course = InferSelectModel<typeof courses>;
export type CompanyWithCourses = {
  company: Company;
  courses: InferSelectModel<typeof courses> | null;
};
