import type { Author, Post, TrendingTopic, LiveStream, BreakingAlert, Notification, Conversation, Debate, Prediction, Community } from '../types'

export const AUTHORS: Record<string, Author> = {
  ppptv:  { id:'a0', name:'ppptv Official', handle:'ppptv', avatarColor:'linear-gradient(135deg,#e8203a,#ff6b35)', verified:true, isPro:true, isAdmin:true, followers:2_400_000, following:12, bio:'The pulse of now. News, live & more.', joinedAt:'Jan 2020', postsCount:8420 },
  amina:  { id:'a1', name:'Amina Hassan', handle:'aminahassan', avatarColor:'linear-gradient(135deg,#7c3aed,#a855f7)', verified:true, isPro:true, followers:184_200, following:312, bio:'Political correspondent | Nairobi Bureau Chief | @ppptv', region:'KE', joinedAt:'Mar 2021', postsCount:3240, website:'aminahassan.co.ke' },
  kwame:  { id:'a2', name:'Kwame Mensah', handle:'kwamem_tech', avatarColor:'linear-gradient(135deg,#0ea5e9,#38bdf8)', verified:true, isPro:false, followers:92_400, following:540, bio:'Tech reporter covering AI, fintech & startups across Africa', region:'GH', joinedAt:'Jun 2021', postsCount:1870 },
  sarah:  { id:'a3', name:'Sarah Wanjiku', handle:'sarahwanjiku', avatarColor:'linear-gradient(135deg,#ec4899,#f43f5e)', verified:false, isPro:true, followers:67_800, following:890, bio:'Culture & lifestyle | Nairobi 🇰🇪', region:'KE', joinedAt:'Aug 2021', postsCount:2100 },
  david:  { id:'a4', name:'Dr. David Osei', handle:'drdavidosei', avatarColor:'linear-gradient(135deg,#10b981,#34d399)', verified:true, isPro:false, followers:241_000, following:208, bio:'Public health physician | WHO Advisor | Accra & Geneva', joinedAt:'Feb 2020', postsCount:980 },
  james:  { id:'a5', name:'James Mwangi', handle:'jamesmwangi', avatarColor:'linear-gradient(135deg,#f59e0b,#fbbf24)', verified:true, isPro:true, followers:156_300, following:445, bio:'Markets & macro | NSE correspondent', region:'KE', joinedAt:'Nov 2020', postsCount:4120 },
  fatima: { id:'a6', name:'Fatima Al-Hassan', handle:'fatimaalhassan', avatarColor:'linear-gradient(135deg,#6366f1,#818cf8)', verified:true, isPro:false, followers:320_100, following:167, bio:'International affairs | Cairo & Nairobi', region:'EG', joinedAt:'Jan 2021', postsCount:2760 },
  victor: { id:'a7', name:'Victor Okonkwo', handle:'victorokonkwo', avatarColor:'linear-gradient(135deg,#16a34a,#4ade80)', verified:true, isPro:false, followers:88_700, following:620, bio:'Sports journo | Football obsessed 🏆', region:'NG', joinedAt:'Apr 2021', postsCount:5340 },
  grace:  { id:'a8', name:'Grace Njeri', handle:'gracenjeri', avatarColor:'linear-gradient(135deg,#f97316,#fb923c)', verified:false, isPro:false, followers:43_200, following:1_200, bio:'Entertainment & music | Nairobi vibes ✨', region:'KE', joinedAt:'Sep 2021', postsCount:1560 },
  marcus: { id:'a9', name:'Marcus Thompson', handle:'marcusecon', avatarColor:'linear-gradient(135deg,#0f172a,#334155)', verified:true, isPro:true, followers:198_400, following:290, bio:'Economist | Africa development | Author of "The Nairobi Effect"', joinedAt:'May 2020', postsCount:2890 },
  zara:   { id:'a10', name:'Zara Diallo', handle:'zaradiallo', avatarColor:'linear-gradient(135deg,#be185d,#ec4899)', verified:true, isPro:false, followers:112_000, following:430, bio:'Climate & environment reporter | Dakar', region:'SN', joinedAt:'Jul 2021', postsCount:1340 },
  ibrahim:{ id:'a11', name:'Ibrahim Sow', handle:'ibrahimsow', avatarColor:'linear-gradient(135deg,#d97706,#92400e)', verified:false, isPro:false, followers:28_400, following:890, bio:'Entrepreneur | Lagos & London 🌍', region:'NG', joinedAt:'Dec 2021', postsCount:780 },
}

