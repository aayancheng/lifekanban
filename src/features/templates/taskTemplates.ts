import { TaskTemplate } from '../../types'

export const DEFAULT_TEMPLATES: TaskTemplate[] = [
  // Health Templates
  {
    id: 'doctor_appointment',
    name: 'Doctor Appointment',
    domain: 'health',
    defaultPriority: 'high',
    defaultTitle: 'Doctor Appointment',
    defaultDescription: 'Schedule and attend doctor appointment.\n\nLocation: \nTime: \nNotes: ',
  },
  {
    id: 'workout_session',
    name: 'Workout Session',
    domain: 'health',
    defaultPriority: 'medium',
    defaultTitle: 'Workout Session',
    defaultDescription: 'Complete workout routine.\n\nType: \nDuration: \nExercises: ',
  },
  {
    id: 'medication_refill',
    name: 'Medication Refill',
    domain: 'health',
    defaultPriority: 'high',
    defaultTitle: 'Medication Refill',
    defaultDescription: 'Refill medication prescription.\n\nMedication: \nPharmacy: \nPrescription #: ',
  },
  // Family Templates
  {
    id: 'family_event',
    name: 'Family Event',
    domain: 'family',
    defaultPriority: 'medium',
    defaultTitle: 'Family Event',
    defaultDescription: 'Plan and attend family event.\n\nEvent: \nLocation: \nAttendees: \nPreparation: ',
  },
  {
    id: 'quality_time',
    name: 'Quality Time Activity',
    domain: 'family',
    defaultPriority: 'medium',
    defaultTitle: 'Quality Time Activity',
    defaultDescription: 'Spend quality time with family.\n\nActivity: \nParticipants: \nDuration: ',
  },
  {
    id: 'household_task',
    name: 'Household Task',
    domain: 'family',
    defaultPriority: 'low',
    defaultTitle: 'Household Task',
    defaultDescription: 'Complete household chore or task.\n\nTask: \nEstimated time: \nSupplies needed: ',
  },
  // Learning Templates
  {
    id: 'online_course',
    name: 'Online Course',
    domain: 'learning',
    defaultPriority: 'medium',
    defaultTitle: 'Online Course',
    defaultDescription: 'Work on online course or module.\n\nCourse: \nPlatform: \nModule/Lesson: \nDuration: ',
  },
  {
    id: 'book_reading',
    name: 'Book Reading',
    domain: 'learning',
    defaultPriority: 'low',
    defaultTitle: 'Book Reading',
    defaultDescription: 'Read book or chapters.\n\nBook title: \nAuthor: \nPages/Chapters: \nGoal: ',
  },
  {
    id: 'skill_practice',
    name: 'Skill Practice',
    domain: 'learning',
    defaultPriority: 'medium',
    defaultTitle: 'Skill Practice',
    defaultDescription: 'Practice a specific skill.\n\nSkill: \nResources: \nPractice goals: \nDuration: ',
  },
]

export function getTemplatesByDomain(domain: string) {
  return DEFAULT_TEMPLATES.filter(t => t.domain === domain)
}

export function getTemplateById(id: string) {
  return DEFAULT_TEMPLATES.find(t => t.id === id)
}
