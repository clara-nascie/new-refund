import { Routes, Route } from "react-router";
import { AppLayout } from "@/components/AppLayout";
import { Dashboard } from "../pages/Dashboard";
import { NotFound } from "../pages/notFound";

export function ManagerRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}