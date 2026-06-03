import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// 1. Tabla de Usuarios (Requerida por Better-Auth)
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

// 2. Tabla de Sesiones (Requerida por Better-Auth)
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

// 3. Tabla de Cuentas (Requerida por Better-Auth)
export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

// 4. Tabla de Verificaciones (Requerida por Better-Auth)
export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

// 5. NUESTRA TABLA: Proyectos Locales (Mínimo técnico del profesor)
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(), // Usaremos UUIDs en texto para evitar conflictos de ids incrementales en cliente
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url"), // Enlace opcional al despliegue o repo
  userId: text("userId") // Para saber qué usuario guardó este proyecto
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }), // Si se borra el usuario, se limpian sus proyectos
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});