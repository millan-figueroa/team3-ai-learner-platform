import "./index.css";
import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Learner from "./pages/Learner/learner";
import LearnerSignup, {
  type LearnerSignupForm,
} from "./pages/signup/LearnerSignup";
import LearnerPreferences from "./pages/signup/LearnerPreferences";

const STORAGE_KEY = "learner-registration";

<<<<<<< HEAD
  // Check if current route is alumni page
  const isAlumniRoute = currentPath.startsWith("/alumni-");
  
  // Check if current route is learner page
  const isLearnerRoute = currentPath.startsWith('/learner-');
  
  // Extract username from alumni route
  const getAlumniUsername = (): string | undefined => {
    if (isAlumniRoute) {
      return currentPath.replace("/alumni-", "").replace(/-/g, " ");
    }
    return undefined;
=======
type Registration = {
  account?: LearnerSignupForm;
  // not saving preferences for demo, but we can still store them if you want
  preferences?: any;
};

const loadRegistration = (): Registration => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Registration) : {};
  } catch {
    return {};
  }
};

const persistRegistration = (data: Registration) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function App() {
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration>(() =>
    loadRegistration()
  );

  useEffect(() => {
    persistRegistration(registration);
  }, [registration]);

  const displayName = useMemo(() => {
    const name = registration.account?.fullName?.trim();
    return name ? name : undefined;
  }, [registration.account?.fullName]);

  const handleAccountSubmit = (data: LearnerSignupForm) => {
    setRegistration((prev) => ({ ...prev, account: data }));
    navigate("/signup/preferences");
>>>>>>> millan/auth-flow
  };

  // matches LearnerPreferences: onNext(preferences: any)
  const handlePreferencesSubmit = (preferences: any) => {
    // optional: keep for demo debug (safe even if you don’t use it)
    setRegistration((prev) => ({ ...prev, preferences }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* optional shortcut */}
        <Route
          path="/signup"
          element={<Navigate to="/signup/account" replace />}
        />

        <Route
          path="/signup/account"
          element={<LearnerSignup onNext={handleAccountSubmit} />}
        />

        <Route
          path="/signup/preferences"
          element={
            registration.account ? (
              <LearnerPreferences
                learnerData={registration.account}
                onNext={handlePreferencesSubmit}
              />
            ) : (
              <Navigate to="/signup/account" replace />
            )
          }
        />

        <Route path="/dashboard" element={<Learner username={displayName} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
