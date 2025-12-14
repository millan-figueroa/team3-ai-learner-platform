import { useMemo, useState } from "react";

export type LearnerSignupForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  cohort?: string;
};

interface Props {
  onNext: (data: LearnerSignupForm) => void;
}

type FieldErrors = Partial<Record<keyof LearnerSignupForm, string>>;

export default function LearnerSignup({ onNext }: Props) {
  const [form, setForm] = useState<LearnerSignupForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cohort: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [serverMessage, setServerMessage] = useState<string | null>(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validate = (data: LearnerSignupForm): FieldErrors => {
    const next: FieldErrors = {};

    if (!data.fullName.trim()) next.fullName = "Full name is required.";
    if (!data.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(data.email)) next.email = "Enter a valid email.";

    if (!data.password) next.password = "Password is required.";
    else if (data.password.length < 8)
      next.password = "Password must be at least 8 characters.";

    if (!data.confirmPassword)
      next.confirmPassword = "Please confirm password.";
    else if (data.password !== data.confirmPassword)
      next.confirmPassword = "Passwords do not match.";

    return next;
  };

  const canSubmit = useMemo(() => {
    const e = validate(form);
    return Object.keys(e).length === 0 && !isSubmitting;
  }, [form, isSubmitting]);

  //just updates local form state when user types, instead of saving to backend or create account its ready to pass to next step
  const onChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  // replacing the original onsubmit from previous code to integrate with our auth flow and save registration info correctly
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onNext(form);
  };

  // async function onSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setServerMessage(null);

  //   const nextErrors = validate(form);
  //   setErrors(nextErrors);
  //   if (Object.keys(nextErrors).length > 0) return;

  //   setIsSubmitting(true);
  //   try {
  //     // ✅ Replace this with your real endpoint later
  //     // Example:
  //     // const res = await fetch("/api/auth/signup-Learner", { ... })

  //     await new Promise((r) => setTimeout(r, 600)); // fake delay

  //     setServerMessage("Account created! You can log in now.");
  //     setForm({
  //       fullName: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //       cohort: "",
  //     });
  //   } catch (err) {
  //     setServerMessage("Signup failed. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Learner Sign Up
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Full Name</label>
            <input
              value={form.fullName}
              onChange={onChange("fullName")}
              required
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullName && (
              <p className="text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Email</label>
            <input
              value={form.email}
              onChange={onChange("email")}
              type="email"
              required
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Cohort (Optional)</label>
            <input
              value={form.cohort}
              onChange={onChange("cohort")}
              placeholder="Per Scholas - 2025"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Password</label>
            <div className="relative">
              <input
                value={form.password}
                onChange={onChange("password")}
                type={showPw ? "text" : "password"}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Confirm Password</label>
            <input
              value={form.confirmPassword}
              onChange={onChange("confirmPassword")}
              type={showPw ? "text" : "password"}
              required
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
