import React from 'react'
import { useNavigate } from 'react-router-dom'
import PassWordInput from '../../components/Input/PasswordInput.jsx'
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axiosInstance.js'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!password) { setError('Please enter your password.'); return }
    setError('')
    try {
      const response = await axiosInstance.post('/login', { email, password })
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LEFT — Night mountain scene */}
        <div style={styles.left}>
          <svg viewBox="0 0 480 600" xmlns="http://www.w3.org/2000/svg" style={styles.sceneSvg} preserveAspectRatio="xMidYMid slice">
            <rect width="480" height="600" fill="#040c1c"/>
            {[{cx:28,cy:32,r:1.2},{cx:72,cy:18,r:1},{cx:118,cy:44,r:0.8},{cx:162,cy:14,r:1.2},{cx:208,cy:36,r:1},{cx:255,cy:20,r:0.8},{cx:295,cy:48,r:1},{cx:338,cy:22,r:1.2},{cx:382,cy:38,r:0.8},{cx:428,cy:16,r:1},{cx:455,cy:55,r:0.8},{cx:50,cy:75,r:0.8},{cx:130,cy:65,r:1},{cx:210,cy:72,r:0.8},{cx:310,cy:60,r:1},{cx:400,cy:70,r:0.8},{cx:170,cy:95,r:0.8},{cx:420,cy:88,r:1}].map((s,i)=>(
              <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={0.4+Math.random()*0.5}/>
            ))}
            <circle cx="400" cy="68" r="20" fill="#ccddf5" opacity="0.9"/>
            <circle cx="410" cy="61" r="15" fill="#040c1c"/>
            <circle cx="400" cy="68" r="34" fill="#7EC8F5" opacity="0.04"/>
            <path d="M-10 400 L55 240 L110 300 L165 218 L220 278 L275 195 L330 255 L390 210 L490 240 L490 400Z" fill="#0c1e38"/>
            <path d="M-10 420 L40 305 L90 345 L140 272 L195 328 L245 278 L295 322 L348 280 L400 308 L490 285 L490 420Z" fill="#10233f"/>
            <path d="M-20 500 L65 285 L110 335 L150 500Z" fill="#152848"/>
            <path d="M65 285 L80 320 L87 308 L83 328 L70 321 L60 334 L53 319 L46 330 L51 307Z" fill="#c0d4ee" opacity="0.85"/>
            <path d="M120 500 L220 155 L320 500Z" fill="#1a3056"/>
            <path d="M220 155 L238 210 L246 198 L242 220 L254 210 L247 235 L233 227 L224 245 L212 229 L199 238 L205 217 L193 226 L198 203 L211 214Z" fill="#d8ecff" opacity="0.88"/>
            <path d="M220 155 L240 215 L220 500Z" fill="#7EC8F5" opacity="0.04"/>
            <path d="M295 500 L368 258 L430 500Z" fill="#152848"/>
            <path d="M368 258 L381 288 L388 278 L384 296 L372 289 L364 300 L356 288 L349 298 L353 276Z" fill="#b8d0ec" opacity="0.8"/>
            <path d="M-10 478 Q120 440 240 455 Q360 470 490 448 L490 600 L-10 600Z" fill="#0b1830"/>
            <path d="M-10 508 Q120 482 240 496 Q360 510 490 490 L490 600 L-10 600Z" fill="#070e1e"/>
            <rect x="0" y="420" width="480" height="180" fill="#040c1c" opacity="0.5"/>
          </svg>
          <div style={styles.sceneOverlay}/>
          <p style={styles.logo}>Roam<em style={{fontStyle:'italic',color:'#7EC8F5'}}>Diary</em></p>
          <div style={styles.leftContent}>
            <h2 style={styles.sceneTitle}>Every journey<br/>tells a <em style={{fontStyle:'italic',color:'#7EC8F5'}}>story.</em></h2>
            <p style={styles.sceneSub}>Document the places, moments &amp; memories that matter.</p>
            <div style={styles.features}>
              {['Rich travel stories with photos','Filter by date & destination','Private, secure, always yours'].map((f,i)=>(
                <div key={i} style={styles.feat}><div style={{...styles.featDot,background:'#7EC8F5'}}/><span style={styles.featText}>{f}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={styles.right}>
          <form onSubmit={handleLogin} style={styles.form}>
            <h1 style={styles.formTitle}>Welcome back</h1>
            <p style={styles.formSub}>Sign in to continue your journey</p>

            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={({target})=>setEmail(target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <PassWordInput value={password} onChange={({target})=>setPassword(target.value)} />
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.btn}>Sign in</button>

            <p style={styles.footer}>
              Don't have an account?{' '}
              <span style={styles.link} onClick={()=>navigate('/signup')}>Create one →</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#E8EDF5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Outfit', sans-serif",
    padding: '24px',
    boxSizing: 'border-box',
  },
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderRadius: '20px',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '900px',
    minHeight: '560px',
    boxShadow: '0 8px 40px rgba(10,20,50,0.14)',
  },
  left: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '28px',
    minHeight: '560px',
  },
  sceneSvg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
  },
  sceneOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(4,12,28,0.95) 0%, rgba(4,12,28,0.15) 55%)',
    zIndex: 1,
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '22px',
    fontWeight: 600,
    color: '#fff',
    position: 'absolute',
    top: '24px', left: '28px',
    zIndex: 2, margin: 0,
  },
  leftContent: {
    position: 'relative', zIndex: 2,
  },
  sceneTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '30px', fontWeight: 500,
    color: '#fff', lineHeight: 1.25,
    margin: '0 0 8px',
  },
  sceneSub: {
    fontSize: '13px', color: 'rgba(255,255,255,0.5)',
    fontWeight: 300, lineHeight: 1.6,
    margin: '0 0 14px',
  },
  features: { display: 'flex', flexDirection: 'column', gap: '8px' },
  feat: { display: 'flex', alignItems: 'center', gap: '8px' },
  featDot: { width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0 },
  featText: { fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: 300 },
  right: {
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 40px',
  },
  form: { width: '100%', maxWidth: '320px' },
  formTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '28px', fontWeight: 600,
    color: '#0f1828', margin: '0 0 4px',
  },
  formSub: {
    fontSize: '13px', color: '#5a6d82',
    fontWeight: 300, margin: '0 0 24px',
  },
  field: { marginBottom: '14px' },
  label: {
    display: 'block', fontSize: '10px',
    fontWeight: 500, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#8896ae',
    marginBottom: '6px',
  },
  input: {
    width: '100%', height: '42px',
    borderRadius: '10px',
    border: '1px solid #dde3ef',
    background: '#f5f7fb',
    fontSize: '13px', color: '#1a2235',
    padding: '0 12px', boxSizing: 'border-box',
    outline: 'none', fontFamily: "'Outfit', sans-serif",
  },
  error: { color: '#e24b4a', fontSize: '12px', marginBottom: '8px' },
  btn: {
    width: '100%', height: '44px',
    borderRadius: '10px', background: '#1A2235',
    border: 'none', color: '#fff',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', marginTop: '6px',
  },
  footer: {
    textAlign: 'center', marginTop: '20px',
    fontSize: '13px', color: '#8896ae',
  },
  link: { color: '#2E7DBA', fontWeight: 500, cursor: 'pointer' },
}

export default Login