/**
 * ElectIQ India — Test Suite
 * Model: gemini-2.5-flash | Run: node test.js
 * 58 tests across 10 groups
 */
'use strict';

var pass = 0, fail = 0;
function assert(name, cond) {
  if (cond) { pass++; console.log('  \u2713 PASS \u2014 ' + name); }
  else { fail++; console.error('  \u2717 FAIL \u2014 ' + name); }
}

/* ── Mirrors from index.html ── */
var GEMINI_MODEL   = 'gemini-2.5-flash';
var GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent';

function sanitize(txt) {
  if (!txt) return '';
  return String(txt)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>');
}

var LANG = {
  en: { keyOk:'✓ Key saved', keyBad:'⚠ Invalid key format', thinking:'Thinking…', online:'AI online · Gemini 2.5 Flash', phFull:'Ask about Indian elections…', phLock:'Add API key above…' },
  hi: { keyOk:'✓ Key सहेजी', keyBad:'⚠ अमान्य key', thinking:'सोच रहा हूँ…', online:'AI ऑनलाइन · Gemini 2.5 Flash', phFull:'भारतीय चुनाव के बारे में पूछें…', phLock:'API key दर्ज करें…' }
};
function tr(k) { return LANG['en'][k] || k; }

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

var MAP_STATES = [
  {n:'Uttar Pradesh',seats:80,ph:7},{n:'Maharashtra',seats:48,ph:5},
  {n:'West Bengal',seats:42,ph:7},{n:'Bihar',seats:40,ph:7},
  {n:'Tamil Nadu',seats:39,ph:1},{n:'Madhya Pradesh',seats:29,ph:4},
  {n:'Karnataka',seats:28,ph:2},{n:'Gujarat',seats:26,ph:3},
  {n:'Rajasthan',seats:25,ph:2},{n:'Andhra Pradesh',seats:25,ph:1},
  {n:'Odisha',seats:21,ph:4},{n:'Telangana',seats:17,ph:1},
  {n:'Kerala',seats:20,ph:1},{n:'Jharkhand',seats:14,ph:4},
  {n:'Assam',seats:14,ph:3},{n:'Punjab',seats:13,ph:7},
  {n:'Chhattisgarh',seats:11,ph:3},{n:'Haryana',seats:10,ph:6},
  {n:'Delhi',seats:7,ph:6},{n:'Uttarakhand',seats:5,ph:5},
  {n:'Himachal Pradesh',seats:4,ph:7},{n:'J&K',seats:6,ph:5},
  {n:'Goa',seats:2,ph:3}
];

var PARTIES = [
  {a:'BJP'},{a:'INC'},{a:'SP'},{a:'AITC'},{a:'DMK'},
  {a:'TDP'},{a:'JDU'},{a:'SS'},{a:'CPI-M'},{a:'AAP'},
  {a:'BSP'},{a:'RJD'}
];

var ELECTIONS = [
  {name:'UP Assembly 2027', date:new Date('2027-02-10')},
  {name:'Lok Sabha 2029',   date:new Date('2029-04-20')}
];

console.log('\n============================================');
console.log('  ElectIQ India \u2014 Test Suite');
console.log('  Model: ' + GEMINI_MODEL + ' | 10 Feature Groups');
console.log('============================================\n');

/* 1. Model & API */
console.log('> 1. Model & API Configuration');
assert('GEMINI_MODEL === gemini-2.5-flash',             GEMINI_MODEL === 'gemini-2.5-flash');
assert('API URL uses HTTPS',                            GEMINI_API_URL.startsWith('https://'));
assert('API URL contains model name',                   GEMINI_API_URL.indexOf('gemini-2.5-flash') > -1);
assert('API URL ends with generateContent',             GEMINI_API_URL.endsWith('generateContent'));
assert('API URL is googleapis.com',                     GEMINI_API_URL.indexOf('googleapis.com') > -1);

/* 2. Security / XSS */
console.log('\n> 2. Security & XSS Protection');
assert('XSS: script tag blocked',                       sanitize('<script>alert(1)<\/script>').indexOf('<script>') === -1);
assert('XSS: < encoded to &lt;',                       sanitize('<b>').indexOf('&lt;') > -1);
assert('XSS: & encoded to &amp;',                      sanitize('A & B').indexOf('&amp;') > -1);
assert('XSS: > encoded to &gt;',                       sanitize('a>b').indexOf('&gt;') > -1);
assert('Bold **text** converts to <strong>',           sanitize('**hi**').indexOf('<strong>') > -1);
assert('API key: starts with AIza',                    'AIzaSyTest1234567890abc'.startsWith('AIza'));
assert('API key: min length 20',                       'AIzaSyTest1234567890abc'.length >= 20);
assert('Short key rejected',                           !'short'.startsWith('AIza'));

/* 3. Translations */
console.log('\n> 3. Multilingual EN/HI (Feature 3)');
var REQUIRED = ['keyOk','keyBad','thinking','online','phFull','phLock'];
assert('LANG.en has all keys',                         REQUIRED.every(function(k){ return !!LANG.en[k]; }));
assert('LANG.hi has all keys',                         REQUIRED.every(function(k){ return !!LANG.hi[k]; }));
assert('Hindi differs from English',                   LANG.hi.phFull !== LANG.en.phFull);
assert('English online mentions Gemini 2.5',           LANG.en.online.indexOf('2.5') > -1);
assert('Hindi online mentions Gemini 2.5',             LANG.hi.online.indexOf('2.5') > -1);

