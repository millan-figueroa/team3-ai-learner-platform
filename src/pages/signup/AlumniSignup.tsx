import React, { useState } from "react";

// this type describes the shape of the alumni signup form data
export type AlumniSignupForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// props the component expects
// onnext is a function passed down from app.tsx
// it tells the app when this step is finished
interface Props {
  onNext: (data: AlumniSignupForm) => void;
}

// this component renders the alumni signup form
export default function AlumniSignup({ onNext }: Props) {
  // local state to store what the user types into the form
  const [form, setForm] = useState<AlumniSignupForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // local state to store simple error messages
  const [errors, setErrors] = useState<
    Partial<Record<keyof AlumniSignupForm, string>>
  >({});

  // helper function to check if an email looks valid
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // this function checks the form and returns any errors
  const validate = (data: AlumniSignupForm) => {
    const nextErrors: Partial<Record<keyof AlumniSignupForm, string>> = {};

    if (!data.fullName.trim()) {
      nextErrors.fullName = "full name is required";
    }

    if (!data.email.trim()) {
      nextErrors.email = "email is required";
    } else if (!isValidEmail(data.email)) {
      nextErrors.email = "email is not valid";
    }

    if (!data.password) {
      nextErrors.password = "password is required";
    } else if (data.password.length < 8) {
      nextErrors.password = "password must be at least 8 characters";
    }

    if (!data.confirmPassword) {
      nextErrors.confirmPassword = "confirm your password";
    } else if (data.password !== data.confirmPassword) {
      nextErrors.confirmPassword = "passwords do not match";
    }

    return nextErrors;
  };

  // this updates form state whenever the user types
  const onChange =
    (key: keyof AlumniSignupForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  // this runs when the user clicks the next button
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // check for errors
    const validationErrors = validate(form);
    setErrors(validationErrors);

    // if there are errors, stop here
    if (Object.keys(validationErrors).length > 0) return;

    // if everything is valid, send the data to the parent
    // app.tsx will handle navigation to alumni preferences
    onNext(form);
  };

  return (
    <div>
      <h1>alumni sign up</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>full name</label>
          <input value={form.fullName} onChange={onChange("fullName")} />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>

        <div>
          <label>email</label>
          <input type="email" value={form.email} onChange={onChange("email")} />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>password</label>
          <input
            type="password"
            value={form.password}
            onChange={onChange("password")}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <label>confirm password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={onChange("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <button type="submit">next</button>
      </form>
    </div>
  );
}
