import { useState, useEffect } from 'react'
import { Task, Domain, Priority, TaskStatus } from '../../types'
import { useTasks } from '../../contexts/TasksContext'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import { getTemplatesByDomain, getTemplateById } from '../templates/taskTemplates'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  taskToEdit?: Task
  defaultDomain?: Domain
}

export default function TaskModal({ isOpen, onClose, taskToEdit, defaultDomain }: TaskModalProps) {
  const { addTask, updateTask } = useTasks()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [domain, setDomain] = useState<Domain>('health')
  const [priority, setPriority] = useState<Priority>('medium')
  const [status, setStatus] = useState<TaskStatus>('todo')
  const [dueDate, setDueDate] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')

  // Load task data when editing
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description)
      setDomain(taskToEdit.domain)
      setPriority(taskToEdit.priority)
      setStatus(taskToEdit.status)
      setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '')
      setSelectedTemplate(taskToEdit.templateType || '')
    } else {
      // Reset form for new task
      setTitle('')
      setDescription('')
      setDomain(defaultDomain || 'health')
      setPriority('medium')
      setStatus('todo')
      setDueDate('')
      setSelectedTemplate('')
    }
  }, [taskToEdit, isOpen, defaultDomain])

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)

    if (templateId) {
      const template = getTemplateById(templateId)
      if (template) {
        setTitle(template.defaultTitle)
        setDescription(template.defaultDescription)
        setDomain(template.domain)
        setPriority(template.defaultPriority)
      }
    }
  }

  const availableTemplates = getTemplatesByDomain(domain)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      domain,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      templateType: selectedTemplate || undefined,
    }

    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData)
    } else {
      addTask(taskData)
    }

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? 'Edit Task' : 'Create New Task'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()}>
            {taskToEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Template Selection (only for new tasks) */}
        {!taskToEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Use Template (Optional)
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="">No template - start from scratch</option>
              {availableTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {/* Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Domain <span className="text-red-500">*</span>
          </label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as Domain)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="health">Health</option>
            <option value="family">Family</option>
            <option value="learning">Learning</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
      </form>
    </Modal>
  )
}
