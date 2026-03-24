import { useState } from 'react'
import { STORIES } from '../../data/mockData'

export const StoryRail = () => {
  const [seen, setSeen] = useState<string[]>([])

  return (
    <div className="stories">
      <div className="story">
        <div className="story-add">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--muted)" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
        <span className="story-name">Add story</span>
      </div>
      {STORIES.map(s => (
        <div
          key={s.id}
          className="story"
          onClick={() => setSeen(v => v.includes(s.id) ? v : [...v, s.id])}
          role="button"
        >
          <div className={`story-ring${seen.includes(s.id) ? ' seen' : ''}`}>
            <div className="story-in" style={{ background: s.color }}>
              {s.initials}
            </div>
          </div>
          {s.live && <span className="story-live-badge">LIVE</span>}
          <span className="story-name">{s.name}</span>
        </div>
      ))}
    </div>
  )
}
