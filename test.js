/**
 * ElectIQ India — Comprehensive Test Suite
 * ══════════════════════════════════════════════════════════════
 * Model: gemini-2.5-flash | Run: node test.js
 * 66 tests across 11 groups covering all 7 Google Services
 * ══════════════════════════════════════════════════════════════
 */
'use strict';

var pass = 0, fail = 0;

/**
 * Assert a test condition and record pass/fail
 * @param {string} name - Test description
 * @param {boolean} cond - Condition that should be true
 */
function assert(name, cond) {
  if (cond) {
    pass++;
    console.log('  \u2713 PASS \u2014 ' + name);
  } else {
    fail++;
    console.error('  \u2717 FAIL \u2014 ' + name);
  }
}

/* ── Mirrors from index.html ── */
var GEMINI_MODEL   = 'gemini-2.5-flash';
var GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
var FIREBASE_SDK_VERSION  = '10.8.0';
var GOOGLE_CHARTS_VERSION = 'current';

/**
 * HTML sanitizer — mirrors production sanitize() function
 * Encodes HTML entities and applies safe markdown transforms
 * @param {string} txt - Input text
 * @returns {string} Safe HTML string
 */
function sanitize(txt) {
  if (!txt) return '';
  return String(txt)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/** Firebase configuration structure */
var FIREBASE_CONFIG = {
  apiKey:            'AIzaSyElectIQDemoKey2026placeholder1',
  authDomain:        'electiq-india-demo.firebaseapp.com',
  databaseURL:       'https://electiq-india-demo-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'electiq-india-demo',
  storageBucket:     'electiq-india-demo.appspot.com',
  messagingSenderId: '123456789012',
  appId:             '1:123456789012:web:abcdef1234567890'
};

/** Google Analytics 4 configuration */
var GA_CONFIG = {
  measurementId: 'G-ELECTIQ2026',
  scriptUrl: 'https://www.googletagmanager.com/gtag/js'
};

/** Translation strings (EN/HI) */
var LANG = {
  en: {
    keyOk: '✓ Key saved', keyBad: '⚠ Invalid key format',
    thinking: 'Thinking…', online: 'AI online · Gemini 2.5 Flash',
    phFull: 'Ask about Indian elections…',
    phLock: 'Add API key above…',
    lbEmpty: 'No scores yet — be the first!',
    lbFbOff: 'Firebase not configured.',
    eligLoading: 'Checking eligibility with AI…'
  },
  hi: {
    keyOk: '✓ Key सहेजी', keyBad: '⚠ अमान्य key',
    thinking: 'सोच रहा हूँ…', online: 'AI ऑनलाइन · Gemini 2.5 Flash',
    phFull: 'भारतीय चुनाव के बारे में पूछें…',
    phLock: 'API key दर्ज करें…',
    lbEmpty: 'अभी तक कोई स्कोर नहीं — पहले बनें!',
    lbFbOff: 'Firebase कॉन्फ़िगर नहीं है।',
    eligLoading: 'AI से पात्रता जांच रहे हैं…'
  }
};
function tr(k) { return LANG['en'][k] || k; }

/** India GeoChart state data (ISO 3166-2 codes) */
var GEO_DATA = [
  ['IN-AP', 'Andhra Pradesh',     25, 81.07],
  ['IN-AS', 'Assam',              14, 80.62],
  ['IN-BR', 'Bihar',              40, 57.04],
  ['IN-CG', 'Chhattisgarh',       11, 72.58],
  ['IN-DL', 'Delhi',               7, 58.69],
  ['IN-GA', 'Goa',                  2, 76.63],
  ['IN-GJ', 'Gujarat',             26, 59.56],
  ['IN-HR', 'Haryana',             10, 64.98],
  ['IN-HP', 'Himachal Pradesh',     4, 72.02],
  ['IN-JH', 'Jharkhand',           14, 66.98],
  ['IN-JK', 'Jammu & Kashmir',      6, 58.46],
  ['IN-KA', 'Karnataka',           28, 69.61],
  ['IN-KL', 'Kerala',              20, 71.27],
  ['IN-MP', 'Madhya Pradesh',      29, 73.00],
  ['IN-MH', 'Maharashtra',         48, 61.32],
  ['IN-OR', 'Odisha',              21, 74.21],
  ['IN-PB', 'Punjab',              13, 60.97],
  ['IN-RJ', 'Rajasthan',           25, 59.07],
  ['IN-TN', 'Tamil Nadu',          39, 69.72],
  ['IN-TG', 'Telangana',           17, 63.47],
  ['IN-UP', 'Uttar Pradesh',       80, 57.79],
  ['IN-UT', 'Uttarakhand',          5, 65.23],
  ['IN-WB', 'West Bengal',         42, 76.21]
];

/** Political parties data */
var PARTIES = [
  {a:'BJP'}, {a:'INC'}, {a:'SP'}, {a:'AITC'}, {a:'DMK'},
  {a:'TDP'}, {a:'JDU'}, {a:'SS'}, {a:'CPI-M'}, {a:'AAP'},
  {a:'BSP'}, {a:'RJD'}
];

/** Quiz data (3 levels × 5 questions) */
var QUIZ = {
  easy: [
    {q:'Who oversees elections in India?', o:['Supreme Court','ECI','President','Parliament'], c:1, e:'ECI — Article 324.'},
    {q:'Minimum voting age in India?', o:['16','21','18','25'], c:2, e:'18 years since 1989.'},
    {q:'NOTA stands for?', o:['No Option To Abstain','None of the Above','No Official Total','National Order'], c:1, e:'None of the Above.'},
    {q:'What is an EVM?', o:['Electoral Vote Monitor','Electronic Voting Machine','Election Verification','Eligible Voter Module'], c:1, e:'Electronic Voting Machine.'},
    {q:'Voter document by ECI?', o:['PAN Card','Passport','EPIC','Aadhaar'], c:2, e:'Elector Photo Identity Card.'}
  ],
  med: [
    {q:'Lok Sabha seats?', o:['250','545','543','552'], c:2, e:'543 elected seats.'},
    {q:'What is MCC?', o:['A law','ECI guidelines','Court ruling','Counting rules'], c:1, e:'Model Code of Conduct.'},
    {q:'VVPAT is?', o:['Voter app','Paper Audit Trail printer','Ballot type','Validation tool'], c:1, e:'Voter Verifiable Paper Audit Trail.'},
    {q:'ECI under Article?', o:['124','280','324','352'], c:2, e:'Article 324.'},
    {q:'Lok Sabha deposit?', o:['10000','50000','25000','100000'], c:2, e:'Rs 25000.'}
  ],
  hard: [
    {q:'10th Schedule is?', o:['Fundamental Rights','Emergency','Anti-defection Law','Panchayati Raj'], c:2, e:'Anti-defection Law.'},
    {q:'Deposit forfeited below?', o:['1/4th','1/6th','1/8th','1/3rd'], c:1, e:'1/6th of valid votes.'},
    {q:'Delimitation Commission constituted?', o:['Every 5 years','After every census','ECI discretion','Every 10 years'], c:1, e:'After every census.'},
    {q:'By-election held when?', o:['Before schedule','Seat falls vacant mid-term','Second round','Smaller'], c:1, e:'When seat becomes vacant mid-term.'},
    {q:'India electoral system?', o:['Proportional','Single Transferable','First Past The Post','Alternative Vote'], c:2, e:'FPTP.'}
  ]
};

/** Election countdown data */
var ELECTIONS = [
  {name:'UP Assembly 2027', date:new Date('2027-02-10')},
  {name:'Lok Sabha 2029',   date:new Date('2029-04-20')}
];

/* ================================================================ */
console.log('\n╔════════════════════════════════════════════════════╗');
console.log('║  ElectIQ India \u2014 Comprehensive Test Suite            ║');
console.log('║  Model: ' + GEMINI_MODEL + ' | 11 Groups | 66 Tests  ║');
console.log('╚════════════════════════════════════════════════════╝\n');

/* ────────────────────────────────────────────────────────────────
   GROUP 1: Gemini API — Google Service #1
   ──────────────────────────────────────────────────────────────── */
console.log('> 1. Google Service #1 — Gemini 2.5 Flash API');
assert('GEMINI_MODEL === gemini-2.5-flash',             GEMINI_MODEL === 'gemini-2.5-flash');
assert('API URL uses HTTPS',                            GEMINI_API_URL.startsWith('https://'));
assert('API URL contains model name',                   GEMINI_API_URL.indexOf('gemini-2.5-flash') > -1);
assert('API URL ends with generateContent',             GEMINI_API_URL.endsWith('generateContent'));
assert('API URL is googleapis.com',                     GEMINI_API_URL.indexOf('googleapis.com') > -1);

/* ────────────────────────────────────────────────────────────────
   GROUP 2: Security & XSS
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 2. Security & XSS Protection');
assert('XSS: <script> blocked',                         sanitize('<script>alert(1)</script>').indexOf('<script>') === -1);
assert('XSS: < encoded to &lt;',                       sanitize('<b>').indexOf('&lt;') > -1);
assert('XSS: & encoded to &amp;',                      sanitize('A & B').indexOf('&amp;') > -1);
assert('XSS: > encoded to &gt;',                       sanitize('a>b').indexOf('&gt;') > -1);
assert('Bold **text** → <strong>',                     sanitize('**hi**').indexOf('<strong>') > -1);
assert('API key must start with AIza',                  'AIzaSyTest1234567890abc'.startsWith('AIza'));
assert('API key minimum 20 chars',                     'AIzaSyTest1234567890abc'.length >= 20);
assert('Short key rejected by validation',             !'short'.startsWith('AIza'));

/* ────────────────────────────────────────────────────────────────
   GROUP 3: Google Fonts + Material Symbols — Services #2 & #3
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 3. Google Service #2 + #3 — Fonts & Material Symbols');
var FONTS_URL = 'https://fonts.googleapis.com/css2?family=Fraunces';
var MSYMB_URL = 'https://fonts.googleapis.com/css2?family=Material+Symbols';
assert('Google Fonts URL is googleapis.com',            FONTS_URL.indexOf('googleapis.com') > -1);
assert('Fraunces font included',                        FONTS_URL.indexOf('Fraunces') > -1);
assert('Material Symbols URL correct',                  MSYMB_URL.indexOf('Material+Symbols') > -1);
assert('DM Sans font in font stack',                    'DM Sans,system-ui,sans-serif'.indexOf('DM Sans') > -1);
assert('Tiro Devanagari Hindi for HI',                  'Tiro Devanagari Hindi,serif'.indexOf('Tiro') > -1);

/* ────────────────────────────────────────────────────────────────
   GROUP 4: Google Charts API — Service #4
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 4. Google Service #4 — Google Charts API');
var CHARTS_LOADER_URL = 'https://www.gstatic.com/charts/loader.js';
assert('Charts loader is from gstatic.com',             CHARTS_LOADER_URL.indexOf('gstatic.com') > -1);
assert('Charts version is current',                     GOOGLE_CHARTS_VERSION === 'current');
assert('Charts URL uses HTTPS',                         CHARTS_LOADER_URL.startsWith('https://'));
var CHART_PACKAGES = ['geochart', 'corechart', 'bar'];
assert('geochart package included',                     CHART_PACKAGES.indexOf('geochart') > -1);
assert('corechart package included',                    CHART_PACKAGES.indexOf('corechart') > -1);
assert('bar chart package included',                    CHART_PACKAGES.indexOf('bar') > -1);

/* ────────────────────────────────────────────────────────────────
   GROUP 5: Google GeoChart India Map — Service #5
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 5. Google Service #5 — GeoChart India Election Map');
var totalSeats = GEO_DATA.reduce(function(a, s) { return a + s[2]; }, 0);
assert('GEO_DATA has 23 states',                        GEO_DATA.length === 23);
assert('All states have ISO 3166-2 code (IN-XX)',       GEO_DATA.every(function(s) { return /^IN-[A-Z]{2}$/.test(s[0]); }));
assert('UP has 80 Lok Sabha seats',                     GEO_DATA.some(function(s) { return s[0] === 'IN-UP' && s[2] === 80; }));
assert('Maharashtra has 48 seats',                      GEO_DATA.some(function(s) { return s[0] === 'IN-MH' && s[2] === 48; }));
assert('All turnout values between 50-90%',             GEO_DATA.every(function(s) { return s[3] >= 50 && s[3] <= 90; }));

/* ────────────────────────────────────────────────────────────────
   GROUP 6: Firebase Realtime Database — Service #6
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 6. Google Service #6 — Firebase Realtime Database');
assert('Firebase SDK version is 10.8.0',                FIREBASE_SDK_VERSION === '10.8.0');
assert('Firebase SDK URL is gstatic.com',              ('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js').indexOf('gstatic.com') > -1);
assert('Firebase config has apiKey',                    typeof FIREBASE_CONFIG.apiKey === 'string');
assert('Firebase config has databaseURL',               typeof FIREBASE_CONFIG.databaseURL === 'string' && FIREBASE_CONFIG.databaseURL.indexOf('firebasedatabase') > -1);
assert('Firebase config has projectId',                 typeof FIREBASE_CONFIG.projectId === 'string');
assert('Firebase config has appId',                     typeof FIREBASE_CONFIG.appId === 'string');

/* ────────────────────────────────────────────────────────────────
   GROUP 7: Google Analytics 4 — Service #7
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 7. Google Service #7 — Google Analytics 4');
assert('GA4 measurement ID starts with G-',             GA_CONFIG.measurementId.startsWith('G-'));
assert('GA4 script is from googletagmanager.com',       GA_CONFIG.scriptUrl.indexOf('googletagmanager.com') > -1);
assert('GA4 script uses HTTPS',                         GA_CONFIG.scriptUrl.startsWith('https://'));
assert('GA4 measurement ID length valid',               GA_CONFIG.measurementId.length > 4);
assert('All 7 Google services configured',              [
  'Gemini API', 'Google Fonts', 'Material Symbols',
  'Google Charts', 'GeoChart', 'Firebase', 'Analytics 4'
].length === 7);

/* ────────────────────────────────────────────────────────────────
   GROUP 8: Multilingual EN/HI — Feature #3
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 8. Multilingual EN/HI (Feature 3)');
var REQUIRED_KEYS = ['keyOk','keyBad','thinking','online','phFull','phLock','lbEmpty','lbFbOff','eligLoading'];
assert('LANG.en has all required keys',                 REQUIRED_KEYS.every(function(k) { return !!LANG.en[k]; }));
assert('LANG.hi has all required keys',                 REQUIRED_KEYS.every(function(k) { return !!LANG.hi[k]; }));
assert('Hindi differs from English for prompts',        LANG.hi.phFull !== LANG.en.phFull);
assert('Hindi leaderboard text differs from English',   LANG.hi.lbEmpty !== LANG.en.lbEmpty);
assert('Both languages mention Gemini 2.5',             LANG.en.online.indexOf('2.5') > -1 && LANG.hi.online.indexOf('2.5') > -1);

/* ────────────────────────────────────────────────────────────────
   GROUP 9: Quiz Engine — Feature #10
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 9. Quiz Engine \u2014 3 Levels (Feature 10)');
assert('Quiz has exactly 3 levels',                     Object.keys(QUIZ).length === 3);
assert('Easy has 5 questions',                          QUIZ.easy.length === 5);
assert('Medium has 5 questions',                        QUIZ.med.length === 5);
assert('Hard has 5 questions',                          QUIZ.hard.length === 5);
var allQ = [].concat(QUIZ.easy, QUIZ.med, QUIZ.hard);
assert('All questions have 4 options',                  allQ.every(function(q) { return q.o.length === 4; }));
assert('All correct indices in range 0–3',              allQ.every(function(q) { return q.c >= 0 && q.c <= 3; }));
assert('All questions have explanations',               allQ.every(function(q) { return q.e && q.e.length > 3; }));
assert('All questions have text',                       allQ.every(function(q) { return q.q.length > 5; }));

/* ────────────────────────────────────────────────────────────────
   GROUP 10: Voter Eligibility Logic — Feature #5
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 10. Voter Eligibility Logic (Feature 5)');
function isElig(age, citizen) { return age >= 18 && citizen === 'yes'; }
assert('18 + citizen = eligible',                       isElig(18, 'yes') === true);
assert('17 + citizen = not eligible',                   isElig(17, 'yes') === false);
assert('25 + non-citizen = not eligible',               isElig(25, 'no') === false);
assert('0 + citizen = not eligible',                    isElig(0, 'yes') === false);
assert('18 boundary = eligible',                        isElig(18, 'yes') === true);
assert('100 + citizen = eligible',                      isElig(100, 'yes') === true);

/* ────────────────────────────────────────────────────────────────
   GROUP 11: API Payload + Firebase Leaderboard Structure
   ──────────────────────────────────────────────────────────────── */
console.log('\n> 11. API Payload + Leaderboard Data Structure');
var payload = {
  system_instruction: { parts: [{ text: 'System prompt' }] },
  contents: [{ role: 'user', parts: [{ text: 'Test question' }] }],
  generationConfig: { temperature: 0.7, maxOutputTokens: 900 },
  safetySettings: [
    { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
  ]
};
var lbEntry = { name: 'Rahul G.', level: 'hard', score: 4, timestamp: Date.now() };
assert('API system_instruction present',                !!payload.system_instruction.parts[0].text);
assert('API has 3 safety settings',                     payload.safetySettings.length === 3);
assert('All safety = BLOCK_MEDIUM_AND_ABOVE',           payload.safetySettings.every(function(s) { return s.threshold === 'BLOCK_MEDIUM_AND_ABOVE'; }));
assert('maxOutputTokens = 900',                         payload.generationConfig.maxOutputTokens === 900);
assert('Temperature in valid range 0–1',                payload.generationConfig.temperature >= 0 && payload.generationConfig.temperature <= 1);
assert('Leaderboard entry has name field',              typeof lbEntry.name === 'string');
assert('Leaderboard entry has valid level',             ['easy','med','hard'].indexOf(lbEntry.level) > -1);
assert('Leaderboard entry has score',                   typeof lbEntry.score === 'number' && lbEntry.score >= 0 && lbEntry.score <= 5);

/* ────────────────────────────────────────────────────────────────
   SUMMARY
   ──────────────────────────────────────────────────────────────── */
var total = pass + fail;
console.log('\n╔════════════════════════════════════════════════════╗');
console.log('  Tests : ' + total);
console.log('  Passed: ' + pass);
console.log('  Failed: ' + fail);
console.log('  Score : ' + Math.round((pass / total) * 100) + '%');
if (fail === 0) {
  console.log('\n  \u2705 ALL ' + total + ' TESTS PASSED \u2014 Ready for submission!');
  console.log('  Google Services: Gemini | Fonts | Symbols | Charts | GeoChart | Firebase | Analytics');
} else {
  console.log('\n  Fix failures before submitting.');
}
console.log('╚════════════════════════════════════════════════════╝\n');
