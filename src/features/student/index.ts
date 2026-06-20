// Sub-services with generic names (get, store, update, destroy) must be imported
// directly from their specific path, e.g.:
//   import { get as getPersonal } from "@/features/student/services/personal"
//
// Uniquely-named exports are re-exported here for convenience.
export * from "./services/student";
export * from "./services/registration";