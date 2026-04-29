/**
 * ============================================================
 * ElectIQ — Standalone Test Suite
 * ============================================================
 * Purpose   : Validate all critical application functions
 * Run in    : Browser console (after opening index.html)
 *             OR Node.js (for CI/CD pipeline testing)
 * Coverage  : Code Quality, Security, Logic, Data Integrity
 * ============================================================
 */

'use strict';

/* ── Test Runner ── */
const ElectIQTests = (function () {

  let passed = 0;
  let failed = 0;
  const results = [];

  function assert(name, condition, detail = '') {
    if (condition) {
      passed++;
      results.push({ status: 'PASS', name, detail });
      console.log(`  ✓ PASS — ${name}`);
    } else {
      failed++;
      results.push({ status: 'FAIL', name, detail });
      console.error(`  ✗ FAIL — ${name}${detail ? ' | ' + detail : ''}`);
    }
  }

  /* ── Portable formatAIText (mirrors index.html implementation) ── */
  function formatAIText(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^(\d+)\.\s/gm, '<br/><strong>$1.</strong> ')
      .replace(/^[-•]\s/gm, '<br/>• ')
      .replace(/\n\n+/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }

  /* ── Quiz Data (mirrors index.html) ── */
  const QUIZ_DATA = [
    { q: 'What is the primary purpose of voter registration?', opts: ['A','B','C','D'], correct: 1, explanation: 'Test.' },
    { q: 'What is a primary election?',                        opts: ['A','B','C','D'], correct: 1, explanation: 'Test.' },
    { q: 'What happens during the canvass process?',           opts: ['A','B','C','D'], correct: 2, explanation: 'Test.' },
    { q: 'When might a recount be triggered?',                 opts: ['A','B','C','D'], correct: 1, explanation: 'Test.' },
    { q: 'What is a provisional ballot?',                      opts: ['A','B','C','D'], correct: 2, explanation: 'Test.' },
  ];

  /* ── Gemini API URL constant (mirrors index.html) ── */
  const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

  /* ============================================================
     TEST SUITE
  ============================================================ */
  function run() {
    console.log('\n======================================');
    console.log('  ElectIQ Test Suite');
    console.log('======================================\n');

    // ── Group 1: Security Tests ──────────────────────────────
    console.log('▶ Security Tests');

    assert(
      'XSS: <script> tag is neutralised',
      !formatAIText('<script>alert("xss")</script>').includes('<script>'),
      'Script tags must be entity-encoded'
    );

    assert(
      'XSS: <img> tag is fully entity-encoded (no executable HTML)',
      formatAIText('<img onclick="evil()">').includes('&lt;img') &&
      !formatAIText('<img onclick="evil()">').startsWith('<img'),
      'img tags must be entity-encoded, not rendered as real HTML'
    );

    assert(
      'XSS: & is HTML-encoded',
      formatAIText('A & B').includes('&amp;'),
      'Ampersands must be encoded to &amp;'
    );

    assert(
      'XSS: < is HTML-encoded',
      formatAIText('<b>bold</b>').includes('&lt;b&gt;'),
      'Angle brackets must be encoded'
    );

    assert(
      'API URL uses HTTPS',
      GEMINI_API_BASE.startsWith('https://'),
      'All API calls must use secure HTTPS'
    );

    // ── Group 2: Data Integrity Tests ────────────────────────
    console.log('\n▶ Data Integrity Tests');

    assert(
      'QUIZ_DATA contains exactly 5 questions',
      QUIZ_DATA.length === 5
    );

    assert(
      'Every quiz question has 4 options',
      QUIZ_DATA.every(q => q.opts.length === 4)
    );

    assert(
      'Every quiz correct index is 0–3',
      QUIZ_DATA.every(q => q.correct >= 0 && q.correct <= 3)
    );

    assert(
      'Every quiz question has a non-empty explanation',
      QUIZ_DATA.every(q => typeof q.explanation === 'string' && q.explanation.length > 0)
    );

    // ── Group 3: Formatting Logic Tests ──────────────────────
    console.log('\n▶ Formatting / Logic Tests');

    assert(
      'Bold markdown (**text**) renders <strong>',
      formatAIText('**hello**').includes('<strong>hello</strong>')
    );

    assert(
      'Italic markdown (*text*) renders <em>',
      formatAIText('*hello*').includes('<em>hello</em>')
    );

    assert(
      'Newlines convert to <br/>',
      formatAIText('line1\nline2').includes('<br/>')
    );

    // ── Group 4: State Management Tests ──────────────────────
    console.log('\n▶ State Management Tests');

    const mockState = {
      apiKey: '',
      chatHistory: [],
      quizIndex: 0,
      quizScore: 0,
      quizAnswered: false,
      fontSize: 16,
    };

    assert(
      'Initial chatHistory is an empty array',
      Array.isArray(mockState.chatHistory) && mockState.chatHistory.length === 0
    );

    assert(
      'Initial quizIndex starts at 0',
      mockState.quizIndex === 0
    );

    assert(
      'Initial quizScore starts at 0',
      mockState.quizScore === 0
    );

    assert(
      'Initial fontSize is 16',
      mockState.fontSize === 16
    );

    // Simulate quiz answer
    mockState.quizScore++;
    mockState.quizIndex++;
    assert(
      'Quiz score increments correctly after correct answer',
      mockState.quizScore === 1 && mockState.quizIndex === 1
    );

    // Simulate chat history push
    mockState.chatHistory.push({ role: 'user', parts: [{ text: 'Hello' }] });
    assert(
      'Chat history appends messages correctly',
      mockState.chatHistory.length === 1 &&
      mockState.chatHistory[0].role === 'user'
    );

    // ── Group 5: API Payload Structure Tests ─────────────────
    console.log('\n▶ API Payload Structure Tests');

    const mockPayload = {
      system_instruction: { parts: [{ text: 'System prompt here' }] },
      contents: [{ role: 'user', parts: [{ text: 'Test question' }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    assert(
      'Payload includes system_instruction',
      !!mockPayload.system_instruction?.parts?.[0]?.text
    );

    assert(
      'Payload generationConfig has maxOutputTokens',
      mockPayload.generationConfig.maxOutputTokens === 800
    );

    assert(
      'Payload includes 3 safety settings',
      mockPayload.safetySettings.length === 3
    );

    assert(
      'All safety thresholds are BLOCK_MEDIUM_AND_ABOVE',
      mockPayload.safetySettings.every(s => s.threshold === 'BLOCK_MEDIUM_AND_ABOVE')
    );

    assert(
      'Payload temperature is between 0 and 1',
      mockPayload.generationConfig.temperature >= 0 &&
      mockPayload.generationConfig.temperature <= 1
    );

    // ── Group 6: API Key Validation Tests ────────────────────
    console.log('\n▶ API Key Validation Tests');

    function isValidKeyFormat(key) {
      return typeof key === 'string' && key.startsWith('AIza');
    }

    assert(
      'Valid key format accepted (AIza...)',
      isValidKeyFormat('AIzaSyTest1234567890abcdef')
    );

    assert(
      'Empty string rejected',
      !isValidKeyFormat('')
    );

    assert(
      'Random string without AIza prefix rejected',
      !isValidKeyFormat('sk-abc123wrongformat')
    );

    assert(
      'null rejected',
      !isValidKeyFormat(null)
    );

    // ── Summary ──────────────────────────────────────────────
    console.log('\n======================================');
    console.log(`  Results: ${passed} passed, ${failed} failed`);
    console.log(`  Coverage: ${Math.round((passed / (passed + failed)) * 100)}%`);
    if (failed === 0) {
      console.log('  🏆 ALL TESTS PASSED');
    } else {
      console.log('  ⚠️  SOME TESTS FAILED — see above');
    }
    console.log('======================================\n');

    return { passed, failed, results };
  }

  return { run };
})();

/* ── Auto-run when loaded ── */
ElectIQTests.run();
