import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PostCard } from '../components/feed/PostCard'
import { AUTHORS } from '../data/mockData'
import type { Post } from '../types'

const MOCK_REPLIES: Post[] = [
  { id:'r1', author:AUTHORS.kwame,  content:"This is massive. The implications for Africa's AI development are enormous. Will we be included in the regulatory framework or just subject to it?", timestamp:'1m ago', type:'regular', likes:892,   comments:45,  reposts:234,  views:12_400 },
  { id:'r2', author:AUTHORS.amina,  content:'Following this closely. The Kenyan government delegation was part of the signing. Full analysis coming in 10 minutes 🧵', timestamp:'2m ago', type:'regular', likes:1_240, comments:89,  reposts:567,  views:28_900 },
  { id:'r3', author:AUTHORS.david,  content:"As someone who's seen how international health pacts can either lift or burden African nations — the devil will be in the implementation details.", timestamp:'4m ago', type:'regular', likes:3_410, comments:201, reposts:890,  views:67_200 },
  { id:'r4', author:AUTHORS.marcus, content:"The economic angle is critical here. Who funds AI safety compliance? Who benefits from the resulting market structure? These are the questions nobody is asking.", timestamp:'8m ago', type:'regular', likes:2_180, comments:145, reposts:712,  views:45_600 },
  { id:'r5', author:AUTHORS.sarah,  content:'Meanwhile, most Africans are still debating whether they trust AI enough to use it in their daily lives. The summit feels very removed from ground reality.', timestamp:'12m ago', type:'regular', likes:5_670, comments:340, reposts:1_890, views:89_400 },
  { id:'r6', author:AUTHORS.zara,   content:'From a climate perspective — AI data centres are massive energy consumers. Will the Safety Pact address the carbon footprint of AI infrastructure expansion?', timestamp:'18m ago', type:'regular', likes:1_890, comments:78,  reposts:430,  views:23_100 },
]

const fmt = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : n.toLocaleString()

export const PostPage = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const { posts, addPost } = useApp()
  const [replyText, setReplyText] = useState('')
  const [replies, setReplies] = useState<Post[]>(MOCK_REPLIES)

  const post = posts.find(p => p.id === id) ?? posts[0]
  const relatedPosts = posts.filter(p => p.id !== id && p.tags?.some(t => post.tags?.includes(t))).slice(0, 4)

  const sendReply = () => {
    if (!replyText.trim()) return
    const newReply: Post = {
      id: `reply-${Date.now()}`,
      author: AUTHORS.sarah,
      content: replyText.trim(),
      timestamp: 'just now',
      type: 'regular',
      likes: 0, comments: 0, reposts: 0, views: 0,
      replyTo: post.id,
    }
    setReplies(r => [newReply, ...r])
    setReplyText('')
  }

  return (
    <>
      <div className="page-hdr">
        <button onClick={() => nav(-1)} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', color:'var(--text2)', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', padding:'0 8px 0 0' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <div className="page-title">Post</div>
      </div>

      <PostCard post={post} />

      {/* Stats bar */}
      <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', gap:20, background:'var(--surface)', flexWrap:'wrap' }}>
        {[['Reposts', post.reposts], ['Quotes', Math.floor(post.reposts*0.3)], ['Likes', post.likes], ['Views', post.views], ['Bookmarks', Math.floor(post.views*0.02)]].map(([k,v]) => (
          <div key={k as string} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:800 }}>{fmt(v as number)}</div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>{k}</div>
          </div>
        ))}
      </div>

      {/* Reply compose */}
      <div className="reply-input-area">
        <div className="av av36" style={{ background:'linear-gradient(135deg,#7c3aed,#a855f7)', flexShrink:0 }}>Y</div>
        <input
          className="reply-input"
          placeholder="Write a reply… (Enter to send)"
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply() } }}
        />
        <button onClick={sendReply} disabled={!replyText.trim()} style={{ padding:'8px 18px', background: replyText.trim()?'var(--accent)':'var(--surface3)', color:'#fff', border:'none', borderRadius:'var(--r-full)', fontFamily:'var(--font-display)', fontWeight:800, fontSize:13, cursor: replyText.trim()?'pointer':'not-allowed', flexShrink:0, transition:'background 150ms' }}>Reply</button>
      </div>

      <div style={{ padding:'12px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'1px solid var(--border)' }}>
        {replies.length} Replies
      </div>
      {replies.map((r, i) => <PostCard key={r.id} post={r} delay={i * 30} />)}

      {relatedPosts.length > 0 && (
        <>
          <div style={{ padding:'16px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderTop:'3px solid var(--surface3)', marginTop:8 }}>Related</div>
          {relatedPosts.map((p, i) => <PostCard key={p.id} post={p} delay={i * 30} />)}
        </>
      )}
    </>
  )
}
