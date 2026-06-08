import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  // Guardamos la fecha como un string ISO (ej: 2026-06-08T...)
  createdAt: text('created_at').default(new Date().toISOString()),
});