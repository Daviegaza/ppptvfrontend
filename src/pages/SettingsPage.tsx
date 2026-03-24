import { useState } from 'react'
import { useApp } from '../context/AppContext'

interface SettingRow { label: string; desc: string; key: string }
const NOTIFICATION_SETTINGS: SettingRow[] = [
  { label:'Breaking news alerts',    desc:'Get notified when ppptv publishes a breaking news alert', key:'breaking' },
  { label:'Likes',                   desc:'When someone likes your post',                            key:'likes' },
  { label:'Replies',                 desc:'When someone replies to your post',                       key:'replies' },
  { label:'Reposts',                 desc:'When someone reposts your content',                       key:'reposts' },
  { label:'New followers',           desc:'When someone follows your account',                       key:'follows' },
  { label:'Mentions',                desc:'When someone mentions you in a post',                     key:'mentions' },
  { label:'Poll results',            desc:'When polls you voted in are resolved',                    key:'polls' },
]
const PRIVACY_SETTINGS: SettingRow[] = [
  { label:'Private account',         desc:'Only approved followers can see your posts',              key:'private' },
  { label:'Hide read receipts',      desc:"Don't show when you've read messages",                    key:'readReceipts' },
  { label:'Allow message requests',  desc:'Let people who don\'t follow you send messages',         key:'msgRequests' },
  { label:'Show in suggestions',     desc:"Appear in 'Who to follow' suggestions",                  key:'suggestions' },
]
const CONTENT_SETTINGS: SettingRow[] = [
  { label:'Autoplay videos',         desc:'Automatically play videos in the feed',                  key:'autoplay' },
  { label:'Show sensitive content',  desc:'Display content that may be sensitive',                  key:'sensitive' },
  { label:'Reduce motion',           desc:'Minimise animations and movement in the interface',      key:'reduceMotion' },
  { label:'Compact mode',            desc:'Show more posts per screen with smaller spacing',        key:'compact' },
]

const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <div className={`pill${on?' on':''}`} onClick={onChange} style={{ cursor:'pointer', flexShrink:0 }}><div className="knob"/></div>
)

export const SettingsPage = () => {
  const { isDark, toggleTheme, addToast } = useApp()
  const [notifs, setNotifs]   = useState<Record<string,boolean>>({ breaking:true, likes:true, replies:true, reposts:true, follows:true, mentions:true, polls:false })
  const [privacy, setPrivacy] = useState<Record<string,boolean>>({ private:false, readReceipts:false, msgRequests:true, suggestions:true })
  const [content, setContent] = useState<Record<string,boolean>>({ autoplay:true, sensitive:false, reduceMotion:false, compact:false })
  const [section, setSection] = useState('Account')

  const toggle = (group: Record<string,boolean>, set: (v: Record<string,boolean>) => void, key: string) => {
    set({ ...group, [key]: !group[key] })
    addToast('Setting updated', 'info')
  }

  const SECTIONS = ['Account','Notifications','Privacy','Content & Display','Blocked Users','About']

  const SettingSection = ({ title, settings, state, setState }: { title: string; settings: SettingRow[]; state: Record<string,boolean>; setState: (v: Record<string,boolean>) => void }) => (
    <div className="admin-panel" style={{ marginBottom:16 }}>
      <div className="admin-panel-hdr"><div className="admin-panel-title">{title}</div></div>
      <div>
        {settings.map((s, i) => (
          <div key={s.key} style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 20px', borderBottom: i < settings.length-1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600 }}>{s.label}</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>{s.desc}</div>
            </div>
            <Toggle on={state[s.key]} onChange={() => toggle(state, setState, s.key)} />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <div className="page-hdr"><div className="page-title">Settings</div></div>
      <div style={{ display:'flex', gap:0, borderBottom:'1px solid var(--border)', overflowX:'auto', scrollbarWidth:'none' }}>
        {SECTIONS.map(s => <button key={s} className={`tab-btn${section===s?' on':''}`} onClick={() => setSection(s)} style={{ whiteSpace:'nowrap' }}>{s}</button>)}
      </div>

      <div style={{ padding:'20px' }}>
        {section === 'Account' && (
          <>
            <div className="admin-panel" style={{ marginBottom:16 }}>
              <div className="admin-panel-hdr"><div className="admin-panel-title">Profile</div></div>
              <div className="admin-panel-body">
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
                  <div className="av" style={{ width:64, height:64, fontSize:24, background:'linear-gradient(135deg,#7c3aed,#a855f7)' }}>Y</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:16 }}>You</div>
                    <div style={{ fontSize:13, color:'var(--muted)' }}>@youhandle · Joined Jan 2025</div>
                    <button style={{ marginTop:6, fontSize:12, color:'var(--accent)', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'var(--font-body)', fontWeight:600 }}>Change avatar</button>
                  </div>
                </div>
                {[['Display name', 'You'], ['Username', '@youhandle'], ['Bio', ''], ['Location', 'Nairobi, KE'], ['Website', '']].map(([label, val]) => (
                  <div key={label} className="form-field">
                    <label className="form-label">{label}</label>
                    <input className="form-input" type="text" defaultValue={val} placeholder={`Your ${label?.toLowerCase()}`}/>
                  </div>
                ))}
                <button className="btn btn-primary" onClick={() => addToast('Profile saved', 'success')}>Save changes</button>
              </div>
            </div>
            <div className="admin-panel">
              <div className="admin-panel-hdr"><div className="admin-panel-title">Appearance</div></div>
              <div style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 20px' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{isDark ? 'Dark mode' : 'Light mode'}</div>
                  <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>Switch between dark and light themes</div>
                </div>
                <Toggle on={isDark} onChange={toggleTheme} />
              </div>
            </div>
          </>
        )}
        {section === 'Notifications' && <SettingSection title="Notification Preferences" settings={NOTIFICATION_SETTINGS} state={notifs} setState={setNotifs} />}
        {section === 'Privacy' && <SettingSection title="Privacy & Safety" settings={PRIVACY_SETTINGS} state={privacy} setState={setPrivacy} />}
        {section === 'Content & Display' && <SettingSection title="Content & Display" settings={CONTENT_SETTINGS} state={content} setState={setContent} />}
        {section === 'Blocked Users' && (
          <div className="admin-panel">
            <div className="admin-panel-hdr"><div className="admin-panel-title">Blocked Users</div></div>
            <div style={{ padding:'40px 20px', textAlign:'center', color:'var(--muted)' }}>
              <div style={{ fontSize:32, marginBottom:10 }}>🚫</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:800, marginBottom:6 }}>No blocked users</div>
              <div style={{ fontSize:13 }}>Users you block won't be able to see your posts or interact with you.</div>
            </div>
          </div>
        )}
        {section === 'About' && (
          <div className="admin-panel">
            <div className="admin-panel-hdr"><div className="admin-panel-title">About ppptv</div></div>
            <div className="admin-panel-body">
              {[['Version','1.0.0'],['Build','2025-03-24'],['Platform','Web'],['Region','East Africa']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)', fontSize:14 }}>
                  <span style={{ color:'var(--muted)' }}>{k}</span>
                  <span style={{ fontWeight:600, fontFamily:'var(--font-mono)' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:16, display:'flex', gap:8, flexWrap:'wrap' }}>
                {['Terms of Service','Privacy Policy','Help Centre','Contact Us'].map(l => (
                  <a key={l} href="#" style={{ fontSize:13, color:'var(--accent)', fontWeight:600 }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
