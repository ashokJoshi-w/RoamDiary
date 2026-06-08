import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PassWordInput from '../../components/Input/PasswordInput.jsx'
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axiosInstance.js'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!name) { setError('Please enter your name.'); return }
    if (!validateEmail(email)) { setError('Please enter a valid email address.'); return }
    if (!password) { setError('Please enter your password.'); return }
    setError('')
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name, email, password,
      })
      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken)
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.response?.data?.message) setError(err.response.data.message)
      else if (err.code === 'ERR_NETWORK') setError('Network Error: Is your backend running?')
      else setError('An error occurred. Please try again later.')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LEFT — Jungle waterfall scene */}
        <div style={styles.left}>
          <svg
            viewBox="0 0 480 600"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.sceneSvg}
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <style>{`
                @keyframes flowDown {
                  0%   { transform: translateY(0px);  opacity: 0.82; }
                  100% { transform: translateY(10px); opacity: 1;    }
                }
                @keyframes mistPulse {
                  0%   { opacity: 0.18; }
                  100% { opacity: 0.42; }
                }
                @keyframes ripple {
                  0%   { rx: 30; opacity: 0.35; }
                  100% { rx: 60; opacity: 0;    }
                }
                @keyframes float {
                  0%   { transform: translateY(0px);  }
                  100% { transform: translateY(-5px); }
                }
                .wflow { animation: flowDown 1.6s ease-in-out infinite alternate; transform-origin: 240px 140px; }
                .mist  { animation: mistPulse 2.2s ease-in-out infinite alternate; }
                .fly   { animation: float 2.8s ease-in-out infinite alternate; }
              `}</style>

              {/* Sky gradient */}
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#071a10"/>
                <stop offset="100%" stopColor="#0d2b18"/>
              </linearGradient>

              {/* Water falling gradient - bright top, fades down */}
              <linearGradient id="wgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#d4f7ec" stopOpacity="1"/>
                <stop offset="18%"  stopColor="#7ee8c8" stopOpacity="0.92"/>
                <stop offset="50%"  stopColor="#4dd9ac" stopOpacity="0.78"/>
                <stop offset="85%"  stopColor="#2ab88a" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#1a8c66" stopOpacity="0.3"/>
              </linearGradient>

              {/* Pool water */}
              <linearGradient id="poolgrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#4dd9ac" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#052e1a" stopOpacity="0.95"/>
              </linearGradient>

              {/* Rock face shading */}
              <linearGradient id="rockL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#183d20"/>
                <stop offset="100%" stopColor="#071208"/>
              </linearGradient>
              <linearGradient id="rockR" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#163318"/>
                <stop offset="100%" stopColor="#050e06"/>
              </linearGradient>

              <clipPath id="sceneClip">
                <rect width="480" height="600"/>
              </clipPath>
            </defs>

            <g clipPath="url(#sceneClip)">
              {/* Sky / background */}
              <rect width="480" height="600" fill="url(#sky)"/>

              {/* Distant canopy glow */}
              <ellipse cx="240" cy="0" rx="280" ry="140" fill="#1a4a2a" opacity="0.4"/>

              {/* ── BACK JUNGLE CANOPY ── */}
              <ellipse cx="0"   cy="100" rx="100" ry="120" fill="#0a2210"/>
              <ellipse cx="85"  cy="75"  rx="90"  ry="100" fill="#0c2812"/>
              <ellipse cx="185" cy="62"  rx="85"  ry="95"  fill="#0e2a14"/>
              <ellipse cx="295" cy="68"  rx="90"  ry="100" fill="#0c2812"/>
              <ellipse cx="395" cy="80"  rx="90"  ry="108" fill="#0a2210"/>
              <ellipse cx="480" cy="105" rx="80"  ry="90"  fill="#0a2210"/>

              {/* ── LEFT CLIFF ROCK MASS ── */}
              {/* Main body */}
              <path d="M0 0 L0 370 L105 370 L118 348 L106 322 L120 295 L105 268 L122 242 L106 215 L124 188 L108 160 L126 132 L108 105 L128 78 L112 52 L130 28 L110 0 Z"
                    fill="url(#rockL)"/>
              {/* Rock face highlights / cracks */}
              <path d="M95 370 L108 348 L96 322 L110 295 L95 268 L112 242 L96 215 L114 188 L98 160 L116 132 L98 105 L118 78 L102 52 L120 28"
                    stroke="#1e4a26" strokeWidth="2" fill="none" opacity="0.6"/>
              <path d="M75 370 L84 340 L72 308 L86 278 L74 248"
                    stroke="#1e4a26" strokeWidth="1.2" fill="none" opacity="0.35"/>
              {/* Moss on ledge top */}
              <path d="M110 0 L128 28 L112 52 L130 78 L110 90 L90 78 L75 52 L60 78 L45 52 L30 68 L15 42 L0 55 L0 0 Z"
                    fill="#1a3d22" opacity="0.85"/>
              <ellipse cx="60"  cy="72" rx="22" ry="6" fill="#236b34" opacity="0.5"/>
              <ellipse cx="100" cy="55" rx="16" ry="5" fill="#1a5228" opacity="0.45"/>
              {/* Wet seep streaks on rock */}
              <path d="M68 120 Q65 180 70 240 Q66 300 72 360"
                    stroke="#0a2a12" strokeWidth="1.5" fill="none" opacity="0.4"/>
              <path d="M48 150 Q45 210 50 270"
                    stroke="#0a2a12" strokeWidth="1" fill="none" opacity="0.3"/>

              {/* ── RIGHT CLIFF ROCK MASS ── */}
              <path d="M480 0 L480 370 L375 370 L362 348 L374 322 L360 295 L375 268 L358 242 L374 215 L356 188 L372 160 L354 132 L372 105 L352 78 L368 52 L350 28 L370 0 Z"
                    fill="url(#rockR)"/>
              <path d="M385 370 L372 348 L384 322 L370 295 L385 268 L368 242 L384 215 L366 188 L382 160 L364 132 L382 105 L362 78 L378 52 L360 28"
                    stroke="#1e4a26" strokeWidth="2" fill="none" opacity="0.6"/>
              <path d="M405 370 L396 340 L408 308 L394 278 L406 248"
                    stroke="#1e4a26" strokeWidth="1.2" fill="none" opacity="0.35"/>
              <path d="M370 0 L350 28 L368 52 L352 78 L372 90 L390 78 L405 52 L420 78 L435 52 L450 68 L465 42 L480 55 L480 0 Z"
                    fill="#1a3d22" opacity="0.85"/>
              <ellipse cx="420" cy="72" rx="22" ry="6" fill="#236b34" opacity="0.5"/>
              <path d="M412 120 Q415 180 410 240 Q414 300 408 360"
                    stroke="#0a2a12" strokeWidth="1.5" fill="none" opacity="0.4"/>

              {/* ── CLIFF EDGE / OVERHANG (where water breaks over) ── */}
              {/* Rocky lip - left side */}
              <path d="M108 88 Q120 80 135 88 Q148 95 158 85 Q168 75 178 88 Q188 100 198 88 Q208 76 218 90 L218 108 Q208 96 198 108 Q188 120 178 106 Q168 92 158 104 Q148 116 135 104 Q122 92 108 104 Z"
                    fill="#1e4a26" opacity="0.9"/>
              {/* Rocky lip - right side */}
              <path d="M262 90 Q272 78 282 90 Q292 102 302 88 Q312 74 322 88 Q332 100 342 88 Q352 76 362 88 L362 108 Q352 94 342 108 Q332 120 322 104 Q312 88 302 104 Q292 118 282 104 Q272 90 262 104 Z"
                    fill="#1e4a26" opacity="0.9"/>
              {/* Water pooling at top before fall */}
              <ellipse cx="240" cy="96" rx="46" ry="10" fill="#9fedd4" opacity="0.5"/>
              <ellipse cx="240" cy="93" rx="34" ry="6"  fill="white"   opacity="0.18"/>

              {/* ── WATERFALL BODY ── */}
              {/* The water fans out as it falls from the narrow gap between cliffs */}
              {/* Core bright plunge - narrow at top, fans to wide at bottom */}
              <path d="M218 95 Q215 130 210 165 Q205 200 200 235 Q196 268 192 300 Q188 330 185 360 L295 360 Q292 330 296 300 Q300 268 288 235 Q280 200 272 165 Q266 130 262 95 Z"
                    fill="url(#wgrad)" opacity="0.88"/>

              {/* Animated inner bright core */}
              <path className="wflow"
                    d="M228 96 Q226 132 222 168 Q218 204 216 240 Q213 272 210 305 L270 305 Q267 272 264 240 Q261 204 258 168 Q254 132 252 96 Z"
                    fill="white" opacity="0.13"/>

              {/* Left feather edge of falls */}
              <path d="M214 98 Q210 136 206 174 Q202 210 198 248 Q195 280 192 310 Q189 335 186 360 L198 360 Q200 334 204 308 Q208 276 212 244 Q216 206 220 168 Q224 132 222 98 Z"
                    fill="#9fedd4" opacity="0.45"/>

              {/* Right feather edge */}
              <path d="M266 98 Q270 136 274 174 Q278 210 282 248 Q285 280 288 310 Q291 335 294 360 L282 360 Q280 334 276 308 Q272 276 268 244 Q264 206 260 168 Q256 132 258 98 Z"
                    fill="#9fedd4" opacity="0.45"/>

              {/* Water turbulence / horizontal flow lines */}
              <path d="M215 132 Q232 126 248 132 Q258 136 266 132"
                    stroke="white" strokeWidth="1.4" fill="none" opacity="0.25"/>
              <path d="M210 168 Q228 162 248 168 Q262 173 272 168"
                    stroke="white" strokeWidth="1.2" fill="none" opacity="0.22"/>
              <path d="M205 205 Q225 199 248 205 Q265 210 276 205"
                    stroke="white" strokeWidth="1.1" fill="none" opacity="0.2"/>
              <path d="M200 242 Q222 236 248 242 Q268 248 280 242"
                    stroke="white" strokeWidth="1"   fill="none" opacity="0.18"/>
              <path d="M196 278 Q220 272 248 278 Q270 284 283 278"
                    stroke="white" strokeWidth="1"   fill="none" opacity="0.16"/>
              <path d="M192 314 Q218 308 248 314 Q272 320 286 314"
                    stroke="white" strokeWidth="0.9" fill="none" opacity="0.14"/>

              {/* ── MID-FALL ROCK SHELF (breaks the fall naturally) ── */}
              <path d="M195 230 Q210 218 228 224 Q240 228 252 220 Q265 212 278 224 Q270 244 252 238 Q240 244 228 240 Q212 246 195 230 Z"
                    fill="#163318" opacity="0.9"/>
              <path d="M195 230 Q210 218 228 224 Q240 228 252 220 Q265 212 278 224"
                    stroke="#0d2010" strokeWidth="1.2" fill="none" opacity="0.5"/>
              {/* Splash on rock shelf */}
              <ellipse cx="238" cy="226" rx="32" ry="7" fill="white" opacity="0.13"/>
              <circle cx="220" cy="220" r="2"   fill="white" opacity="0.25"/>
              <circle cx="255" cy="218" r="1.5" fill="white" opacity="0.2"/>
              <circle cx="238" cy="215" r="2.5" fill="white" opacity="0.18"/>

              {/* ── POOL AT BASE ── */}
              {/* Rocky basin rim */}
              <path d="M60 358 Q110 342 150 352 Q185 360 210 350 Q230 342 250 350 Q270 358 295 348 Q330 338 370 350 Q405 360 430 352 L440 380 Q400 398 340 392 Q280 400 240 394 Q200 400 145 392 Q90 398 50 382 Z"
                    fill="#0a1e0c"/>
              {/* Pool water surface */}
              <ellipse cx="240" cy="372" rx="185" ry="30" fill="url(#poolgrad)" opacity="0.92"/>
              {/* Pool depth */}
              <ellipse cx="240" cy="378" rx="165" ry="22" fill="#062e1a" opacity="0.7"/>
              {/* Foam burst at plunge point */}
              <ellipse cx="240" cy="360" rx="80"  ry="12" fill="white"   opacity="0.18"/>
              <ellipse cx="240" cy="358" rx="55"  ry="8"  fill="white"   opacity="0.22"/>
              <ellipse cx="240" cy="356" rx="32"  ry="5"  fill="#d4f7ec" opacity="0.35"/>
              {/* Animated mist cloud */}
              <ellipse className="mist" cx="240" cy="352" rx="100" ry="22" fill="#4dd9ac" opacity="0.12"/>
              <ellipse className="mist" cx="240" cy="348" rx="70"  ry="16" fill="white"   opacity="0.08"/>
              {/* Pool ripple rings */}
              <ellipse cx="240" cy="378" rx="140" ry="14" fill="none" stroke="#4dd9ac" strokeWidth="0.8" opacity="0.28"/>
              <ellipse cx="240" cy="384" rx="160" ry="16" fill="none" stroke="#4dd9ac" strokeWidth="0.6" opacity="0.18"/>
              <ellipse cx="240" cy="390" rx="178" ry="18" fill="none" stroke="#4dd9ac" strokeWidth="0.4" opacity="0.1"/>
              {/* Splash droplets */}
              <circle cx="190" cy="355" r="2"   fill="#9fedd4" opacity="0.5"/>
              <circle cx="175" cy="348" r="1.5" fill="white"   opacity="0.35"/>
              <circle cx="292" cy="353" r="2"   fill="#9fedd4" opacity="0.5"/>
              <circle cx="308" cy="346" r="1.5" fill="white"   opacity="0.35"/>
              <circle cx="225" cy="344" r="1.5" fill="white"   opacity="0.4"/>
              <circle cx="255" cy="346" r="1.5" fill="white"   opacity="0.38"/>
              <circle cx="240" cy="340" r="2"   fill="white"   opacity="0.3"/>
              {/* Pool surface sparkles */}
              <circle cx="160" cy="376" r="1.5" fill="#a0fce0" opacity="0.45"/>
              <circle cx="320" cy="372" r="1.5" fill="#a0fce0" opacity="0.4"/>
              <circle cx="200" cy="382" r="1"   fill="white"   opacity="0.3"/>
              <circle cx="280" cy="380" r="1"   fill="white"   opacity="0.28"/>

              {/* ── POOL-SIDE BOULDERS ── */}
              <path d="M55 360 Q72 345 95 355 Q108 362 105 380 Q88 388 62 380 Z"  fill="#0f2a12" opacity="0.95"/>
              <path d="M30 370 Q50 358 68 368 Q78 376 75 392 Q55 398 28 388 Z"   fill="#0a1e0c" opacity="0.95"/>
              <path d="M385 358 Q402 344 422 354 Q434 362 432 378 Q414 386 388 378 Z" fill="#0f2a12" opacity="0.95"/>
              <path d="M408 370 Q425 357 444 367 Q454 376 451 390 Q432 396 408 386 Z" fill="#0a1e0c" opacity="0.95"/>
              {/* Rock highlight edges */}
              <path d="M55 360 Q72 345 95 355"  stroke="#1e4a26" strokeWidth="1" fill="none" opacity="0.4"/>
              <path d="M385 358 Q402 344 422 354" stroke="#1e4a26" strokeWidth="1" fill="none" opacity="0.4"/>

              {/* ── FOREGROUND JUNGLE FOLIAGE ── */}
              {/* Mid-ground side leaves */}
              <ellipse cx="0"   cy="310" rx="88"  ry="110" fill="#0c2812"/>
              <ellipse cx="55"  cy="340" rx="78"  ry="95"  fill="#0e2e14"/>
              <ellipse cx="480" cy="320" rx="88"  ry="110" fill="#0c2812"/>
              <ellipse cx="428" cy="348" rx="78"  ry="95"  fill="#0e2e14"/>

              {/* Large foreground leaves bottom-left */}
              <path d="M-25 520 Q35 380 175 448 Q92 490 -25 520 Z"
                    fill="#1a5228" opacity="0.98"/>
              <path d="M-25 520 Q37 388 175 448"
                    stroke="#122a16" strokeWidth="1.8" fill="none" opacity="0.4"/>
              {/* Leaf veins */}
              <path d="M15 512 Q62 448 142 462" stroke="#236b34" strokeWidth="1" fill="none" opacity="0.3"/>
              <path d="M-5 500 Q48 432 130 450" stroke="#1e5c2c" strokeWidth="0.8" fill="none" opacity="0.25"/>

              <path d="M-25 600 Q50 468 172 528 Q85 568 -25 600 Z"
                    fill="#1e5e30" opacity="0.98"/>
              <path d="M-25 600 Q52 475 172 528"
                    stroke="#142e18" strokeWidth="1.5" fill="none" opacity="0.35"/>

              {/* Large foreground leaves bottom-right */}
              <path d="M505 515 Q440 378 300 448 Q385 488 505 515 Z"
                    fill="#1a5228" opacity="0.98"/>
              <path d="M505 515 Q438 385 300 448"
                    stroke="#122a16" strokeWidth="1.8" fill="none" opacity="0.4"/>
              <path d="M465 507 Q412 444 332 460" stroke="#236b34" strokeWidth="1" fill="none" opacity="0.3"/>

              <path d="M505 598 Q428 465 305 528 Q392 566 505 598 Z"
                    fill="#1e5e30" opacity="0.98"/>

              {/* ── HANGING VINES ── */}
              <path d="M55 0 Q46 95 56 190 Q50 278 60 360"
                    stroke="#1f6e38" strokeWidth="2.2" fill="none" opacity="0.42"/>
              <ellipse cx="53"  cy="108" rx="9" ry="14" fill="#1a5c30" opacity="0.65" transform="rotate(-14 53 108)"/>
              <ellipse cx="57"  cy="218" rx="8" ry="12" fill="#1f6e38" opacity="0.58" transform="rotate(9 57 218)"/>
              <path d="M82 0 Q88 72 80 148"
                    stroke="#1a5c30" strokeWidth="1.5" fill="none" opacity="0.35"/>

              <path d="M425 0 Q434 92 424 186 Q430 272 420 355"
                    stroke="#1a5c30" strokeWidth="2.2" fill="none" opacity="0.42"/>
              <ellipse cx="427" cy="112" rx="9" ry="14" fill="#1f6e38" opacity="0.62" transform="rotate(15 427 112)"/>
              <ellipse cx="422" cy="222" rx="8" ry="12" fill="#1a5c30" opacity="0.55" transform="rotate(-10 422 222)"/>
              <path d="M398 0 Q392 68 400 144"
                    stroke="#1f6e38" strokeWidth="1.5" fill="none" opacity="0.35"/>

              {/* ── FIREFLIES ── */}
              <circle className="fly" cx="80"  cy="200" r="2.5" fill="#a8ffd6" opacity="0.7"/>
              <circle className="fly" cx="400" cy="188" r="2.2" fill="#a8ffd6" opacity="0.62"/>
              <circle className="fly" cx="62"  cy="300" r="1.8" fill="#c3ffe6" opacity="0.5"/>
              <circle className="fly" cx="418" cy="290" r="2"   fill="#a8ffd6" opacity="0.55"/>
              <circle className="fly" cx="145" cy="430" r="1.8" fill="#c3ffe6" opacity="0.45"/>
              <circle className="fly" cx="335" cy="422" r="1.8" fill="#a8ffd6" opacity="0.48"/>
            </g>
          </svg>

          {/* Gradient overlay so text is readable */}
          <div style={styles.sceneOverlay}/>

          <p style={styles.logo}>Roam<em style={{ fontStyle: 'italic', color: '#5DCAA5' }}>Diary</em></p>

          <div style={styles.leftContent}>
            <h2 style={styles.sceneTitle}>
              Start your <em style={{ fontStyle: 'italic', color: '#5DCAA5' }}>journey</em><br/>today.
            </h2>
            <p style={styles.sceneSub}>Join thousands of travellers capturing their world.</p>
            <div style={styles.features}>
              {['Free forever, no credit card', 'Unlimited stories & photos', 'Access from any device'].map((f, i) => (
                <div key={i} style={styles.feat}>
                  <div style={{ ...styles.featDot, background: '#5DCAA5' }}/>
                  <span style={styles.featText}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={styles.right}>
          <form onSubmit={handleSignUp} style={styles.form}>
            <h1 style={styles.formTitle}>Create account</h1>
            <p style={styles.formSub}>Your travel journal starts here</p>

            <div style={styles.field}>
              <label style={styles.label}>Full name</label>
              <input
                type="text"
                placeholder="Ashok Joshi"
                value={name}
                onChange={({ target }) => setName(target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <PassWordInput value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={{ ...styles.btn, background: '#0F6E56' }}>
              Create account
            </button>

            <p style={styles.footer}>
              Already have an account?{' '}
              <span style={styles.link} onClick={() => navigate('/login')}>Sign in →</span>
            </p>

            <p style={styles.terms}>
              By signing up, you agree to our{' '}
              <span style={styles.termsLink}>Terms of Service</span> &amp;{' '}
              <span style={styles.termsLink}>Privacy Policy</span>
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
    minHeight: '580px',
    boxShadow: '0 8px 40px rgba(10,20,50,0.14)',
  },
  left: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '28px',
    minHeight: '580px',
  },
  sceneSvg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  sceneOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(6,14,8,0.96) 0%, rgba(6,14,8,0.08) 52%)',
    zIndex: 1,
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '22px',
    fontWeight: 600,
    color: '#fff',
    position: 'absolute',
    top: '24px',
    left: '28px',
    zIndex: 2,
    margin: 0,
  },
  leftContent: {
    position: 'relative',
    zIndex: 2,
  },
  sceneTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '30px',
    fontWeight: 500,
    color: '#fff',
    lineHeight: 1.25,
    margin: '0 0 8px',
  },
  sceneSub: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 300,
    lineHeight: 1.6,
    margin: '0 0 14px',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  feat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  featDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  featText: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 300,
  },
  right: {
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  form: {
    width: '100%',
    maxWidth: '320px',
  },
  formTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '28px',
    fontWeight: 600,
    color: '#0f1828',
    margin: '0 0 4px',
  },
  formSub: {
    fontSize: '13px',
    color: '#5a6d82',
    fontWeight: 300,
    margin: '0 0 20px',
  },
  field: {
    marginBottom: '13px',
  },
  label: {
    display: 'block',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#8896ae',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    height: '42px',
    borderRadius: '10px',
    border: '1px solid #dde3ef',
    background: '#f5f7fb',
    fontSize: '13px',
    color: '#1a2235',
    padding: '0 12px',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: "'Outfit', sans-serif",
  },
  error: {
    color: '#e24b4a',
    fontSize: '12px',
    marginBottom: '8px',
  },
  btn: {
    width: '100%',
    height: '44px',
    borderRadius: '10px',
    border: 'none',
    color: '#fff',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '4px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '18px',
    fontSize: '13px',
    color: '#8896ae',
  },
  link: {
    color: '#0F6E56',
    fontWeight: 500,
    cursor: 'pointer',
  },
  terms: {
    textAlign: 'center',
    marginTop: '14px',
    fontSize: '10px',
    color: '#aab0bc',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  termsLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}

export default SignUp