import { useTasks } from '../../contexts/TasksContext'
import { useState } from 'react'
import TaskModal from '../tasks/TaskModal'

export default function Dashboard() {
  const { tasks } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const todoTasks = tasks.filter(t => t.status === 'todo')
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress')
  const doneTasks = tasks.filter(t => t.status === 'done')

  const healthTasks = tasks.filter(t => t.domain === 'health')
  const familyTasks = tasks.filter(t => t.domain === 'family')
  const learningTasks = tasks.filter(t => t.domain === 'learning')

  // Calculate total time tracked
  const totalTimeTracked = tasks.reduce((acc, task) => acc + task.timeTracking.totalSeconds, 0)
  const formatTotalTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}h ${mins}m`
    return `${mins}m`
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-ink-400 uppercase tracking-wider">
            Overview
          </p>
          <h1 className="font-display text-4xl font-semibold text-ink-900">
            Dashboard
          </h1>
          <p className="text-ink-500 mt-2">
            Track your progress across all life domains
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Task</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* To Do */}
        <div className="stat-card animate-fade-in stagger-1 text-ink-600">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-ink-100 rounded-xl">
                <svg className="w-5 h-5 text-ink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-sm font-medium text-ink-500">To Do</span>
            </div>
            <p className="font-display text-4xl font-semibold text-ink-900">{todoTasks.length}</p>
            <p className="text-sm text-ink-400 mt-1">tasks pending</p>
          </div>
        </div>

        {/* In Progress */}
        <div className="stat-card animate-fade-in stagger-2 text-family">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-family-light rounded-xl">
                <svg className="w-5 h-5 text-family" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-ink-500">In Progress</span>
            </div>
            <p className="font-display text-4xl font-semibold text-family">{inProgressTasks.length}</p>
            <p className="text-sm text-ink-400 mt-1">actively working</p>
          </div>
        </div>

        {/* Completed */}
        <div className="stat-card animate-fade-in stagger-3 text-health">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-health-light rounded-xl">
                <svg className="w-5 h-5 text-health" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-ink-500">Completed</span>
            </div>
            <p className="font-display text-4xl font-semibold text-health">{doneTasks.length}</p>
            <p className="text-sm text-ink-400 mt-1">tasks done</p>
          </div>
        </div>

        {/* Time Tracked */}
        <div className="stat-card animate-fade-in stagger-4 text-accent">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 bg-accent-light rounded-xl">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-ink-500">Time Tracked</span>
            </div>
            <p className="font-display text-4xl font-semibold text-accent">
              {totalTimeTracked > 0 ? formatTotalTime(totalTimeTracked) : '0m'}
            </p>
            <p className="text-sm text-ink-400 mt-1">total focus time</p>
          </div>
        </div>
      </div>

      {/* Domain Overview */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink-900">Life Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Health Domain */}
          <div className="card p-6 animate-fade-in stagger-4 group hover:shadow-glow-health">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-health-light flex items-center justify-center">
                  <svg className="w-5 h-5 text-health" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900">Health</h3>
                  <p className="text-xs text-ink-400">Physical & mental wellness</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-health animate-pulse-soft" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-3xl font-semibold text-ink-900">{healthTasks.length}</p>
                <p className="text-sm text-ink-400">tasks</p>
              </div>
              <a
                href="/board/health"
                className="text-sm font-medium text-health hover:text-health-dark transition-colors flex items-center space-x-1"
              >
                <span>View board</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Family Domain */}
          <div className="card p-6 animate-fade-in stagger-5 group hover:shadow-glow-family">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-family-light flex items-center justify-center">
                  <svg className="w-5 h-5 text-family" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900">Family</h3>
                  <p className="text-xs text-ink-400">Relationships & home</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-family animate-pulse-soft" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-3xl font-semibold text-ink-900">{familyTasks.length}</p>
                <p className="text-sm text-ink-400">tasks</p>
              </div>
              <a
                href="/board/family"
                className="text-sm font-medium text-family hover:text-family-dark transition-colors flex items-center space-x-1"
              >
                <span>View board</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Learning Domain */}
          <div className="card p-6 animate-fade-in stagger-6 group hover:shadow-glow-learning">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-learning-light flex items-center justify-center">
                  <svg className="w-5 h-5 text-learning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink-900">Learning</h3>
                  <p className="text-xs text-ink-400">Growth & education</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-learning animate-pulse-soft" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-3xl font-semibold text-ink-900">{learningTasks.length}</p>
                <p className="text-sm text-ink-400">tasks</p>
              </div>
              <a
                href="/board/learning"
                className="text-sm font-medium text-learning hover:text-learning-dark transition-colors flex items-center space-x-1"
              >
                <span>View board</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
