"use client";

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

export default async function ProductListView() {
  const data = await supabase.from("products").select("*");
}
