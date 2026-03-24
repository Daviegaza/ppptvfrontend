import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import type { Post } from '../../types'

const fmt = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : n > 0 ? String(n) : ''
const FC_CLS: Record<string,string> = { verified:'fc-v', disputed:'fc-d', misleading:'fc-m', unverified:'fc-u' }

const MoreMenu = ({ post, onClose }: { post: Post; onClose: () => void }) => {
  const { deletePost, pinPost, toggleMute, toggleBlock, addToast, mutedUsers, blockedUsers } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [onClose])

  const items = [
    { label: '🔗 Copy link to post', action: () => { navigator.clipboard?.writeText(`https://ppptv.com/post/${post.id}`); addToast('Link copied!', 'info'); onClose() } },
    { label: '📋 Copy post text', action: () => { navigator.clipboard?.writeText(post.content); addToast('Text copied!', 'info'); onClose() } },
    { label: '🔖 Bookmark', action: () => { addToast('Bookmarked', 'info'); onClose() } },
    { label: '🚩 Report post', action: () => { addToast('Report submitted. Thank you.', 'info'); onClose() }, danger: false },
    { label: mutedUsers.includes(post.author.handle) ? `🔔 Unmute @${post.author.handle}` : `🔕 Mute @${post.author.handle}`, action: () => { toggleMute(post.author.handle); onClose() } },
    { label: blockedUsers.includes(post.author.handle) ? `✅ Unblock @${post.author.handle}` : `🚫 Block @${post.author.handle}`, action: () => { toggleBlock(post.author.handle); onClose() }, danger: true },
    { label: '🗑️ Delete post', action: () => { deletePost(post.id); onClose() }, danger: true },
    { label: post.isPinned ? '📌 Unpin post' : '📌 Pin post', action: () => { pinPost(post.id); onClose() } },
  ]

  return (
    <div ref={ref} style={{ position:'absolute', right:0, top:36, zIndex:200, background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:'var(--r-md)', boxShadow:'0 8px 32px rgba(0,0,0,0.4)', minWidth:220, overflow:'hidden' }}>
      {items.map((item, i) => (
        <button key={i} onClick={e => { e.stopPropagation(); item.action() }}
          style={{ display:'block', width:'100%', textAlign:'left', padding:'11px 16px', fontSize:13, fontWeight:500, color: item.danger ? 'var(--accent)' : 'var(--text)', background:'none', border:'none', borderBottom:i < items.length-1 ? '1px solid var(--border)' : 'none', cursor:'pointer', fontFamily:'var(--font-body)', transition:'background 100ms' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface2)')}
          onMouseLeave={e => (e.currentTarget.style.background = '')}
        >{item.label}</button>
      ))}
    </div>
  )
}

