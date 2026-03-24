import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import { AUTHORS } from '../../data/mockData'
import type { Post } from '../../types'

const MAX = 280
type Tab = 'post' | 'poll' | 'image'

export const ComposeBox = () => {
  const { addPost } = useApp()
  const [tab, setTab] = useState<Tab>('post')
  const [text, setText] = useState('')
  const [anon, setAnon] = useState(false)
  const [busy, setBusy] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreviewOk, setImagePreviewOk] = useState(false)
  const [postType, setPostType] = useState<'regular'|'news'|'breaking'>('regular')
  const [region, setRegion] = useState('')
  const [poll, setPoll] = useState({ question: '', options: ['', ''], duration: '1 day' })
  const taRef = useRef<HTMLTextAreaElement>(null)

  const left = MAX - text.length
  const overLimit = text.length > MAX
  const canSubmit = text.trim() && !overLimit && !busy

  const addPollOption = () => { if (poll.options.length < 4) setPoll(p => ({ ...p, options: [...p.options, ''] })) }
  const removePollOption = (i: number) => { if (poll.options.length > 2) setPoll(p => ({ ...p, options: p.options.filter((_,j) => j !== i) })) }
  const setPollOption = (i: number, val: string) => setPoll(p => ({ ...p, options: p.options.map((o,j) => j === i ? val : o) }))

  const submit = async () => {
    if (!canSubmit) return
    setBusy(true)
    await new Promise(r => setTimeout(r, 400))

    const now = new Date()
    const newPost: Post = {
      id: `p${Date.now()}`,
      author: anon ? { ...AUTHORS.sarah, name: 'Anonymous', handle: 'anon' } : AUTHORS.sarah,
      content: text.trim(),
      timestamp: 'just now',
      type: postType,
      likes: 0, comments: 0, reposts: 0, views: 0,
      isAnonymous: anon,
      image: (tab === 'image' && imagePreviewOk) ? imageUrl : undefined,
      region: region || undefined,
      isBreaking: postType === 'breaking',
      poll: tab === 'poll' && poll.question.trim() && poll.options.filter(o => o.trim()).length >= 2 ? {
        question: poll.question,
        options: poll.options.filter(o => o.trim()).map((o, i) => ({ id: i+1, text: o, votes: 0 })),
        totalVotes: 0,
        endsAt: poll.duration === '1 day' ? 'Tomorrow' : poll.duration === '3 days' ? 'In 3 days' : 'In 7 days',
        voted: null,
      } : undefined,
    }
    addPost(newPost)
    setText(''); setImageUrl(''); setImagePreviewOk(false); setRegion('')
    setPoll({ question: '', options: ['', ''], duration: '1 day' })
    setBusy(false)
    setTab('post')
    if (taRef.current) taRef.current.style.height = 'auto'
  }

  return (
    <div className="compose">
      {/* Compose type tabs */}
      <div style={{ display:'flex', gap:0, borderBottom:'1px solid var(--border)', marginBottom:12 }}>
        {(['post','image','poll'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:'8px 14px', fontSize:13, fontWeight: tab === t ? 700 : 500, color: tab === t ? 'var(--accent)' : 'var(--muted)', background:'none', border:'none', borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent', cursor:'pointer', fontFamily:'var(--font-body)', textTransform:'capitalize' }}>{t === 'image' ? '📸 Image' : t === 'poll' ? '📊 Poll' : '✏️ Post'}</button>
        ))}
      </div>

      <div className="compose-row">
        <div className="av av48" style={{ background: anon ? 'var(--surface3)' : 'linear-gradient(135deg,#ec4899,#f43f5e)', flexShrink:0 }}>
          {anon ? '?' : 'Y'}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          {/* Post type selector */}
          <div style={{ display:'flex', gap:6, marginBottom:8 }}>
            {(['regular','news','breaking'] as const).map(pt => (
              <button key={pt} onClick={() => setPostType(pt)} style={{ padding:'3px 10px', fontSize:11, fontWeight:700, borderRadius:'var(--r-full)', border:`1px solid ${postType === pt ? 'var(--accent)' : 'var(--border2)'}`, background: postType === pt ? 'var(--accent-bg)' : 'none', color: postType === pt ? 'var(--accent)' : 'var(--muted)', cursor:'pointer', fontFamily:'var(--font-display)', textTransform:'uppercase', letterSpacing:'0.5px' }}>
                {pt === 'breaking' ? '🔴 ' : pt === 'news' ? '📰 ' : '💬 '}{pt}
              </button>
            ))}
          </div>

          <textarea ref={taRef} className="compose-ta"
            placeholder={tab === 'poll' ? 'Add context for your poll (optional)…' : "What's happening?"}
            value={text} maxLength={MAX+20}
            onChange={e => { setText(e.target.value); const el = e.target; el.style.height='auto'; el.style.height=`${el.scrollHeight}px` }}
            onKeyDown={e => { if (e.key==='Enter' && (e.metaKey||e.ctrlKey)) submit() }}
          />

          {/* Image tab */}
          {tab === 'image' && (
            <div style={{ marginTop:8 }}>
              <input className="form-input" type="url" placeholder="Paste image URL…" value={imageUrl} onChange={e => { setImageUrl(e.target.value); setImagePreviewOk(false) }} style={{ marginBottom:8 }} />
              {imageUrl && (
                <div style={{ borderRadius:'var(--r-sm)', overflow:'hidden', border:'1px solid var(--border)', maxHeight:200 }}>
                  <img src={imageUrl} alt="preview" style={{ width:'100%', maxHeight:200, objectFit:'cover' }} onLoad={() => setImagePreviewOk(true)} onError={() => setImagePreviewOk(false)} />
                </div>
              )}
              {imageUrl && !imagePreviewOk && <div style={{ fontSize:12, color:'var(--accent)', marginTop:4 }}>⚠ Image could not be loaded — check the URL</div>}
            </div>
          )}

          {/* Poll tab */}
          {tab === 'poll' && (
            <div style={{ marginTop:8, padding:14, background:'var(--surface2)', borderRadius:'var(--r-md)', border:'1px solid var(--border)' }}>
              <input className="form-input" placeholder="Poll question…" value={poll.question} onChange={e => setPoll(p => ({ ...p, question: e.target.value }))} style={{ marginBottom:8 }} />
              {poll.options.map((opt, i) => (
                <div key={i} style={{ display:'flex', gap:8, marginBottom:6 }}>
                  <input className="form-input" placeholder={`Option ${i+1}`} value={opt} onChange={e => setPollOption(i, e.target.value)} style={{ flex:1 }} />
                  {poll.options.length > 2 && <button onClick={() => removePollOption(i)} style={{ color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontSize:18, padding:'0 4px' }}>×</button>}
                </div>
              ))}
              {poll.options.length < 4 && <button onClick={addPollOption} style={{ fontSize:13, color:'var(--accent)', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'var(--font-body)' }}>+ Add option</button>}
              <div style={{ marginTop:10, display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:12, color:'var(--muted)' }}>Duration:</span>
                {['1 day','3 days','7 days'].map(d => (
                  <button key={d} onClick={() => setPoll(p => ({ ...p, duration: d }))} style={{ fontSize:12, fontWeight:700, padding:'4px 10px', borderRadius:'var(--r-full)', border:`1px solid ${poll.duration===d?'var(--accent)':'var(--border2)'}`, background: poll.duration===d?'var(--accent-bg)':'none', color: poll.duration===d?'var(--accent)':'var(--muted)', cursor:'pointer', fontFamily:'var(--font-body)' }}>{d}</button>
                ))}
              </div>
            </div>
          )}

          {/* Region input */}
          <div style={{ marginTop:8 }}>
            <input className="form-input" type="text" placeholder="📍 Add location (optional)" value={region} onChange={e => setRegion(e.target.value)} style={{ fontSize:13 }} />
          </div>
        </div>
      </div>

      <div className="compose-bar">
        <button className={`c-btn${anon?' active':''}`} title={anon?'Anonymous on':'Post anonymously'} onClick={() => setAnon(a => !a)} style={{ color: anon ? 'var(--accent)' : undefined }}>
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <span style={{ fontSize:12, marginLeft:4, color: overLimit ? 'var(--accent)' : left < 30 ? 'var(--orange)' : 'var(--muted2)', alignSelf:'center', fontFamily:'var(--font-mono)' }}>{left}</span>
        <span style={{ fontSize:11, color:'var(--muted2)', marginLeft:'auto', marginRight:8 }}>⌘↵ to post</span>
        <button className="c-sub" onClick={submit} disabled={!canSubmit}>
          {busy ? '…' : postType === 'breaking' ? '🔴 Break' : 'Post'}
        </button>
      </div>
    </div>
  )
}