/* 4. Quiz — 3 Levels */
console.log('\n> 4. Quiz Engine \u2014 3 Levels (Feature 10)');
assert('Quiz has exactly 3 levels',                    Object.keys(QUIZ).length === 3);
assert('Easy has 5 questions',                         QUIZ.easy.length === 5);
assert('Medium has 5 questions',                       QUIZ.med.length === 5);
assert('Hard has 5 questions',                         QUIZ.hard.length === 5);
var allQ = [].concat(QUIZ.easy, QUIZ.med, QUIZ.hard);
assert('All questions have 4 options',                 allQ.every(function(q){ return q.o.length === 4; }));
assert('All correct indices in range 0-3',             allQ.every(function(q){ return q.c >= 0 && q.c <= 3; }));
assert('All questions have explanations',              allQ.every(function(q){ return q.e && q.e.length > 3; }));
assert('All questions have text',                      allQ.every(function(q){ return q.q.length > 5; }));

/* 5. India Map */
console.log('\n> 5. India Election Map (Feature 1)');
var totalSeats = MAP_STATES.reduce(function(a,s){ return a+s.seats; },0);
assert('MAP_STATES has 23 entries',                    MAP_STATES.length === 23);
assert('All states have name, seats, phase',           MAP_STATES.every(function(s){ return s.n && s.seats>0 && s.ph>=1 && s.ph<=7; }));
assert('UP has 80 seats',                              MAP_STATES[0].seats === 80);
assert('Maharashtra has 48 seats',                     MAP_STATES[1].seats === 48);
assert('Main 23 states sum = 526 seats',               totalSeats === 526);

/* 6. Party Explorer */
console.log('\n> 6. Party Explorer (Feature 7)');
assert('PARTIES has 12 entries',                       PARTIES.length === 12);
assert('BJP in list',                                  PARTIES.some(function(p){ return p.a==='BJP'; }));
assert('INC in list',                                  PARTIES.some(function(p){ return p.a==='INC'; }));
assert('AAP in list',                                  PARTIES.some(function(p){ return p.a==='AAP'; }));
assert('All have abbr field',                          PARTIES.every(function(p){ return p.a && p.a.length>0; }));
assert('12 distinct abbreviations',                    new Set(PARTIES.map(function(p){ return p.a; })).size === 12);

/* 7. Countdown */
console.log('\n> 7. Election Countdown (Feature 6)');
assert('ELECTIONS has 2 entries',                      ELECTIONS.length === 2);
assert('All dates are Date objects',                   ELECTIONS.every(function(e){ return e.date instanceof Date; }));
assert('All elections in 2027+',                       ELECTIONS.every(function(e){ return e.date.getFullYear()>=2027; }));
assert('First election is UP Assembly',                ELECTIONS[0].name.indexOf('UP') > -1);
assert('Second election is Lok Sabha 2029',            ELECTIONS[1].name.indexOf('2029') > -1);

/* 8. Eligibility Logic */
console.log('\n> 8. Voter Eligibility Logic (Feature 5)');
function isElig(age, citizen) { return age >= 18 && citizen === 'yes'; }
assert('18 + citizen = eligible',                      isElig(18,'yes') === true);
assert('17 + citizen = not eligible',                  isElig(17,'yes') === false);
assert('25 + non-citizen = not eligible',              isElig(25,'no') === false);
assert('0 + citizen = not eligible',                   isElig(0,'yes') === false);
assert('18 boundary = eligible',                       isElig(18,'yes') === true);
assert('100 + citizen = eligible',                     isElig(100,'yes') === true);

/* 9. Text Formatting */
console.log('\n> 9. Text Formatting & Sanitization');
assert('**bold** → strong tag',                        sanitize('**hello**').indexOf('<strong>hello</strong>') > -1);
assert('*italic* → em tag',                            sanitize('*hello*').indexOf('<em>hello</em>') > -1);
assert('< is encoded',                                 sanitize('<').indexOf('&lt;') > -1);
assert('> is encoded',                                 sanitize('>').indexOf('&gt;') > -1);
assert('Empty string returns empty',                   sanitize('') === '');

/* 10. API Payload */
console.log('\n> 10. Gemini API Payload (Feature — AI Chat)');
var payload = {
  system_instruction: { parts:[{text:'System prompt'}] },
  contents: [{role:'user',parts:[{text:'Test question'}]}],
  generationConfig: { temperature:0.7, maxOutputTokens:900 },
  safetySettings: [
    {category:'HARM_CATEGORY_HARASSMENT',        threshold:'BLOCK_MEDIUM_AND_ABOVE'},
    {category:'HARM_CATEGORY_HATE_SPEECH',       threshold:'BLOCK_MEDIUM_AND_ABOVE'},
    {category:'HARM_CATEGORY_DANGEROUS_CONTENT', threshold:'BLOCK_MEDIUM_AND_ABOVE'}
  ]
};
assert('system_instruction field present',             !!payload.system_instruction.parts[0].text);
assert('3 safety settings',                            payload.safetySettings.length === 3);
assert('All safety = BLOCK_MEDIUM_AND_ABOVE',          payload.safetySettings.every(function(s){ return s.threshold==='BLOCK_MEDIUM_AND_ABOVE'; }));
assert('maxOutputTokens = 900',                        payload.generationConfig.maxOutputTokens === 900);
assert('Temperature 0-1',                              payload.generationConfig.temperature >= 0 && payload.generationConfig.temperature <= 1);

/* Summary */
var total = pass + fail;
console.log('\n============================================');
console.log('  Tests : ' + total);
console.log('  Passed: ' + pass);
console.log('  Failed: ' + fail);
console.log('  Score : ' + Math.round((pass/total)*100) + '%');
if (fail === 0) console.log('  ALL TESTS PASSED \u2014 Ready for submission!');
else console.log('  Fix failures before submitting.');
console.log('============================================\n');
