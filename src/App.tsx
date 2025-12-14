import "./index.css";
import { useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Learner from "./pages/Learner/learner";
import LearnerSignup, {
  type LearnerSignupForm,
} from "./pages/signup/LearnerSignup";
import LearnerPreferences from "./pages/signup/LearnerPreferences";

type Registration = {
  account?: LearnerSignupForm;
};

export default function App() {
  const navigate = useNavigate();
  const [registration, setRegistration] = useState<Registration>({});

  const displayName = useMemo(() => {
    const name = registration.account?.fullName?.trim();
    return name ? name : undefined;
  }, [registration.account?.fullName]);

  const handleAccountSubmit = (data: LearnerSignupForm) => {
    setRegistration({ account: data });
    navigate("/signup/preferences");
  };

  const handlePreferencesNext = (_payload: any) => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />

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
                onNext={handlePreferencesNext}
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
