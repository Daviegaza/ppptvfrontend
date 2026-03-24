interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'breaking'
}

const ICONS: Record<Toast['type'], string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  breaking:'🔴',
}

export const ToastContainer = ({ toasts }: { toasts: Toast[] }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast ${t.type}`}>
        <span style={{ fontWeight: 800 }}>{ICONS[t.type]}</span>
        <span>{t.message}</span>
      </div>
    ))}
  </div>
)
