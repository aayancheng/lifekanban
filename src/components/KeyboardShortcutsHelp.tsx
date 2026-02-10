import Modal from './Modal'
import Button from './Button'

interface KeyboardShortcutsHelpProps {
  isOpen: boolean
  onClose: () => void
}

const shortcuts = [
  { category: 'Navigation', items: [
    { keys: ['K'], description: 'Go to All Tasks board' },
    { keys: ['H'], description: 'Switch to Health board' },
    { keys: ['F'], description: 'Switch to Family board' },
    { keys: ['L'], description: 'Switch to Learning board' },
  ]},
  { category: 'Actions', items: [
    { keys: ['N'], description: 'Create new task' },
    { keys: ['C'], description: 'Create new task' },
    { keys: ['/'], description: 'Focus search bar' },
    { keys: ['Esc'], description: 'Close modals/dialogs' },
  ]},
  { category: 'Editing', items: [
    { keys: ['Ctrl/⌘', 'Z'], description: 'Undo last action' },
    { keys: ['Ctrl/⌘', 'Shift', 'Z'], description: 'Redo action' },
  ]},
  { category: 'Help', items: [
    { keys: ['?'], description: 'Show this help dialog' },
  ]},
]

export default function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Keyboard Shortcuts"
      footer={
        <Button onClick={onClose}>Close</Button>
      }
    >
      <div className="space-y-6">
        {shortcuts.map((section) => (
          <div key={section.category}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              {section.category}
            </h3>
            <div className="space-y-2">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">{item.description}</span>
                  <div className="flex items-center space-x-1">
                    {item.keys.map((key, keyIndex) => (
                      <span key={keyIndex}>
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                          {key}
                        </kbd>
                        {keyIndex < item.keys.length - 1 && (
                          <span className="mx-1 text-gray-400">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
