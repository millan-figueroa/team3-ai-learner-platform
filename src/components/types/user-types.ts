export interface StudentTopic {
    // specific topic, e.g. Algebra II
    topic: string;
    // topic Id starts with the letter I, followed by 5 digits
    topicId: string;
    // overall category, such as Math for for Albegra II
    category: string;
    // 0-100% grade assigned by tutor
    grade: number;
    // tutor Id assigned to this topic, might change to array later
    tutorId: string;

}

export interface TutorTopic {
    // specific topic, e.g. Algebra II
    topic: string;
    // topic Id starts with  the letter I, followed by 5 digits
    topicId: string;
    // overall category, such as Math for for Albegra II
    category: string;
    // 1-5 rating provided by student feedback
    rating: number;
    // optional array of student Ids that the tutor tutors
    students?: string[];
}

export interface StudentAward {
    // topicId
    topic: string;
    // title of award
    type: string;
}

export interface ScheduleAvailability {
    // weekday
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
    // start time available for that day, in 1 hour blocks, military time
    time: number;
}

export interface ScheduleBlock {
    // lesson Id starts withthe letter L, followed by 5 digits
    id: string;
    // specific day in UTC format
    day: string;
    // start time of lesson, in 1 hour block, military time
    time: number;
    // id of student being tutored
    studentId: string;
    // id of tutor providing the tutoring
    tutorId: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' 
}

export interface StudentProps {
    // first name of student
    nameFirst: string;
    // last name of student
    nameLast: string;
    // student Id starts with the letter S, followed by 5 digits
    studentId: string;
    // array of student subjects
    subjects: StudentTopic[];
    availability: ScheduleAvailability[];
    scheduledLessons: ScheduleBlock[];
    awards: StudentAward[]
}

export interface TutorProps {
    // first name of tutor
    nameFirst: string;
    // last name of tutor
    nameLast: string;
    // tutor Id starts with the letter T, followed by 5 digits
    tutorId: string;
    // array of tutor subjects
    subjects: TutorTopic[];
    availability: ScheduleAvailability[];
    scheduledLessons: ScheduleBlock[];
}
