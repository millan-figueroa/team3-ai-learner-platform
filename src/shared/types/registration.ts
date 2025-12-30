import type { LearnerSignupForm } from "../../pages/signup/LearnerSignup";
import type { MentorSignupForm } from "../../pages/signup/MentorSignup";

export const LEARNER_STORAGE_KEY = "learner-registration";
export const MENTOR_STORAGE_KEY = "mentor-registration";

export type LearnerRegistration = {
    account?: LearnerSignupForm;
    preferences?: any;
};

export type MentorRegistration = {
    account?: MentorSignupForm; // rename later in Phase 2 when file moves
    preferences?: any;
};
