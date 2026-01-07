export type LearnerProgress = {
    sessionsCompleted: number;
    activeMentors: number;
    nextSession?: string; // display string for now
    streakDays: number;
};