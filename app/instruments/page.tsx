import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

async function InstrumentsContent() {
  const supabase = await createClient();
  const { data: instruments, error } = await supabase
    .from("instruments")
    .select();
  if (error) {
    console.error("Error fetching instruments:", error);
  }
  console.log("All instruments:", instruments);
  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}

export default function Instruments() {
  return (
    <Suspense fallback={<div>Loading instruments...</div>}>
      <InstrumentsContent />
    </Suspense>
  );
}
