/**
 * =========================================================================
 * 🤖 VIVIAN AI — MULTI-MODEL SYSTEM ARCHITECT & MENTOR CONTROLLER
 * Features: 5 Switchable AI Models (Gemini 3.8 Flash, Claude Sonnet 4.5,
 *           Opus 5.5, GPT-6 Astra, Vivian Core 4.0),
 *           Warm & Polite Human Interactions, Concept Breakdowns & Comparisons
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const triggerBtn = document.getElementById('vivianTriggerBtn');
  const topbarBtn = document.getElementById('vivianTopbarBtn');
  const closeBtn = document.getElementById('vivianCloseDrawerBtn');
  const clearBtn = document.getElementById('vivianClearChatBtn');
  const overlay = document.getElementById('vivianDrawerOverlay');
  const drawer = document.getElementById('vivianDrawer');
  const messagesContainer = document.getElementById('vivianMessagesContainer');
  const inputForm = document.getElementById('vivianInputForm');
  const userInput = document.getElementById('vivianUserInput');
  const sendBtn = document.getElementById('vivianSendBtn');

  // Model Selector Elements
  const modelSelectBtn = document.getElementById('vivianModelSelectBtn');
  const modelDropdown = document.getElementById('vivianModelDropdown');
  const activeIcon = document.getElementById('vmsActiveIcon');
  const activeName = document.getElementById('vmsActiveName');
  const activeBadge = document.getElementById('vmsActiveBadge');
  const activeHeaderBadge = document.getElementById('vivianActiveModelBadge');
  const activeHeaderIcon = document.getElementById('vivianActiveHeaderIcon');
  const footerModelMeta = document.getElementById('vivianFooterModelMeta');

  if (!overlay || !drawer) return;

  // 1. MODEL CATALOG SPECIFICATION
  const VIVIAN_MODELS = {
    'gemini-3.8-flash': {
      id: 'gemini-3.8-flash',
      name: 'Gemini 3.8 Flash',
      icon: '⚡',
      badge: 'Sub-15ms',
      badgeClass: 'badge-fast',
      signature: 'Gemini 3.8 Flash',
      headerBadge: '⚡ Gemini 3.8 Flash',
      footerMeta: '⚡ Gemini 3.8 Flash • Sub-15ms Active',
      roleLabel: 'Ultra-Fast Edge Inference & Rapid Overviews'
    },
    'claude-sonnet-4.5': {
      id: 'claude-sonnet-4.5',
      name: 'Claude Sonnet 4.5',
      icon: '🎭',
      badge: 'Architect',
      badgeClass: 'badge-arch',
      signature: 'Claude Sonnet 4.5',
      headerBadge: '🎭 Claude Sonnet 4.5',
      footerMeta: '🎭 Claude Sonnet 4.5 • Enterprise Architect Active',
      roleLabel: 'Enterprise System Design & Spring Boot Specialist'
    },
    'opus-5.5': {
      id: 'opus-5.5',
      name: 'Opus 5.5',
      icon: '🏛️',
      badge: 'Deep Cognitive',
      badgeClass: 'badge-deep',
      signature: 'Opus 5.5',
      headerBadge: '🏛️ Opus 5.5',
      footerMeta: '🏛️ Opus 5.5 • Deep Cognitive Engine Active',
      roleLabel: 'Exhaustive Theoretical Proofs & LeetCode 445+ DSA'
    },
    'gpt-6-astra': {
      id: 'gpt-6-astra',
      name: 'GPT-6 Astra',
      icon: '🚀',
      badge: 'Multi-Agent',
      badgeClass: 'badge-astra',
      signature: 'GPT-6 Astra',
      headerBadge: '🚀 GPT-6 Astra',
      footerMeta: '🚀 GPT-6 Astra • Next-Gen Multi-Agent Active',
      roleLabel: 'Autonomous Multi-Agent Synthesizer & AI Pipelines'
    },
    'vivian-core-4.0': {
      id: 'vivian-core-4.0',
      name: 'Vivian Core 4.0',
      icon: '✨',
      badge: 'Ahmad Neural',
      badgeClass: 'badge-core',
      signature: 'Vivian Core 4.0',
      headerBadge: '✨ Vivian Core 4.0',
      footerMeta: '✨ Vivian Core 4.0 • Ahmad Domain Core Active',
      roleLabel: 'Ahmad Shuaib Domain Intelligence & Empathic Mentor'
    }
  };

  let currentModel = 'gemini-3.8-flash';

  // 2. MODEL SWITCHER INTERACTION
  function setupModelSwitcher() {
    if (!modelSelectBtn || !modelDropdown) return;

    modelSelectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = modelDropdown.classList.contains('show');
      if (isOpen) {
        closeModelDropdown();
      } else {
        openModelDropdown();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!modelSelectBtn.contains(e.target) && !modelDropdown.contains(e.target)) {
        closeModelDropdown();
      }
    });

    // Options click
    const options = modelDropdown.querySelectorAll('.vms-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const modelKey = opt.getAttribute('data-model');
        if (modelKey && VIVIAN_MODELS[modelKey]) {
          switchModel(modelKey);
          closeModelDropdown();
        }
      });
    });
  }

  function openModelDropdown() {
    modelDropdown.classList.add('show');
    modelSelectBtn.setAttribute('aria-expanded', 'true');
  }

  function closeModelDropdown() {
    modelDropdown.classList.remove('show');
    modelSelectBtn.setAttribute('aria-expanded', 'false');
  }

  function switchModel(modelKey) {
    if (currentModel === modelKey) return;
    currentModel = modelKey;
    const model = VIVIAN_MODELS[modelKey];

    // Update active button presentation
    if (activeIcon) activeIcon.textContent = model.icon;
    if (activeName) activeName.textContent = model.name;
    if (activeBadge) {
      activeBadge.textContent = model.badge;
      activeBadge.className = `vms-badge ${model.badgeClass}`;
    }

    // Update header badge
    if (activeHeaderBadge) activeHeaderBadge.textContent = model.headerBadge;
    if (activeHeaderIcon) activeHeaderIcon.textContent = model.icon;
    if (footerModelMeta) footerModelMeta.textContent = model.footerMeta;

    // Update options selected state
    const options = modelDropdown.querySelectorAll('.vms-option');
    options.forEach(opt => {
      const isSelected = opt.getAttribute('data-model') === modelKey;
      opt.classList.toggle('active', isSelected);
      opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    // Announce in conversation stream
    appendModelSwitchNotification(model);

    // Speak with the model's authentic voice
    if (window.VivianEngine && typeof window.VivianEngine.getModelSwitchAnnouncement === 'function') {
      const announcement = window.VivianEngine.getModelSwitchAnnouncement(modelKey);
      setTimeout(() => {
        appendMessage('ai', announcement);
      }, 200);
    }
  }

  function appendModelSwitchNotification(model) {
    const pill = document.createElement('div');
    pill.className = 'vivian-model-switch-pill';
    pill.innerHTML = `<span>${model.icon}</span> <span>Engine switched to <strong>${model.name}</strong> • ${model.roleLabel}</span>`;
    messagesContainer.appendChild(pill);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  setupModelSwitcher();

  // 3. OPEN / CLOSE DRAWER CONTROLLER
  function openVivianDrawer() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => userInput?.focus(), 350);
  }

  function closeVivianDrawer() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    closeModelDropdown();
  }

  triggerBtn?.addEventListener('click', openVivianDrawer);
  topbarBtn?.addEventListener('click', openVivianDrawer);
  closeBtn?.addEventListener('click', closeVivianDrawer);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeVivianDrawer();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeVivianDrawer();
    }
  });

  // 4. THE 4 MANDATORY CONNECTION OPTIONS TRACKER
  function attachConnectionListeners() {
    const connectCards = document.querySelectorAll('.vivian-connect-card');
    connectCards.forEach(card => {
      card.addEventListener('click', () => {
        const channel = card.getAttribute('data-channel');
        const feedbackMessages = {
          'LinkedIn': '💼 **Connecting with Ahmad on LinkedIn!** Direct channel for backend engineering, high-throughput microservices, and AI developer roles.',
          'GitHub': '🐙 **Opening Ahmad\'s GitHub (@drxzx7)!** Explore repositories including *LeetCode Patterns Platform*, *Argos*, and open-source contributions.',
          'LeetCode': '⚡ **Exploring Ahmad\'s LeetCode Profile (x_drxzx_x)!** 445+ problems solved with consistent 200-day storm streak.',
          'Gmail': '✉️ **Opening Ahmad\'s Direct Personal Gmail (mssdkkl@gmail.com)!** High-priority communication inbox.'
        };

        const feedback = feedbackMessages[channel] || `Opening connection to ${channel}...`;
        setTimeout(() => {
          appendMessage('ai', feedback);
        }, 400);
      });
    });

    // Suggestion prompt chips
    const chips = document.querySelectorAll('.vivian-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const promptText = chip.getAttribute('data-prompt');
        if (promptText && userInput) {
          userInput.value = promptText;
          submitUserPrompt(promptText);
        }
      });
    });
  }

  attachConnectionListeners();

  // 5. AUTO-RESIZING TEXTAREA
  if (userInput) {
    userInput.addEventListener('input', () => {
      userInput.style.height = 'auto';
      userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
    });

    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        inputForm.dispatchEvent(new Event('submit'));
      }
    });
  }

  // 6. CHAT HISTORY CLEAR HANDLER
  clearBtn?.addEventListener('click', () => {
    if (confirm('Reset Vivian AI conversation thread?')) {
      resetChatGreeting();
      if (typeof showToast === 'function') {
        showToast('Vivian AI chat thread reset.', 'info');
      }
    }
  });

  function resetChatGreeting() {
    const model = VIVIAN_MODELS[currentModel];
    messagesContainer.innerHTML = `
      <div class="vivian-msg vivian-msg-ai">
        <div class="vivian-msg-avatar">${model.icon}</div>
        <div class="vivian-msg-content">
          <div class="vivian-msg-bubble">
            <p><strong>Hello! I'm Vivian AI</strong>, Ahmad Shuaib's specialized AI System Architect & Executive Intelligence Assistant, equipped with <strong>5 Switchable Neural Models</strong> (${Object.values(VIVIAN_MODELS).map(m => m.name).join(', ')}).</p>
            <p style="margin-top: 8px;">I can guide you through <strong>Java Full Stack Development</strong>, <strong>Distributed Microservices</strong>, <strong>1M+ System Design</strong>, and <strong>DSA Algorithms</strong>. If any concept is ever unclear, just ask — I will provide clear <strong>Definitions</strong>, <strong>Comparison Matrices</strong>, <strong>Production Code</strong>, and <strong>Actionable Summaries</strong>!</p>
            
            <div class="vivian-connect-prompt">
              ⚡ <strong>Mandatory Connection Channels</strong> — Before entering a prompt, explore or connect directly with Ahmad:
            </div>

            <div class="vivian-connect-grid">
              <a href="https://www.linkedin.com/in/ahmad-shuaib-75543037a" target="_blank" rel="noopener noreferrer" class="vivian-connect-card card-linkedin" data-channel="LinkedIn">
                <div class="vc-icon">💼</div>
                <div class="vc-content">
                  <div class="vc-title">Connect with LinkedIn</div>
                  <div class="vc-handle">ahmad-shuaib-75543037a • Direct Message</div>
                </div>
                <div class="vc-arrow">➜</div>
              </a>

              <a href="https://github.com/drxzx7" target="_blank" rel="noopener noreferrer" class="vivian-connect-card card-github" data-channel="GitHub">
                <div class="vc-icon">🐙</div>
                <div class="vc-content">
                  <div class="vc-title">Connect with GitHub</div>
                  <div class="vc-handle">@drxzx7 • 16 Repositories & Open Source</div>
                </div>
                <div class="vc-arrow">➜</div>
              </a>

              <a href="https://leetcode.com/u/x_drxzx_x/" target="_blank" rel="noopener noreferrer" class="vivian-connect-card card-leetcode" data-channel="LeetCode">
                <div class="vc-icon">⚡</div>
                <div class="vc-content">
                  <div class="vc-title">Connect with LeetCode</div>
                  <div class="vc-handle">x_drxzx_x • 445+ Solved (Global Rank #273,952)</div>
                </div>
                <div class="vc-arrow">➜</div>
              </a>

              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mssdkkl@gmail.com&su=Inquiry+via+Vivian+AI+-+Ahmad+Shuaib" target="_blank" rel="noopener noreferrer" class="vivian-connect-card card-gmail" data-channel="Gmail">
                <div class="vc-icon">✉️</div>
                <div class="vc-content">
                  <div class="vc-title">Connect with Gmail</div>
                  <div class="vc-handle">mssdkkl@gmail.com (Direct Personal Inbox)</div>
                </div>
                <div class="vc-arrow">➜</div>
              </a>
            </div>

            <div class="vivian-suggestions-header">Explore, Learn & Compare with Vivian:</div>
            <div class="vivian-prompt-chips">
              <button class="vivian-chip" data-prompt="Hello! I'd love to learn about Ahmad's skills and how you can guide me.">👋 Say Hello & Overview</button>
              <button class="vivian-chip" data-prompt="I can't understand Spring Boot & Netflix Eureka. Can you explain with a definition, analogy, comparison table & summary?">🎓 Teach Spring Boot & Eureka</button>
              <button class="vivian-chip" data-prompt="Compare HikariCP vs Tomcat Connection Pool with definition, comparison matrix & production code.">💡 HikariCP vs Tomcat Pool</button>
              <button class="vivian-chip" data-prompt="Explain Ahmad's 1,000,000+ daily visitors System Design blueprint with architecture and summary.">⚡ 1M+ System Design</button>
              <button class="vivian-chip" data-prompt="Tell me all about Ahmad's AI projects: Argos, JARVIS, Eternity AI, and 50 Hackathon Demos.">🤖 Ahmad's AI Projects</button>
              <button class="vivian-chip" data-prompt="Explain Sliding Window and Monotonic Stack patterns (LeetCode 445+) with definitions and code.">⚔️ LeetCode 445+ Patterns</button>
            </div>
          </div>
          <span class="vivian-msg-time">Just now • ${model.signature} Active</span>
        </div>
      </div>
    `;
    attachConnectionListeners();
  }

  // 7. MESSAGE APPEND & ADVANCED MARKDOWN RENDERING
  function appendMessage(sender, text) {
    const model = VIVIAN_MODELS[currentModel];
    const msgWrapper = document.createElement('div');
    msgWrapper.className = `vivian-msg vivian-msg-${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'vivian-msg-avatar';
    avatar.textContent = sender === 'ai' ? model.icon : '👤';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'vivian-msg-content';

    const bubble = document.createElement('div');
    bubble.className = 'vivian-msg-bubble';

    if (sender === 'ai') {
      bubble.innerHTML = renderMarkdown(text);
    } else {
      bubble.textContent = text;
    }

    const timeSpan = document.createElement('span');
    timeSpan.className = 'vivian-msg-time';
    const now = new Date();
    timeSpan.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + (sender === 'ai' ? ` • ${model.signature}` : '');

    contentDiv.appendChild(bubble);
    contentDiv.appendChild(timeSpan);

    msgWrapper.appendChild(avatar);
    msgWrapper.appendChild(contentDiv);

    messagesContainer.appendChild(msgWrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // 8. TYPING INDICATOR BUBBLE
  function showTypingIndicator() {
    const model = VIVIAN_MODELS[currentModel];
    const typingWrapper = document.createElement('div');
    typingWrapper.className = 'vivian-msg vivian-msg-ai vivian-typing-indicator';
    typingWrapper.id = 'vivianTypingBubble';

    typingWrapper.innerHTML = `
      <div class="vivian-msg-avatar">${model.icon}</div>
      <div class="vivian-msg-content">
        <div class="vivian-msg-bubble" style="padding: 10px 16px;">
          <div class="vivian-typing-bubble">
            <span class="vivian-typing-dot"></span>
            <span class="vivian-typing-dot"></span>
            <span class="vivian-typing-dot"></span>
          </div>
        </div>
      </div>
    `;

    messagesContainer.appendChild(typingWrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById('vivianTypingBubble');
    if (indicator) indicator.remove();
  }

  // 9. HIGH-FIDELITY SAFE MARKDOWN PARSER (Tables, Code Blocks, Highlights)
  function renderMarkdown(md) {
    if (!md) return '';

    // Strip dangerous tags
    let text = md.replace(/<script\b[^>]*>(.*?)<\/script>/gi, '');

    // 1. Process Markdown Tables (| Header | Header |)
    const tableRegex = /((?:\|[^\n]+\|\r?\n)+)/g;
    text = text.replace(tableRegex, (match) => {
      const lines = match.trim().split(/\r?\n/).filter(line => line.includes('|'));
      if (lines.length < 2) return match;

      // Check if second line is a delimiter (e.g. |---|---|)
      const isDelimiter = lines[1].replace(/[\s|:-]/g, '').length === 0;
      if (!isDelimiter) return match;

      const parseCells = (line) => line.split('|').slice(1, -1).map(c => c.trim());
      const headers = parseCells(lines[0]);
      const rows = lines.slice(2).map(parseCells);

      let tableHtml = '<div class="vivian-table-container"><table class="vivian-table"><thead><tr>';
      headers.forEach(h => {
        tableHtml += `<th>${formatInline(h)}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';

      rows.forEach(r => {
        tableHtml += '<tr>';
        r.forEach(cell => {
          tableHtml += `<td>${formatInline(cell)}</td>`;
        });
        tableHtml += '</tr>';
      });

      tableHtml += '</tbody></table></div>';
      return tableHtml;
    });

    // 2. Fenced Code Blocks (```java ... ```)
    text = text.replace(/```([a-z]*)\r?\n([\s\S]*?)```/gi, (m, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<pre style="background: #04050a; padding: 12px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); font-family: 'Fira Code', monospace; font-size: 0.8rem; overflow-x: auto; margin: 10px 0; color: #a29bfe; line-height: 1.55;"><code>${escaped}</code></pre>`;
    });

    // 3. Headers
    text = text
      .replace(/^#### (.*$)/gim, '<h5 style="font-family: \'Outfit\', sans-serif; font-size: 0.95rem; font-weight: 700; color: #fff; margin: 10px 0 4px;">$1</h5>')
      .replace(/^### (.*$)/gim, '<h4 style="font-family: \'Outfit\', sans-serif; font-size: 1.05rem; font-weight: 700; color: #fff; margin: 12px 0 6px;">$1</h4>')
      .replace(/^## (.*$)/gim, '<h3 style="font-family: \'Outfit\', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--accent-rose); margin: 14px 0 8px;">$1</h3>')
      .replace(/^# (.*$)/gim, '<h2 style="font-family: \'Outfit\', sans-serif; font-size: 1.25rem; font-weight: 800; color: #fff; margin: 16px 0 10px;">$1</h2>');

    // 4. Inline elements
    text = formatInline(text);

    // 5. Bullet lists
    text = text.replace(/^\s*-\s+(.*$)/gim, '<div style="margin-left: 14px; margin-bottom: 5px;">• $1</div>');
    text = text.replace(/^\s*\*\s+(.*$)/gim, '<div style="margin-left: 14px; margin-bottom: 5px;">• $1</div>');

    // 6. Line breaks
    text = text.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');

    return text;
  }

  function formatInline(str) {
    return str
      // Inline code
      .replace(/`([^`]+)`/g, '<code style="background: rgba(234,0,94,0.15); color: #ff7675; padding: 2px 6px; border-radius: 4px; font-family: \'Fira Code\', monospace; font-size: 0.82rem;">$1</code>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff;">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Markdown links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--accent-rose); text-decoration: underline;">$1</a>');
  }

  // 10. FORM SUBMIT & MULTI-MODEL API TRANSMISSION
  async function submitUserPrompt(promptText) {
    if (!promptText || promptText.trim() === '') return;

    appendMessage('user', promptText);
    if (userInput) {
      userInput.value = '';
      userInput.style.height = 'auto';
    }

    if (sendBtn) sendBtn.disabled = true;
    showTypingIndicator();

    // 1. If running under file:// or offline, resolve instantly via local VivianEngine
    const isFileScheme = window.location.protocol === 'file:' || window.location.origin === 'null';
    if (isFileScheme && window.VivianEngine) {
      setTimeout(() => {
        hideTypingIndicator();
        if (sendBtn) sendBtn.disabled = false;
        const res = window.VivianEngine.generateVivianMultiModelResponse(promptText, currentModel);
        appendMessage('ai', res.response);
      }, 300);
      return;
    }

    // 2. Online HTTP / Server environment with robust fallbacks
    let responseData = null;
    const endpointsToTry = [
      'api/vivian.php',
      'api/vivian',
      'http://localhost:3000/api/vivian'
    ];

    for (const ep of endpointsToTry) {
      try {
        const resp = await fetch(ep, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            prompt: promptText,
            model: currentModel
          })
        });
        if (resp.ok) {
          responseData = await resp.json();
          break;
        } else if (resp.status === 429) {
          responseData = {
            response: '⚠️ **[Rate Limit Protection]** Too many requests in a short interval. Please pause for a brief moment before querying Vivian AI again.'
          };
          break;
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    hideTypingIndicator();
    if (sendBtn) sendBtn.disabled = false;

    // 3. Fallback to VivianEngine if network fails (NEVER output generic 3-bullet block!)
    if (!responseData || !responseData.response) {
      if (window.VivianEngine) {
        responseData = window.VivianEngine.generateVivianMultiModelResponse(promptText, currentModel);
      }
    }

    if (responseData && responseData.response) {
      appendMessage('ai', responseData.response);
    } else {
      appendMessage('ai', `### 🤖 Vivian AI System Assistant\n\nThank you for asking: **"${promptText.slice(0, 75)}"**\n\nI can guide you through Java Full Stack Development, Spring Boot & Eureka, LeetCode (445+ solved), and Ahmad's AI projects!\n\nFeel free to connect directly with Ahmad via **mssdkkl@gmail.com** or **LinkedIn**.`);
    }
  }

  inputForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = userInput?.value.trim();
    if (query) {
      submitUserPrompt(query);
    }
  });
});