export const PostCard = ({ post: p, delay = 0 }: { post: Post; delay?: number }) => {
  const nav = useNavigate()
  const { toggleLike, toggleRepost, toggleBookmark, voteOnPoll, mutedUsers, blockedUsers } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  if (blockedUsers.includes(p.author.handle)) return null
  if (mutedUsers.includes(p.author.handle)) return (
    <div style={{ padding:'12px 20px', borderBottom:'1px solid var(--border)', fontSize:13, color:'var(--muted)', display:'flex', justifyContent:'space-between' }}>
      <span>Post from muted user @{p.author.handle}</span>
    </div>
  )

  return (
    <article className={`post${p.isPinned ? ' pinned' : ''}`} style={{ animationDelay:`${delay}ms` }} onClick={() => nav(`/post/${p.id}`)}>
      <div className="post-hdr">
        <div className="av av48" style={{ background: p.isAnonymous ? 'var(--surface3)' : p.author.avatarColor, flexShrink:0 }}>
          {p.isAnonymous ? '?' : p.author.name[0]}
        </div>
        <div className="post-info">
          <div className="post-name">
            {p.isAnonymous ? <span style={{color:'var(--muted)'}}>Anonymous</span> : p.author.name}
            {!p.isAnonymous && p.author.verified && (<svg width="14" height="14" viewBox="0 0 24 24" fill="var(--blue)"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>)}
            {!p.isAnonymous && p.author.isPro && <span className="pbadge pb-pro">PRO</span>}
            {p.type === 'live' && <span className="pbadge pb-live">LIVE</span>}
            {p.type === 'news' && <span className="pbadge pb-news">NEWS</span>}
            {p.type === 'breaking' && <span className="pbadge pb-breaking">BREAKING</span>}
            {p.type === 'debate' && <span className="pbadge" style={{background:'var(--purple)',color:'#fff'}}>DEBATE</span>}
          </div>
          <div className="post-meta">
            {!p.isAnonymous && <span>@{p.author.handle}</span>}
            <span>·</span><span>{p.timestamp}</span>
            {p.region && <><span>·</span><span>📍 {p.region}</span></>}
          </div>
          {p.newsSource && (
            <div className="post-meta" style={{marginTop:2}}>
              <span style={{fontWeight:600}}>{p.newsSource}</span>
              {p.newsCategory && <><span>·</span><span style={{color:'var(--blue)'}}>{p.newsCategory}</span></>}
            </div>
          )}
        </div>
        <div style={{position:'relative'}} onClick={e => e.stopPropagation()}>
          <button className="pa-more" onClick={() => setMenuOpen(v => !v)} aria-label="More">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
          {menuOpen && <MoreMenu post={p} onClose={() => setMenuOpen(false)} />}
        </div>
      </div>

      {p.factCheck && (
        <div className={`fc ${FC_CLS[p.factCheck.status] ?? 'fc-u'}`} onClick={e => e.stopPropagation()}>
          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {p.factCheck.status.charAt(0).toUpperCase() + p.factCheck.status.slice(1)}
          <span style={{fontSize:11,opacity:.7}}>— {p.factCheck.source}</span>
        </div>
      )}

      <div className={`post-body${p.type === 'breaking' ? ' breaking' : ''}`}>{p.content}</div>

      {p.image && (
        <div className="post-img" onClick={e => e.stopPropagation()}>
          <img src={p.image} alt="" loading="lazy" />
        </div>
      )}

      {p.poll && (
        <div className="poll" onClick={e => e.stopPropagation()}>
          <div className="poll-q">{p.poll.question}</div>
          {p.poll.options.map(opt => {
            const total = p.poll!.options.reduce((s,o) => s+o.votes, 0) || 1
            const pct = Math.round((opt.votes/total)*100)
            const isV = p.poll!.voted === opt.id
            return (
              <div key={opt.id} className={`poll-opt${isV?' voted':''}`} onClick={() => (p.poll?.voted == null) && voteOnPoll(p.id, opt.id)}>
                <div className="poll-fill" style={{width: p.poll!.voted != null ? `${pct}%` : '0%'}}/>
                <span style={{position:'relative'}}>{opt.text}</span>
                {p.poll!.voted != null && <span className="poll-pct">{pct}%</span>}
              </div>
            )
          })}
          <div className="poll-meta">{p.poll.totalVotes.toLocaleString()} votes · Ends {p.poll.endsAt}</div>
        </div>
      )}

      {p.tags && p.tags.length > 0 && (
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:10}}>
          {p.tags.map(tag => <span key={tag} style={{fontSize:13,color:'var(--blue)',fontWeight:500,cursor:'pointer'}}>#{tag}</span>)}
        </div>
      )}

      <div className="post-acts">
        <button className={`pa${p.isLiked?' liked':''}`} onClick={e=>{e.stopPropagation();toggleLike(p.id)}} aria-label="Like">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          {fmt(p.likes)}
        </button>
        <button className="pa" onClick={e=>{e.stopPropagation();nav(`/post/${p.id}`)}} aria-label="Comment">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          {fmt(p.comments)}
        </button>
        <button className={`pa${p.isReposted?' reposted':''}`} onClick={e=>{e.stopPropagation();toggleRepost(p.id)}} aria-label="Repost">
          <svg viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          {fmt(p.reposts)}
        </button>
        <button className={`pa${p.isBookmarked?' saved':''}`} onClick={e=>{e.stopPropagation();toggleBookmark(p.id)}} aria-label="Bookmark">
          <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
        <button className="pa" onClick={e=>{e.stopPropagation();addToast?.('Share link copied!','info')}} aria-label="Share">
          <svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </button>
        <div className="pa-views">
          <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          {fmt(p.views)}
        </div>
      </div>
    </article>
  )
}
