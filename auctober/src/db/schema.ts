import {
    pgTable, serial, text
} from "drizzle-orm/pg-core";

export const bids = pgTable("auc_bids", {
    id: serial("id").primaryKey() //.primary key removed:errors
})