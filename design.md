:root {
  --blue:        #0571BE;
  --dark:        #000321;
  --text:        #565A7C;
  --white:       #FFFFFF;
  --bg-light:    #FBF9F8;
  --bg-white:    #FFFFFF;

  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --radius-sm:   0.375rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-2xl:  1.5rem;
  --radius-full: 9999px;

  --shadow-sm:  0 1px 3px rgba(0,0,0,.06);
  --shadow-md:  0 4px 12px rgba(0,0,0,.08);
  --shadow-lg:  0 10px 24px rgba(0,0,0,.10);
  --shadow-xl:  0 20px 40px rgba(0,0,0,.12);

  --ease: 250ms ease;
  --ease-slow: 350ms ease;

  --max-w: 1200px;
  --px: 1.5rem;
}

/* ============================================================
   RESET
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; overflow-x: hidden; }
body {
  font-family: var(--font);
  color: var(--text);
  background: var(--bg-white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
img { max-width: 100%; height: auto; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ============================================================
   UTILITIES
   ============================================================ */
.container {
  max-width: var(--max-w);
  margin-inline: auto;
  padding-inline: var(--px);
}

/* ============================================================
   ANIMATIONS
   ============================================================ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

.animate-fade-up {
  opacity: 0;
  animation: fadeUp .7s ease forwards;
}
.animate-fade-up:nth-child(1) { animation-delay: .1s; }
.animate-fade-up:nth-child(2) { animation-delay: .25s; }
.animate-fade-up:nth-child(3) { animation-delay: .4s; }
.animate-fade-up:nth-child(4) { animation-delay: .55s; }

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .6s ease, transform .6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: .75rem 1.75rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: .01em;
  transition: all var(--ease);
  white-space: nowrap;
  border: 2px solid transparent;
}

.btn--primary {
  background: var(--blue);
  color: var(--white);
  border-color: var(--blue);
}
.btn--primary:hover {
  background: #0462a8;
  border-color: #0462a8;
}

.btn--outline-primary {
  background: transparent;
  color: var(--blue);
  border-color: var(--blue);
}
.btn--outline-primary:hover {
  background: var(--blue);
  color: var(--white);
  transform: translateY(-2px);
}

.btn--outline-white {
  background: transparent;
  color: var(--white);
  border-color: var(--white);
}
.btn--outline-white:hover {
  background: var(--white);
  color: var(--blue);
  transform: translateY(-2px);
}

.btn--white {
  background: var(--white);
  color: var(--blue);
  border-color: var(--white);
}
.btn--white:hover {
  background: transparent;
  color: var(--white);
  transform: translateY(-2px);
}

.btn--lg { padding: 1rem 2rem; font-size: 1.0625rem; }
.btn--full { width: 100%; }
.btn--pill { border-radius: var(--radius-full) !important; }



Brand / Accent
Export
#2C3E50
Blue
37
#3498DB
Blue
8
#FF0000
Red
6
#FF9B00
Orange/Yellow
4
#F97316
Red
4
Background Methods
Export
#FFFFFF
Color
15
#FBF9F8
Color
2
#3498DB
Color
2
#E8F0FE
Color
2
#2C3E50
Color
1
#DC2626
Color
1
#0A0A09
Color
1
#3B82F6
Color
1
Typography Colors
Export
#000000
Color
234
#FFFFFF
Color
58
#2C3E50
Color
32
#3F3F3F
Color
22
#FF0000
Color
6
#FF9B00
Color
4
#F97316
Color
4
#3498DB
Color
3
Border Colors
Export
#E5E7EB
Color
348
#000000
Color
7
#2C3E50
Color
4
#3498DB
Color
3
#DDDDDD
Color
3
#3F3F3F
Color
2
#FFFFFF
Color
2
#F59E0B
Color
2
All Colors (25)
Export All
#E5E7EB
348×
#000000
241×
#FFFFFF
75×
#2C3E50
37×
#3F3F3F
24×
#3498DB
8×
#FF0000
6×
#FF9B00
4×
#F97316
4×
#F59E0B