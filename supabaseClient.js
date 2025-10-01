import { createClient } from "@supabase/supabase-js";
import { apiKey } from "./api";

export const supabase = createClient(
  "https://uhuiorndhqpwghpjonfq.supabase.co",
  apiKey
);
