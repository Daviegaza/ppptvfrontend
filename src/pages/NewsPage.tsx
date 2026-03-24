import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { PostCard } from '../components/feed/PostCard'

const SECTIONS = ['Top Stories','World','Politics','Business','Health','Technology','Sports','Culture','Climate']

const FEATURES = [
  { id:'n1', cat:'World',      headline:'Geneva AI Safety Pact signed by 47 nations — a historic first', sub:'World leaders agree to binding regulations on autonomous AI in military contexts, marking the most significant international AI governance milestone in history.', img:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80', source:'ppptv World Bureau', time:'2h ago', reads:'284K', urgent:true },
  { id:'n2', cat:'Health',     headline:'Malaria vaccine achieves 94% efficacy across 5 African nations', sub:'The R21/Matrix-M vaccine phase 3 results could prevent up to 400,000 deaths annually on the continent.', img:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', source:'WHO Correspondent', time:'4h ago', reads:'198K', urgent:false },
  { id:'n3', cat:'Business',   headline:'Nairobi Stock Exchange closes at all-time high amid tech surge', sub:'NSEI closes at 187.4 points as Safaricom leads gains. Foreign investor inflows hit KSh 3.2B in one week.', img:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', source:'NSE Watch', time:'6h ago', reads:'97K', urgent:false },
]
const BRIEFS = [
  { id:'b1', cat:'Politics',   headline:'AU approves Pan-African Digital ID framework for 54 nations',                   time:'3h ago',  source:'AU Correspondent' },
  { id:'b2', cat:'Economics',  headline:'IMF revises Africa growth forecast upward to 5.1% for 2025',                    time:'8h ago',  source:'IMF Analysis' },
  { id:'b3', cat:'Policy',     headline:'EAC single currency framework agreed — implementation target 2028',             time:'10h ago', source:'EAC Correspondent' },
  { id:'b4', cat:'Technology', headline:'Kenya wins bid to host 2027 Global Fintech Conference',                        time:'12h ago', source:'ppptv Business' },
  { id:'b5', cat:'Culture',    headline:'Nairobi hosts inaugural Africa Global Music Summit with 40+ nations',           time:'14h ago', source:'ppptv Culture' },
  { id:'b6', cat:'Technology', headline:"Ghana's Kantanka becomes first domestically produced African EV",              time:'18h ago', source:'Tech Africa' },
  { id:'b7', cat:'Climate',    headline:'2024 confirmed as hottest year on record across East Africa',                  time:'1d ago',  source:'ppptv Science' },
  { id:'b8', cat:'Sport',      headline:'Harambee Stars draw AFCON group opponents — face Morocco, Algeria, Tunisia',  time:'1d ago',  source:'ppptv Sports' },
]
const CAT_COLOR: Record<string,string> = { World:'var(--accent)', Health:'var(--green)', Business:'var(--yellow)', Sports:'var(--orange)', Technology:'var(--blue)', Culture:'var(--purple)', Politics:'var(--accent)', Economics:'var(--yellow)', Policy:'var(--blue)', Climate:'var(--green)', Sport:'var(--orange)' }

export const NewsPage = () => {
  const { posts } = useApp()
  const [section, setSection] = useState('Top Stories')
  const newsPosts = posts.filter(p => p.type === 'news' || p.type === 'breaking')
  const sectionPosts = section === 'Top Stories' ? newsPosts : newsPosts.filter(p => p.newsCategory === section || p.tags?.includes(section))

  return (
    <>
      <div className="page-hdr">
        <div className="page-title">News</div>
        <div style={{ marginLeft:'auto', fontSize:11, color:'var(--muted)', fontFamily:'var(--font-mono)' }}>Updated just now</div>
      </div>

      <div className="tab-bar">
        {SECTIONS.map(s => <button key={s} className={`tab-btn${section===s?' on':''}`} onClick={() => setSection(s)}>{s}</button>)}
      </div>

      {section === 'Top Stories' ? (
        <>
          {/* Feature */}
          <div className="news-feature">
            <div style={{ position:'relative' }}>
              <img src={FEATURES[0].img} alt="" className="news-feature-img"/>
              {FEATURES[0].urgent && <div style={{ position:'absolute', top:12, left:12, background:'var(--accent)', color:'#fff', fontFamily:'var(--font-display)', fontSize:10, fontWeight:800, padding:'3px 8px', borderRadius:4, letterSpacing:'1px' }}>BREAKING</div>}
            </div>
            <div className="news-feature-body">
              <div className="news-feature-cat" style={{ color: CAT_COLOR[FEATURES[0].cat] }}>{FEATURES[0].cat}</div>
              <div className="news-feature-title">{FEATURES[0].headline}</div>
              <div className="news-feature-sub">{FEATURES[0].sub}</div>
              <div className="news-feature-meta"><span>{FEATURES[0].source}</span><span>·</span><span>{FEATURES[0].time}</span><span>·</span><span>{FEATURES[0].reads} reads</span></div>
            </div>
          </div>

          {/* Secondary grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--border)' }}>
            {FEATURES.slice(1).map(f => (
              <div key={f.id} style={{ background:'var(--surface)', padding:16, cursor:'pointer' }}>
                <img src={f.img} alt="" style={{ width:'100%', height:100, objectFit:'cover', borderRadius:'var(--r-sm)', marginBottom:10 }}/>
                <div style={{ fontSize:10, fontWeight:800, color: CAT_COLOR[f.cat]??'var(--accent)', textTransform:'uppercase', letterSpacing:'1px', fontFamily:'var(--font-display)' }}>{f.cat}</div>
                <div style={{ fontSize:14, fontWeight:700, lineHeight:1.3, marginTop:4 }}>{f.headline}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginTop:6 }}>{f.time} · {f.reads} reads</div>
              </div>
            ))}
          </div>

          {/* Briefs */}
          <div style={{ borderBottom:'1px solid var(--border)', padding:'16px 20px 8px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px' }}>More Stories</div>
          {BRIEFS.map((b, i) => (
            <div key={b.id} style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', gap:12, alignItems:'center', cursor:'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background='var(--surface2)')}
              onMouseLeave={e => (e.currentTarget.style.background='')}
            >
              <div style={{ fontFamily:'var(--font-mono)', fontSize:20, fontWeight:800, color:'var(--border2)', minWidth:28 }}>{String(i+1).padStart(2,'0')}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10, fontWeight:800, color: CAT_COLOR[b.cat]??'var(--blue)', textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'var(--font-display)', marginBottom:3 }}>{b.cat}</div>
                <div style={{ fontSize:14, fontWeight:700, lineHeight:1.35 }}>{b.headline}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{b.source} · {b.time}</div>
              </div>
            </div>
          ))}

          <div style={{ padding:'16px 20px 6px', fontFamily:'var(--font-display)', fontSize:13, fontWeight:800, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', borderTop:'1px solid var(--border)' }}>Live Coverage</div>
          {newsPosts.map((p, i) => <PostCard key={p.id} post={p} delay={i*30} />)}
        </>
      ) : (
        sectionPosts.length === 0 ? (
          <div style={{ padding:'60px 20px', textAlign:'center', color:'var(--muted)' }}>
            <div style={{ fontSize:36, marginBottom:10 }}>📰</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:800, marginBottom:6 }}>No {section} stories right now</div>
            <div style={{ fontSize:14 }}>Check back soon for the latest coverage</div>
          </div>
        ) : sectionPosts.map((p,i) => <PostCard key={p.id} post={p} delay={i*30} />)
      )}
    </>
  )
}
