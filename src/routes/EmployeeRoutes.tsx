import { Routes, Route } from "react-router";

import { Refund } from "../pages/Refund";
import { NotFound } from "../pages/notFound";
import { AppLayout } from "@/components/AppLayout";
import { Confirm } from "../pages/Confirm";

export function EmployeeRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Refund />} />
        <Route path="/confirm" element={<Confirm />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