export const YOU: Author = { id:'me', name:'You', handle:'youhandle', avatarColor:'linear-gradient(135deg,#7c3aed,#a855f7)', verified:false, isPro:false, followers:142, following:89, bio:'ppptv user', joinedAt:'Jan 2025', postsCount:12 }

export const INITIAL_POSTS: Post[] = [
  { id:'p1', author:AUTHORS.ppptv, content:'🔴 BREAKING: World leaders have signed the Geneva AI Safety Pact — a landmark agreement covering 47 nations committing to binding regulations on autonomous AI systems in military applications. This is the most significant international AI governance moment since the dawn of the technology.', timestamp:'2m ago', type:'breaking', isBreaking:true, urgency:'critical', likes:18_420, comments:3_241, reposts:9_804, views:284_000, newsSource:'ppptv Breaking', newsCategory:'World', tags:['AIGenevaPact','AISafety'], isPinned:true },
  { id:'p2', author:AUTHORS.james, content:'The Nairobi Securities Exchange just closed at an all-time high — NSEI at 187.4 points. Safaricom up 6.2%, KCB Group up 4.8%. Foreign investor inflows hit KSh 3.2B this week alone. The tech sector surge is REAL and it\'s just getting started. Thread 🧵', timestamp:'14m ago', type:'news', likes:4_201, comments:892, reposts:1_340, views:67_800, newsSource:'NSE Watch', newsCategory:'Business', tags:['NSE','NairobiMarkets','Safaricom'], image:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', factCheck:{status:'verified',source:'NSE Official Data'} },
  { id:'p3', author:AUTHORS.amina, content:'LIVE from State House: President addressing the nation on the proposed constitutional amendment. She\'s expected to announce a referendum timeline. Thousands gathered outside. Follow here for live updates 👇', timestamp:'28m ago', type:'live', likes:9_870, comments:2_104, reposts:5_670, views:412_000, region:'Nairobi, KE', tags:['KenyaReferendum','StateHouse'], image:'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80' },
  { id:'p4', author:AUTHORS.david, content:'Major breakthrough in global health: The R21/Matrix-M malaria vaccine has shown 94% efficacy in Phase 3 trials across 5 African countries — Kenya, Ghana, Tanzania, Burkina Faso, and Mali. If approved, this could prevent up to 400,000 deaths annually on the continent. This is the moment we\'ve been working toward for 30 years.', timestamp:'1h ago', type:'news', likes:24_300, comments:1_870, reposts:12_040, views:890_000, newsSource:'WHO Bulletin', newsCategory:'Health', tags:['MalariaVaccine','GlobalHealth','Africa'], factCheck:{status:'verified',source:'WHO / The Lancet'} },
  { id:'p5', author:AUTHORS.kwame, content:'Hot take: Africa doesn\'t need Silicon Valley\'s permission to build world-class tech. M-Pesa was invented here. Flutterwave, Paystack, Moniepoint — all African. The next unicorn won\'t come from a garage in Palo Alto, it\'ll come from a co-working space in Lagos, Nairobi, or Accra.\n\nWe\'re not behind. We\'re just early.', timestamp:'2h ago', type:'regular', likes:31_200, comments:4_560, reposts:14_800, views:1_200_000, tags:['AfricaTech','Fintech'] },
  { id:'p6', author:AUTHORS.fatima, content:'The African Union has formally approved a continental digital ID framework — the Pan-African Digital Identity (PADI) system. All 54 member states will be onboarded by 2027. Interoperable, privacy-first, and will serve as the foundation for cross-border services and financial inclusion for 1.4 billion people.', timestamp:'3h ago', type:'news', likes:8_740, comments:1_230, reposts:4_560, views:178_000, newsSource:'AU Correspondent', newsCategory:'Policy', tags:['AfricanUnion','DigitalID','PADI'], image:'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=80' },
  { id:'p7', author:AUTHORS.sarah, content:'Should Africa build its own social media platform? One that actually understands our languages, cultures, and contexts?', timestamp:'4h ago', type:'regular', likes:5_600, comments:2_340, reposts:2_100, views:89_000, poll:{ question:'Should Africa build its own social platform?', options:[{id:1,text:'🔥 Yes, absolutely',votes:12_840},{id:2,text:'🤝 Partner with existing platforms',votes:3_210},{id:3,text:'🌍 Internet should be borderless',votes:2_190},{id:4,text:'🤔 It\'s complicated',votes:1_760}], totalVotes:20_000, endsAt:'Mar 25', voted:null }, tags:['AfricaTech','SocialMedia'] },
  { id:'p8', author:AUTHORS.victor, content:'FINAL SCORE: Kenya 🇰🇪 3 — 1 Egypt 🇪🇬\n\nHarambee Stars qualify for the 2025 AFCON! Historic night at Moi International Sports Centre. 60,000 fans absolutely ELECTRIC. Olunga with a brace, Ayoo with the goal of the tournament. WE ARE GOING TO AFCON! 🦁🏆', timestamp:'5h ago', type:'news', likes:89_400, comments:12_300, reposts:41_200, views:3_400_000, region:'Nairobi, KE', tags:['AFCON','HarambeStars','KenyaFootball'], image:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80' },
  { id:'p9', author:AUTHORS.marcus, content:'The IMF\'s revised forecast for Sub-Saharan Africa: 5.1% growth in 2025, up from 4.2% last year. Ethiopia leads at 7.8%, Côte d\'Ivoire at 6.5%, Kenya at 5.9%. The narrative that Africa is "always struggling" is outdated propaganda. The data tells a completely different story.', timestamp:'6h ago', type:'news', likes:14_700, comments:2_800, reposts:7_400, views:234_000, newsSource:'IMF Analysis', newsCategory:'Economics', tags:['AfricaGrowth','IMF','Economics'], factCheck:{status:'verified',source:'IMF World Economic Outlook, 2025'} },
  { id:'p10', author:AUTHORS.grace, content:'Nairobi just became the first African city to host a global music summit. 40+ countries, 200+ artists, 3 days of panels and performances. Burna Boy, Tems, Sauti Sol, Fireboy headlining. The world is finally coming to US. 🎵✨', timestamp:'7h ago', type:'regular', likes:22_400, comments:3_400, reposts:8_900, views:560_000, region:'Nairobi, KE', tags:['NairobiMusicSummit','AfrobeatsGlobal'], image:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80' },
  { id:'p11', author:AUTHORS.kwame, content:'Ghana just launched its first domestically produced EV — the Kantanka EV sedan. Made in Accra. Assembly line employing 1,200 Ghanaians. Battery tech developed in partnership with KNUST. The transition to clean transport in Africa doesn\'t have to wait for imports.', timestamp:'8h ago', type:'news', likes:19_800, comments:3_100, reposts:9_200, views:445_000, tags:['GhanaEV','Kantanka','CleanEnergy','MadeInAfrica'], image:'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80', newsSource:'Tech Africa', newsCategory:'Technology' },
  { id:'p12', author:AUTHORS.amina, content:'The East African Community has agreed on a single currency framework — a historic step toward economic union. Implementation roadmap targets 2028. Kenya, Uganda, Tanzania, Rwanda, Burundi, DRC, and South Sudan all on board. This is not small news.', timestamp:'10h ago', type:'news', likes:11_200, comments:2_890, reposts:5_670, views:312_000, newsSource:'EAC Correspondent', newsCategory:'Policy', tags:['EAC','EastAfrica','SingleCurrency'] },
  { id:'p13', author:AUTHORS.ppptv, content:'⚡ JUST IN: Three people injured in a fire at Gikomba Market, Nairobi. Fire services on scene. Traders evacuated. Police setting up perimeter. We have a reporter on location — follow @aminahassan for live updates.', timestamp:'22m ago', type:'breaking', isBreaking:true, urgency:'high', likes:3_400, comments:890, reposts:2_100, views:67_000, region:'Nairobi, KE', newsSource:'ppptv Breaking', newsCategory:'Local', tags:['Gikomba','NairobiNews'] },
  { id:'p14', author:AUTHORS.zara, content:'Climate reality check: 2024 was the hottest year ever recorded across East Africa. Lake Victoria has shrunk by 14% in a decade. The Mara River is running dry for the first time in living memory. This is not a distant threat. This is now. 🌊', timestamp:'11h ago', type:'regular', likes:16_800, comments:3_200, reposts:8_900, views:340_000, tags:['ClimateAfrica','LakeVictoria','MamaEarth'], image:'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80' },
  { id:'p15', author:AUTHORS.marcus, content:'Hot take debate: The World Bank\'s aid model has done more harm than good to Africa\'s long-term economic sovereignty. The numbers don\'t lie — countries that reduced aid dependency grew faster.', timestamp:'18h ago', type:'debate', likes:24_300, comments:8_900, reposts:11_200, views:890_000, tags:['AfricaEconomics','WorldBank','Debate'], debateSide:'for' },
  { id:'p16', author:AUTHORS.ibrahim, content:'Started my company 3 years ago with ₦50,000. Today we crossed ₦500M in annual revenue. 47 employees. Fully bootstrapped. Lagos is the most entrepreneurial city on earth and I will die on this hill. 🦅', timestamp:'16h ago', type:'regular', likes:48_900, comments:6_700, reposts:21_400, views:1_800_000, region:'Lagos, NG', tags:['Lagos','Entrepreneurship','Africa'] },
  { id:'p17', author:AUTHORS.fatima, content:'Unverified: Reports of troop movements on the Sudanese border with Chad. We are working to confirm this. DO NOT share unverified information. More to follow.', timestamp:'35m ago', type:'news', likes:2_100, comments:890, reposts:3_400, views:89_000, newsSource:'ppptv Africa Bureau', newsCategory:'Conflict', factCheck:{status:'unverified',source:'Awaiting independent confirmation'}, tags:['Sudan','Chad'], isFlagged:true, flagReason:'Unverified conflict report — review before amplifying' },
]

export const TRENDING_TOPICS: TrendingTopic[] = [
  { id:'t1', tag:'#AIGenevaPact',       category:'World',    postCount:284_000, change:340 },
  { id:'t2', tag:'#KenyaReferendum',    category:'Politics', postCount:156_000, change:89  },
  { id:'t3', tag:'#MalariaVaccine',     category:'Health',   postCount:128_000, change:210 },
  { id:'t4', tag:'#HarambeStars',       category:'Sports',   postCount:98_400,  change:560 },
  { id:'t5', tag:'#NSEAllTimeHigh',     category:'Business', postCount:67_200,  change:145 },
  { id:'t6', tag:'#AfricaEV',           category:'Tech',     postCount:54_100,  change:78  },
  { id:'t7', tag:'#EACCurrency',        category:'Policy',   postCount:42_800,  change:95  },
  { id:'t8', tag:'#ClimateAfrica',      category:'Climate',  postCount:38_200,  change:182 },
  { id:'t9', tag:'#NairobiMusicSummit', category:'Culture',  postCount:29_400,  change:62  },
  { id:'t10',tag:'#LagosEntrepreneur',  category:'Business', postCount:21_800,  change:44  },
]

export const LIVE_STREAMS: LiveStream[] = [
  { id:'l1', title:'Presidential Address: Constitutional Referendum Announcement', host:AUTHORS.ppptv, viewers:284_000, thumbnail:'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80', category:'Politics', startedAt:'28 mins ago', isLive:true, isFeatured:true, description:'Live coverage from State House as the President addresses the nation on the proposed constitutional amendment.' },
  { id:'l2', title:'NSE Market Close Analysis — Record-Breaking Session', host:AUTHORS.james, viewers:48_200, thumbnail:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', category:'Business', startedAt:'1h 14m ago', isLive:true, description:'In-depth analysis of today\'s historic NSE session.' },
  { id:'l3', title:'AI Safety Summit — Geneva Day 2 Plenary Session', host:AUTHORS.kwame, viewers:192_400, thumbnail:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', category:'Technology', startedAt:'2h ago', isLive:true, isFeatured:true, description:'Live coverage from the AI Safety Summit in Geneva.' },
  { id:'l4', title:'AFCON Qualifiers: Post-Match Press Conference', host:AUTHORS.victor, viewers:67_800, thumbnail:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80', category:'Sports', startedAt:'45m ago', isLive:true, description:'Harambee Stars coach and players speak to press after historic qualification.' },
  { id:'l5', title:'Malaria Vaccine: WHO Press Briefing', host:AUTHORS.david, viewers:34_100, thumbnail:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', category:'Health', startedAt:'3h ago', isLive:false },
]

export const BREAKING_ALERTS: BreakingAlert[] = [
  { id:'b1', headline:'World leaders sign Geneva AI Safety Pact — 47 nations commit to binding regulations', category:'World', urgency:'critical', timestamp:'2m ago', source:'ppptv Breaking' },
  { id:'b2', headline:'NSE hits all-time high — NSEI closes at 187.4 points', category:'Business', urgency:'urgent', timestamp:'14m ago', source:'ppptv Business' },
  { id:'b3', headline:'Malaria vaccine shows 94% efficacy in Phase 3 trials across 5 African nations', category:'Health', urgency:'urgent', timestamp:'1h ago', source:'WHO Bulletin' },
  { id:'b4', headline:'Harambee Stars qualify for AFCON 2025 after 3-1 victory over Egypt', category:'Sports', urgency:'normal', timestamp:'5h ago', source:'ppptv Sports' },
]

export const TICKER_ITEMS = [
  '🔴 BREAKING: Geneva AI Safety Pact signed by 47 nations',
  '📈 NSE hits all-time high — NSEI at 187.4 points',
  '⚽ Kenya 3-1 Egypt — Harambee Stars qualify for AFCON 2025!',
  '💉 Malaria vaccine: 94% efficacy confirmed in Phase 3 trials',
  '🌍 AU approves Pan-African Digital ID framework for 54 nations',
  '🏦 Kenya wins bid to host 2027 Global Fintech Conference',
  '🚗 Ghana launches first domestically produced electric vehicle',
  '🎵 Nairobi hosts inaugural Africa Global Music Summit',
  '💰 IMF revises Africa growth forecast to 5.1% for 2025',
  '🌐 EAC agrees on single currency framework — target 2028',
  '🌡️ 2024 confirmed as hottest year on record in East Africa',
]

export const NOTIFICATIONS: Notification[] = [
  { id:'n1', type:'breaking', actor:AUTHORS.ppptv, message:'Geneva AI Safety Pact signed — breaking coverage live now', timestamp:'2m ago', read:false },
  { id:'n2', type:'like', actor:AUTHORS.amina, post:INITIAL_POSTS[1], message:'liked your post about African tech unicorns', timestamp:'8m ago', read:false },
  { id:'n3', type:'repost', actor:AUTHORS.kwame, post:INITIAL_POSTS[4], message:'reposted your analysis on NSE markets', timestamp:'23m ago', read:false },
  { id:'n4', type:'follow', actor:AUTHORS.david, message:'started following you', timestamp:'1h ago', read:false },
  { id:'n5', type:'reply', actor:AUTHORS.sarah, post:INITIAL_POSTS[6], message:'replied to your post: "Absolutely agree — we need platforms that reflect our realities"', timestamp:'2h ago', read:true },
  { id:'n6', type:'mention', actor:AUTHORS.victor, message:'mentioned you in a post about AFCON celebrations', timestamp:'3h ago', read:true },
  { id:'n7', type:'like', actor:AUTHORS.marcus, post:INITIAL_POSTS[8], message:'liked your comment on the IMF forecast thread', timestamp:'4h ago', read:true },
  { id:'n8', type:'poll_ended', actor:AUTHORS.sarah, post:INITIAL_POSTS[6], message:'Poll ended: "Should Africa build its own social platform?" — Yes won with 64%', timestamp:'5h ago', read:true },
  { id:'n9', type:'follow', actor:AUTHORS.fatima, message:'started following you', timestamp:'6h ago', read:true },
  { id:'n10', type:'repost', actor:AUTHORS.grace, message:'reposted your post', timestamp:'8h ago', read:true },
]

export const CONVERSATIONS: Conversation[] = [
  { id:'c1', participant:AUTHORS.amina, lastMessage:'Can you send me the full NSE report when you get a chance?', lastTimestamp:'5m ago', unread:2, messages:[
    { id:'m1', from:AUTHORS.amina, to:AUTHORS.james, content:'Hey! Great coverage today on the NSE record. Really well done.', timestamp:'1h ago', read:true, thread:'c1' },
    { id:'m2', from:AUTHORS.james, to:AUTHORS.amina, content:'Thank you! It was a wild session. Lots to unpack.', timestamp:'58m ago', read:true, thread:'c1' },
    { id:'m3', from:AUTHORS.amina, to:AUTHORS.james, content:'Can you send me the full NSE report when you get a chance?', timestamp:'5m ago', read:false, thread:'c1' },
  ]},
  { id:'c2', participant:AUTHORS.kwame, lastMessage:'The Kantanka story is going viral 🔥', lastTimestamp:'1h ago', unread:1, messages:[
    { id:'m4', from:AUTHORS.kwame, to:AUTHORS.sarah, content:'The Kantanka story is going viral 🔥', timestamp:'1h ago', read:false, thread:'c2' },
  ]},
  { id:'c3', participant:AUTHORS.david, lastMessage:'When is the vaccine paper dropping?', lastTimestamp:'3h ago', unread:0, messages:[
    { id:'m5', from:AUTHORS.david, to:AUTHORS.ppptv, content:'When is the vaccine paper dropping?', timestamp:'3h ago', read:true, thread:'c3' },
    { id:'m6', from:AUTHORS.ppptv, to:AUTHORS.david, content:'The Lancet publishes Thursday. We will have exclusive coverage.', timestamp:'3h ago', read:true, thread:'c3' },
  ]},
  { id:'c4', participant:AUTHORS.victor, lastMessage:'AFCON squad predictions thread?', lastTimestamp:'6h ago', unread:0, messages:[
    { id:'m7', from:AUTHORS.victor, to:AUTHORS.ppptv, content:'AFCON squad predictions thread?', timestamp:'6h ago', read:true, thread:'c4' },
  ]},
  { id:'c5', participant:AUTHORS.marcus, lastMessage:'Great piece on the IMF forecast', lastTimestamp:'1d ago', unread:0, messages:[
    { id:'m8', from:AUTHORS.marcus, to:AUTHORS.ppptv, content:'Great piece on the IMF forecast', timestamp:'1d ago', read:true, thread:'c5' },
  ]},
]

export const DEBATES: Debate[] = [
  { id:'d1', topic:'The World Bank\'s aid model has done more harm than good to Africa\'s long-term economic sovereignty', description:'A critical examination of five decades of development aid and its impact on African economic self-determination', forCount:12_840, againstCount:8_200, totalPosts:2_340, endsAt:'Mar 26', category:'Economics', isFeatured:true, tags:['WorldBank','AfricaEconomics','Aid'] },
  { id:'d2', topic:'African nations should ban cryptocurrency trading to protect their currencies', description:'With crypto adoption surging across Africa, should governments step in with outright bans or embrace regulation?', forCount:6_200, againstCount:14_800, totalPosts:1_890, endsAt:'Mar 27', category:'Finance', isFeatured:true, tags:['Crypto','Africa','Finance'] },
  { id:'d3', topic:'Term limits should be constitutionally mandatory for all African heads of state', description:'Power and constitutionalism in Africa — is a hard term limit the answer to democratic backsliding?', forCount:28_400, againstCount:4_100, totalPosts:4_200, endsAt:'Mar 28', category:'Politics', isFeatured:false, tags:['Democracy','TermLimits','Africa'] },
  { id:'d4', topic:'Africa should cut diplomatic ties with countries that impose trade barriers on African goods', description:'Economic retaliation as foreign policy — bold move or dangerous gamble?', forCount:9_800, againstCount:7_400, totalPosts:1_560, endsAt:'Mar 30', category:'Trade', isFeatured:false, tags:['Trade','Africa','Diplomacy'] },
]

export const PREDICTIONS: Prediction[] = [
  { id:'pr1', author:AUTHORS.marcus, question:'Will Kenya\'s inflation rate drop below 4% by end of Q2 2025?', description:'Based on current monetary policy trends and food price stabilization', options:[{id:1,text:'Yes, below 4%',votes:8_400,odds:'2.1x'},{id:2,text:'No, stays above 4%',votes:12_200,odds:'1.6x'},{id:3,text:'Exactly 4%',votes:890,odds:'12x'}], totalVotes:21_490, deadline:'Jun 30, 2025', category:'Economics', status:'open', voted:null, timestamp:'2h ago', likes:1_240, comments:340, tags:['Kenya','Inflation','Economics'] },
  { id:'pr2', author:AUTHORS.victor, question:'Which team will win AFCON 2025?', options:[{id:1,text:'🦁 Kenya (Harambee Stars)',votes:34_200,odds:'4.5x'},{id:2,text:'🦅 Nigeria',votes:28_900,odds:'2.8x'},{id:3,text:'🌟 Morocco',votes:22_100,odds:'2.2x'},{id:4,text:'Other nation',votes:18_400,odds:'3.1x'}], totalVotes:103_600, deadline:'Feb 28, 2026', category:'Sports', status:'open', voted:null, timestamp:'6h ago', likes:8_900, comments:2_100, tags:['AFCON','Football','Africa'] },
  { id:'pr3', author:AUTHORS.kwame, question:'Will any African startup achieve a $10B valuation in 2025?', description:'The continent\'s first decacorn — who will it be?', options:[{id:1,text:'Yes — and it will be a fintech',votes:15_600,odds:'3.2x'},{id:2,text:'Yes — but a different sector',votes:4_200,odds:'7.8x'},{id:3,text:'Not this year',votes:9_800,odds:'1.9x'}], totalVotes:29_600, deadline:'Dec 31, 2025', category:'Tech', status:'open', voted:null, timestamp:'1d ago', likes:3_400, comments:780, tags:['Startup','Africa','Unicorn'] },
  { id:'pr4', author:AUTHORS.amina, question:'Will the Kenya constitutional referendum pass?', options:[{id:1,text:'✅ Yes, it passes',votes:18_400,odds:'1.8x'},{id:2,text:'❌ No, it fails',votes:12_900,odds:'2.4x'}], totalVotes:31_300, deadline:'Aug 15, 2025', category:'Politics', status:'open', voted:null, timestamp:'3h ago', likes:5_600, comments:1_800, tags:['Kenya','Referendum','Politics'] },
]

export const COMMUNITIES: Community[] = [
  { id:'cm1', name:'Nairobi Tech Hub', description:'For tech founders, engineers, and enthusiasts based in Nairobi and Kenya', color:'linear-gradient(135deg,#0ea5e9,#38bdf8)', members:48_200, posts:12_400, category:'Technology', isJoined:true, isFeatured:true, rules:['Be respectful','No spam','Verified business posts only in #showcase'] },
  { id:'cm2', name:'African Markets Watch', description:'Real-time discussion of NSE, NGX, JSE and all African capital markets', color:'linear-gradient(135deg,#f59e0b,#fbbf24)', members:34_100, posts:89_400, category:'Finance', isJoined:false, isFeatured:true },
  { id:'cm3', name:'Pan-African Politics', description:'News, analysis and debate on governance across all 54 African nations', color:'linear-gradient(135deg,#e8203a,#ff6b35)', members:112_000, posts:234_000, category:'Politics', isJoined:false, isFeatured:true },
  { id:'cm4', name:'Africa Climate Now', description:'Climate science, policy, and action across the continent', color:'linear-gradient(135deg,#10b981,#34d399)', members:28_700, posts:45_600, category:'Environment', isJoined:true },
  { id:'cm5', name:'Afrobeats Global', description:'Music, culture, and entertainment — celebrating African creative excellence', color:'linear-gradient(135deg,#a855f7,#ec4899)', members:89_400, posts:178_000, category:'Culture', isJoined:false, isFeatured:true },
  { id:'cm6', name:'Health Africa', description:'Public health, medical research, and wellness across the continent', color:'linear-gradient(135deg,#6366f1,#818cf8)', members:21_400, posts:34_200, category:'Health', isJoined:false },
  { id:'cm7', name:'Entrepreneurs Africa', description:'For founders, operators, and builders across Africa\'s startup ecosystem', color:'linear-gradient(135deg,#d97706,#f59e0b)', members:67_800, posts:98_700, category:'Business', isJoined:true },
  { id:'cm8', name:'AFCON & African Football', description:'Everything African football — AFCON, CAF Champions League, and beyond', color:'linear-gradient(135deg,#16a34a,#4ade80)', members:234_000, posts:890_000, category:'Sports', isJoined:false, isFeatured:true },
]

export const SUGGESTIONS: Author[] = [AUTHORS.amina, AUTHORS.david, AUTHORS.kwame, AUTHORS.marcus, AUTHORS.victor, AUTHORS.zara, AUTHORS.fatima]

export const STORIES = [
  { id:'s1', name:'ppptv',   color:'linear-gradient(135deg,#e8203a,#ff6b35)', live:true,  initials:'P' },
  { id:'s2', name:'Amina',   color:'linear-gradient(135deg,#7c3aed,#a855f7)', live:true,  initials:'A' },
  { id:'s3', name:'Kwame',   color:'linear-gradient(135deg,#0ea5e9,#38bdf8)', live:false, initials:'K' },
  { id:'s4', name:'James',   color:'linear-gradient(135deg,#f59e0b,#fbbf24)', live:false, initials:'J' },
  { id:'s5', name:'Victor',  color:'linear-gradient(135deg,#16a34a,#4ade80)', live:true,  initials:'V' },
  { id:'s6', name:'Grace',   color:'linear-gradient(135deg,#f97316,#fb923c)', live:false, initials:'G' },
  { id:'s7', name:'Fatima',  color:'linear-gradient(135deg,#6366f1,#818cf8)', live:false, initials:'F' },
  { id:'s8', name:'Zara',    color:'linear-gradient(135deg,#be185d,#ec4899)', live:true,  initials:'Z' },
]

export const CATEGORIES = ['All','World','Politics','Business','Technology','Health','Sports','Culture','Science','Local','Climate']
