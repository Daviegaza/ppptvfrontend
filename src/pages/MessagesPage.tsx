import { useState } from 'react'
import { useApp } from '../context/AppContext'

export const MessagesPage = () => {
  const { conversations, sendMessage } = useApp()
  const [active, setActive] = useState(conversations[0]?.id ?? '')
  const [text, setText] = useState('')
  const thread = conversations.find(c => c.id === active)
  const totalUnread = conversations.reduce((s,c) => s+c.unread, 0)

  const send = () => {
    if (!text.trim() || !active) return
    sendMessage(active, text.trim())
    setText('')
  }

  return (
    <>
      <div className="page-hdr"><div className="page-title">Messages {totalUnread > 0 && <span style={{ fontSize:14, fontWeight:700, color:'var(--blue)', marginLeft:6 }}>({totalUnread})</span>}</div></div>
      <div style={{ display:'flex', height:'calc(100vh - 95px)' }}>
        {/* Thread list */}
        <div style={{ width:300, borderRight:'1px solid var(--border)', overflow:'auto', flexShrink:0 }}>
          {conversations.map(c => (
            <div key={c.id} onClick={() => setActive(c.id)} style={{ display:'flex', gap:12, padding:'14px 16px', borderBottom:'1px solid var(--border)', cursor:'pointer', background: active===c.id ? 'var(--surface2)' : c.unread>0 ? 'rgba(59,130,246,0.04)' : 'transparent' }}
              onMouseEnter={e => active!==c.id && (e.currentTarget.style.background='var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background = active===c.id ? 'var(--surface2)' : c.unread>0 ? 'rgba(59,130,246,0.04)' : 'transparent')}
            >
              <div className="av av40" style={{ background:c.participant.avatarColor, flexShrink:0 }}>{c.participant.name[0]}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:14, fontWeight:c.unread>0?700:600 }}>{c.participant.name}</span>
                  <span style={{ fontSize:11, color:'var(--muted2)', fontFamily:'var(--font-mono)' }}>{c.lastTimestamp}</span>
                </div>
                <div style={{ fontSize:12, color:'var(--muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:2 }}>{c.lastMessage}</div>
              </div>
              {c.unread > 0 && <div style={{ width:18, height:18, borderRadius:'50%', background:'var(--blue)', color:'#fff', fontSize:10, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:10 }}>{c.unread}</div>}
            </div>
          ))}
        </div>

        {/* Message area */}
        {thread ? (
          <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
            {/* Header */}
            <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12, background:'var(--surface)' }}>
              <div className="av av40" style={{ background:thread.participant.avatarColor }}>{thread.participant.name[0]}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:15 }}>{thread.participant.name}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>@{thread.participant.handle}</div>
              </div>
            </div>
            {/* Messages */}
            <div style={{ flex:1, overflow:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:12 }}>
              {thread.messages.map(m => {
                const isMe = m.from.id === 'me' || m.from.handle === 'youhandle'
                return (
                  <div key={m.id} style={{ display:'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                    {!isMe && <div className="av av32" style={{ background:m.from.avatarColor, marginRight:8, flexShrink:0 }}>{m.from.name[0]}</div>}
                    <div style={{ maxWidth:'70%' }}>
                      <div style={{ padding:'10px 14px', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: isMe ? 'var(--accent)' : 'var(--surface2)', color: isMe ? '#fff' : 'var(--text)', fontSize:14, lineHeight:1.5 }}>{m.content}</div>
                      <div style={{ fontSize:11, color:'var(--muted2)', marginTop:4, textAlign: isMe?'right':'left', fontFamily:'var(--font-mono)' }}>{m.timestamp}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Input */}
            <div style={{ padding:'12px 16px', borderTop:'1px solid var(--border)', display:'flex', gap:10 }}>
              <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Write a message…" style={{ flex:1, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--r-full)', padding:'10px 16px', fontSize:14, color:'var(--text)', fontFamily:'var(--font-body)', outline:'none' }} />
              <button onClick={send} disabled={!text.trim()} style={{ padding:'10px 20px', background:'var(--accent)', color:'#fff', border:'none', borderRadius:'var(--r-full)', fontFamily:'var(--font-display)', fontWeight:800, fontSize:13, cursor: text.trim()?'pointer':'not-allowed', opacity: text.trim()?1:0.5 }}>Send</button>
            </div>
          </div>
        ) : (
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>💬</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:800 }}>Select a conversation</div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
