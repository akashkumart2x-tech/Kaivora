document.addEventListener("DOMContentLoaded", () => {
  
  /* --- 1. INITIALIZE LUCIDE ICONS --- */
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  /* --- 2. STICKY HEADER SCROLL EFFECT --- */
  const header = document.getElementById("mainHeader");
  const navLinks = document.querySelectorAll(".header-nav a");

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add("header-active");
    } else {
      header.classList.remove("header-active");
    }

    // Scroll Spy: highlight active menu links based on section positions
    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  /* --- 3. MOBILE MENU COLLAPSIBILITY --- */
  const mobileToggle = document.getElementById("mobileNavToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.style.display === "flex";
      mobileMenu.style.display = isOpen ? "none" : "flex";
      mobileToggle.innerHTML = isOpen 
        ? `<i data-lucide="menu"></i>` 
        : `<i data-lucide="x"></i>`;
      lucide.createIcons();
    });

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
        mobileToggle.innerHTML = `<i data-lucide="menu"></i>`;
        lucide.createIcons();
      });
    });
  }

  /* --- 4. REAL-TIME SYNCHRONIZED SCANNING PROGRESS BAR --- */
  const scanFill = document.querySelector(".scan-bar-fill");
  const scanText = document.getElementById("liveScanPercentage");
  
  if (scanFill && scanText) {
    scanFill.style.animation = "none"; 
    
    let startTime = null;
    const duration = 5500; // 5.5 seconds cycling frequency
    
    function updateScanAnimation(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate cubic-bezier(0.4, 0, 0.2, 1) timing
      let t = (elapsed % duration) / duration;
      const cycle = Math.floor(elapsed / duration) % 2;
      
      if (cycle === 1) t = 1 - t;
      
      // Custom easeInOutCubic implementation
      const easeT = t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      const percentageValue = Math.floor(18 + (92 - 18) * easeT);
      
      scanFill.style.width = percentageValue + "%";
      scanText.textContent = percentageValue + "%";
      
      requestAnimationFrame(updateScanAnimation);
    }
    requestAnimationFrame(updateScanAnimation);
  }

  /* --- 5. EFFICIENCY SCORE CONIC GAUGE TRANSITIONS --- */
  const cvssRing = document.getElementById("cvssRing");
  const cvssVal = document.querySelector(".cvss-val");
  const cvssLbl = document.querySelector(".cvss-lbl");
  
  if (cvssRing && cvssVal) {
    let score = 9.4;

    setInterval(() => {
      // Small simulated shifts to represent live-updating data
      const delta = (Math.random() * 0.2 - 0.1);
      score = parseFloat((score + delta).toFixed(1));
      
      // Constrain between 9.0 and 9.8
      if (score > 9.8) {
        score = 9.8;
      } else if (score < 9.0) {
        score = 9.0;
      }
      
      cvssVal.textContent = score.toFixed(1);
      
      if (score >= 9.5) {
        cvssLbl.textContent = "OPTIMIZED";
        cvssLbl.style.color = "var(--color-emerald)";
      } else if (score >= 9.2) {
        cvssLbl.textContent = "EXCELLENT";
        cvssLbl.style.color = "var(--color-cyan)";
      } else {
        cvssLbl.textContent = "STABLE";
        cvssLbl.style.color = "var(--color-amber)";
      }
      
      // Convert CVSS 0-10 score to angle percentage (e.g. 9.4 -> 94%)
      const scorePercentage = Math.floor(score * 10);
      
      // Apply conic gradient transition
      cvssRing.style.background = `conic-gradient(var(--color-emerald) ${scorePercentage}%, rgba(255, 255, 255, 0.08) ${scorePercentage}%)`;
    }, 3500);
  }

  /* --- 6. INCREMENTING TASKS RESOLVED COUNTER --- */
  const tasksCountEl = document.getElementById("tasksSolvedCount");
  if (tasksCountEl) {
    let baseCount = 18294;
    setInterval(() => {
      // Increment solved tasks randomly between 1 and 3 every 2.2 seconds
      const increment = Math.floor(Math.random() * 3) + 1;
      baseCount += increment;
      tasksCountEl.textContent = baseCount.toLocaleString();
    }, 2200);
  }

  /* --- 7. ROLLING AI EMPLOYEE LIVE STREAM --- */
  const threatStack = document.getElementById("threatFeedStack");
  
  const mockAlerts = [
    { name: "Customer Inquiry Resolved", target: "CHAT_AGENT: ticket #42902", severity: "emerald", status: "Solved" },
    { name: "Inbound Voice Call Answered", target: "VOICE_AGENT: (555) 012-3849", severity: "cyan", status: "Call End" },
    { name: "Calendar Sync Completed", target: "BOOKING_AGENT: Stark Demo Set", severity: "amber", status: "Synced" },
    { name: "Contact Updated in HubSpot", target: "CRM_AGENT: lead #88291", severity: "emerald", status: "Synced" },
    { name: "Qualifying Questions Asked", target: "CHAT_AGENT: lead inbound", severity: "cyan", status: "Active" },
    { name: "Complex Query Escaled", target: "HUMAN_AGENT: ticket #42890", severity: "red", status: "Handoff" },
    { name: "Meeting Scheduled on GCal", target: "BOOKING_AGENT: tyrell Discovery", severity: "amber", status: "Booked" },
    { name: "Task Dispatched to Zapier", target: "WORKFLOW_AGENT: slack sync", severity: "cyan", status: "Success" }
  ];

  setInterval(() => {
    if (!threatStack) return;

    // Pick a random mock alert
    const alert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
    
    // Create new threat item
    const newItem = document.createElement("div");
    newItem.className = `threat-item threat-${alert.severity}`;
    newItem.style.opacity = "0";
    newItem.style.transform = "translateY(-10px)";
    newItem.style.transition = "all 400ms ease";
    
    // Map severity to proper color variables
    let pillBgColor = "";
    let pillTextColor = "";
    let pulseColor = "";
    if (alert.severity === "emerald") {
      newItem.style.background = "rgba(37, 99, 235, 0.07)";
      newItem.style.borderColor = "rgba(37, 99, 235, 0.15)";
      pillBgColor = "rgba(37, 99, 235, 0.15)";
      pillTextColor = "var(--color-emerald)";
      pulseColor = "var(--color-emerald)";
    } else if (alert.severity === "cyan") {
      newItem.style.background = "rgba(59, 130, 246, 0.07)";
      newItem.style.borderColor = "rgba(59, 130, 246, 0.15)";
      pillBgColor = "rgba(59, 130, 246, 0.15)";
      pillTextColor = "var(--color-cyan)";
      pulseColor = "var(--color-cyan)";
    } else if (alert.severity === "amber") {
      newItem.style.background = "rgba(29, 78, 216, 0.07)";
      newItem.style.borderColor = "rgba(29, 78, 216, 0.15)";
      pillBgColor = "rgba(29, 78, 216, 0.15)";
      pillTextColor = "var(--color-amber)";
      pulseColor = "var(--color-amber)";
    } else if (alert.severity === "red") {
      newItem.style.background = "rgba(248, 113, 113, 0.07)";
      newItem.style.borderColor = "rgba(248, 113, 113, 0.15)";
      pillBgColor = "rgba(248, 113, 113, 0.15)";
      pillTextColor = "var(--color-red)";
      pulseColor = "var(--color-red)";
    }

    newItem.innerHTML = `
      <div class="threat-item-left">
        <span class="pulse-indicator ${alert.severity}" style="background-color: ${pulseColor}; box-shadow: 0 0 8px ${pulseColor};"></span>
        <div class="threat-meta">
          <span class="threat-name">${alert.name}</span>
          <span class="threat-target">${alert.target}</span>
        </div>
      </div>
      <div class="threat-right">
        <span class="threat-time">0s AGO</span>
        <span class="status-pill ${alert.severity}" style="background: ${pillBgColor}; color: ${pillTextColor}; border-color: ${pillBgColor};">${alert.status}</span>
      </div>
    `;

    // Prepend to threat feed stack
    threatStack.insertBefore(newItem, threatStack.firstChild);
    
    // Trigger transition
    setTimeout(() => {
      newItem.style.opacity = "1";
      newItem.style.transform = "translateY(0)";
    }, 50);

    // Update times of older items
    const items = threatStack.querySelectorAll(".threat-item");
    items.forEach((item, index) => {
      if (index > 0) {
        const timeSpan = item.querySelector(".threat-time");
        if (timeSpan) {
          const sec = parseInt(timeSpan.textContent);
          if (!isNaN(sec)) {
            timeSpan.textContent = (sec + 3) + "s AGO";
          } else {
            timeSpan.textContent = "3s AGO";
          }
        }
      }
      
      // Limit to 4 maximum items on display to maintain container bounding constraints
      if (index >= 4) {
        item.style.opacity = "0";
        item.style.transform = "translateY(10px)";
        setTimeout(() => item.remove(), 400);
      }
    });

  }, 3200);

  /* --- 8. FAQ ACCORDION TOGGLING --- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    
    if (trigger) {
      trigger.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        
        // Collapse all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const content = otherItem.querySelector(".faq-content");
            if (content) content.style.maxHeight = "0";
          }
        });

        // Toggle selected item
        if (isActive) {
          item.classList.remove("active");
          const content = item.querySelector(".faq-content");
          if (content) content.style.maxHeight = "0";
        } else {
          item.classList.add("active");
          const content = item.querySelector(".faq-content");
          if (content) {
            content.style.maxHeight = content.scrollHeight + 32 + "px";
          }
        }
      });
    }
  });

  /* --- 9. INTERACTIVE AI SALES ASSISTANT (AVA) FULL DUPLEX DEMO --- */
  const startCallBtn = document.getElementById("startCallBtn");
  const micBtn = document.getElementById("micBtn");
  const voiceOrb = document.getElementById("voiceOrb");
  const callStatus = document.getElementById("callStatus");
  const callTelemetry = document.getElementById("callTelemetry");
  const transcriptFeed = document.getElementById("transcriptFeed");
  const promptChipsContainer = document.getElementById("promptChipsContainer");
  const promptChips = document.querySelectorAll(".prompt-chip");
  const orbRingOuter = document.getElementById("orbRingOuter");
  const orbRingInner = document.getElementById("orbRingInner");

  let callActive = false;
  let avaSpeaking = false;
  let speechRate = 0.98; // High-energy, confident sales speed
  let speechPitch = 1.15; // Friendly, sweet pitch
  
  let recognition = null;
  let isRecognizing = false;
  let recognitionDesiredState = false;
  let micMuted = false;
  let silenceTimer = null;
  let speechStarted = false;
  let lastInterimTranscript = "";
  let currentAvaUtteranceText = "";
  let avaSpeakStartTime = 0;
  const feedbackIgnoreDuration = 800; // 800ms cooldown to ignore self-feedback from speakers

  const responses = {
    pricing: "Oh, I'd be absolutely thrilled to walk you through our pricing! We offer a Starter Agent package at just 199 dollars per month, and our highly popular Growth Pack is 499. Both represent an incredible return on investment compared to hiring manual staff—saving you thousands in overhead! I can get your cluster set up on a trial immediately—what do you think?",
    book: "Wonderful! Scheduling a quick discovery call with our engineering team is the absolute best next step. It's completely free, and we will map out a customized automation plan for your business. I've unlocked our calendar slot coordinates right below—or simply tell me your email and I will secure your reservation right away!",
    services: "We build state-of-the-art, custom AI Employees tailored exactly to fit your workflow! This includes energetic sales assistants like myself, 24/7 customer support chat agents, automatic lead qualifiers, and smart workflows that sync your data instantly across HubSpot and Salesforce.",
    voice: "You are listening to me live using Kaivora's advanced conversational speech engine! I am tuned to sound incredibly friendly, clear, confident, and sweet. We can custom-tune my voice specifically to match your brand's unique sales style and persona!"
  };

  // Pre-load speech voices for smooth low-latency loading
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      window.speechSynthesis.getVoices();
    });
  }

  // Secure Origin Check
  function isSecureConnection() {
    return window.location.protocol === "https:" || 
           window.location.hostname === "localhost" || 
           window.location.hostname === "127.0.0.1";
  }

  // 1. Web Audio API Ring Tone Beep Generator
  function playSimulatedRing(callback) {
    if (!(window.AudioContext || window.webkitAudioContext)) {
      if (callback) callback();
      return;
    }

    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      let time = audioCtx.currentTime;

      function triggerBeep(start) {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc1.frequency.value = 440; 
        osc2.frequency.value = 480; 

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0, time + start);
        gainNode.gain.linearRampToValueAtTime(0.06, time + start + 0.05);
        gainNode.gain.setValueAtTime(0.06, time + start + 0.7);
        gainNode.gain.linearRampToValueAtTime(0, time + start + 0.75);

        osc1.start(time + start);
        osc2.start(time + start);
        osc1.stop(time + start + 0.8);
        osc2.stop(time + start + 0.8);
      }

      triggerBeep(0);
      triggerBeep(0.9);

      setTimeout(() => {
        audioCtx.close();
        if (callback) callback();
      }, 2000);

    } catch (e) {
      console.warn("AudioContext ring failed", e);
      if (callback) callback();
    }
  }

  // 2. Telemetry dialogue bubbles
  function addTranscriptBubble(speaker, text) {
    const isAva = speaker === "Ava";
    const bubble = document.createElement("div");
    bubble.style.padding = "0.5rem 0.85rem";
    bubble.style.borderRadius = "12px";
    bubble.style.maxWidth = "80%";
    bubble.style.alignSelf = isAva ? "flex-start" : "flex-end";
    bubble.style.background = isAva ? "rgba(255,255,255,0.04)" : "rgba(34, 211, 238, 0.08)";
    bubble.style.border = isAva ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(34, 211, 238, 0.15)";
    bubble.style.color = isAva ? "var(--color-text-secondary)" : "var(--color-cyan)";
    bubble.style.fontSize = "12px";
    bubble.style.lineHeight = "1.4";
    
    bubble.innerHTML = `<strong>${speaker}:</strong> ${text}`;
    
    if (transcriptFeed.querySelector("em") || transcriptFeed.textContent.includes("No active conversation")) {
      transcriptFeed.innerHTML = "";
    }

    transcriptFeed.appendChild(bubble);
    
    const box = document.getElementById("transcriptBox");
    box.scrollTop = box.scrollHeight;
  }

  // 3. Dynamic Visual States for Neural Orb
  function setOrbState(state) {
    voiceOrb.className = "orb-core";
    if (state === "speaking") {
      voiceOrb.classList.add("orb-speaking");
      orbRingOuter.style.transform = "scale(1.2)";
      orbRingInner.style.transform = "scale(1.1)";
      orbRingOuter.style.borderColor = "rgba(52, 211, 153, 0.3)";
      orbRingInner.style.borderColor = "rgba(34, 211, 238, 0.4)";
    } else if (state === "listening") {
      voiceOrb.classList.add("orb-listening");
      orbRingOuter.style.transform = "scale(1.05)";
      orbRingInner.style.transform = "scale(0.95)";
      orbRingOuter.style.borderColor = "rgba(34, 211, 238, 0.35)";
      orbRingInner.style.borderColor = "rgba(52, 211, 153, 0.25)";
    } else if (state === "thinking") {
      voiceOrb.classList.add("orb-thinking");
      orbRingOuter.style.transform = "scale(1.15)";
      orbRingInner.style.transform = "scale(1.05)";
      orbRingOuter.style.borderColor = "rgba(251, 191, 36, 0.4)";
      orbRingInner.style.borderColor = "rgba(34, 211, 238, 0.3)";
    } else {
      orbRingOuter.style.transform = "scale(1)";
      orbRingInner.style.transform = "scale(1)";
      orbRingOuter.style.borderColor = "rgba(52, 211, 153, 0.1)";
      orbRingInner.style.borderColor = "rgba(34, 211, 238, 0.15)";
    }
  }

  // 4. Ava Speech synthesis generator (persuasive, high energy, sweet)
  function speakAva(text, onComplete) {
    if (!callActive) return;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      avaSpeaking = true;
      currentAvaUtteranceText = text;
      avaSpeakStartTime = Date.now(); // Mark voice start timestamp to prevent self-interruption
      setOrbState("speaking");
      callStatus.textContent = "Ava is speaking...";
      callStatus.style.color = "var(--color-emerald)";

      // Ensure speech recognition is active to capture user barge-in!
      if (!micMuted) {
        ensureRecognitionState(true);
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const sweetVoiceNames = ["samantha", "zira", "google us english", "google uk english female", "hazel", "susan", "female"];
      let bestVoice = null;
      
      for (const name of sweetVoiceNames) {
        bestVoice = voices.find(v => v.name.toLowerCase().includes(name) && v.lang.includes("en"));
        if (bestVoice) break;
      }
      
      if (!bestVoice) {
        bestVoice = voices.find(v => v.lang.includes("en-US") || v.lang.includes("en-GB"));
      }
      if (bestVoice) utterance.voice = bestVoice;
      
      utterance.rate = speechRate; 
      utterance.pitch = speechPitch; 

      utterance.onend = () => {
        if (!avaSpeaking) return; // Speech was already cancelled by barge-in
        avaSpeaking = false;
        if (callActive) {
          transitionToListening();
          if (onComplete) onComplete();
        }
      };

      utterance.onerror = (err) => {
        console.warn("Speech error", err);
        avaSpeaking = false;
        if (callActive) {
          transitionToListening();
        }
      };

      addTranscriptBubble("Ava", text);
      window.speechSynthesis.speak(utterance);
    } else {
      // Offline fallback
      addTranscriptBubble("Ava", text);
      transitionToListening();
      if (onComplete) onComplete();
    }
  }

  // Helper to transition state cleanly to listening
  function transitionToListening() {
    setOrbState("listening");
    callStatus.textContent = "Ava is Listening...";
    callStatus.style.color = "var(--color-cyan)";
    callTelemetry.textContent = micMuted ? "Microphone is muted" : "Speak naturally into your mic...";
    lastInterimTranscript = "";
    speechStarted = false;
    
    // Ensure speech recognition is running cleanly and fresh
    if (callActive && !micMuted) {
      ensureRecognitionState(true);
    }
  }

  // Safe Speech Recognition State Machine to prevent InvalidStateError
  function ensureRecognitionState(shouldRun) {
    recognitionDesiredState = shouldRun;
    if (!recognition) return;

    if (shouldRun) {
      if (!isRecognizing) {
        try {
          recognition.start();
        } catch (e) {
          console.warn("Failed to start recognition:", e);
        }
      }
    } else {
      if (isRecognizing) {
        try {
          recognition.stop();
        } catch (e) {
          console.warn("Failed to stop recognition:", e);
        }
      }
    }
  }

  // Echo cancellation semantic filter: checks if mic transcript matches Ava's spoken words
  function isSelfFeedback(transcript, avaText) {
    if (!avaText) return false;
    
    const cleanTranscript = transcript.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
    const cleanAva = avaText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
    
    if (!cleanTranscript) return true;
    if (cleanTranscript.length <= 2) return true; // ignore tiny fragments

    // Substring match
    if (cleanAva.includes(cleanTranscript)) {
      return true;
    }

    // Word proportion match
    const transWords = cleanTranscript.split(" ");
    const avaWords = cleanAva.split(" ");
    
    let matchCount = 0;
    for (const word of transWords) {
      if (avaWords.includes(word)) {
        matchCount++;
      }
    }
    
    const matchRatio = matchCount / transWords.length;
    if (matchRatio >= 0.6) {
      return true;
    }
    
    return false;
  }

  // 5. Intelligent Continuous Speech Recognition Engine with VAD
  function initSpeechRecognition() {
    if (recognition) return; // Build only once

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn("Speech recognition not supported in this browser environment.");
      return;
    }

    recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      isRecognizing = true;
      if (callActive && !micMuted) {
        if (avaSpeaking) {
          callStatus.textContent = "Ava is speaking...";
          callStatus.style.color = "var(--color-emerald)";
          callTelemetry.textContent = "Barge-in active. Speak to interrupt...";
        } else {
          setOrbState("listening");
          callStatus.textContent = "Ava is Listening...";
          callStatus.style.color = "var(--color-cyan)";
          callTelemetry.textContent = "Speak naturally into your mic...";
        }
      }
    };

    recognition.onerror = (e) => {
      console.warn("VAD recognition error:", e.error);
      if (e.error === "not-allowed") {
        showToast("Microphone permission denied. Reverting to prompts.", "error");
        micMuted = true;
        micBtn.style.display = "none";
        callTelemetry.textContent = "Mic disabled. Click conversation prompt chips.";
        setOrbState("idle");
        ensureRecognitionState(false);
      } else if (e.error === "network") {
        console.warn("Speech recognition network error.");
      }
    };

    recognition.onend = () => {
      isRecognizing = false;
      // Restart continuous feed if call active and desired
      if (callActive && !micMuted && recognitionDesiredState) {
        setTimeout(() => {
          if (callActive && !micMuted && recognitionDesiredState && !isRecognizing) {
            try {
              recognition.start();
            } catch (err) {
              console.warn("Error restarting recognition in onend:", err);
            }
          }
        }, 100);
      }
    };

    recognition.onresult = (event) => {
      if (!callActive || micMuted) return;

      // Construct active voice segment
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      transcript = transcript.trim();

      if (!transcript) return;

      // --- BARGE-IN INTERRUPT MECHANISM ---
      if (avaSpeaking) {
        // Prevent accidental trigger from echo cooldown
        if (Date.now() - avaSpeakStartTime < feedbackIgnoreDuration) {
          return;
        }

        // Apply semantic echo cancellation
        if (isSelfFeedback(transcript, currentAvaUtteranceText)) {
          return;
        }

        // Real user voice input detected! Barge-in and stop synthesis immediately
        window.speechSynthesis.cancel();
        avaSpeaking = false;
        clearTimeout(silenceTimer);
        
        addTranscriptBubble("System", "Ava was interrupted.");
        setOrbState("listening");
        callStatus.textContent = "You interrupted Ava...";
        callStatus.style.color = "var(--color-cyan)";
      }

      // Voice Activity Detection onset
      if (!speechStarted) {
        speechStarted = true;
        setOrbState("listening");
        callStatus.textContent = "You are speaking...";
      }

      callTelemetry.textContent = `VAD Output: "${transcript}"`;
      lastInterimTranscript = transcript;

      // Reset turn-taking silence detector (1.2s VAD threshold)
      clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        processUserTurn(lastInterimTranscript);
      }, 1200);
    };
  }

  // 6. Process the finished turn, analyze intent, and respond
  function processUserTurn(text) {
    if (!text.trim()) {
      transitionToListening();
      return;
    }

    speechStarted = false;
    clearTimeout(silenceTimer);

    // Stop recognition to clear old event.results buffers
    ensureRecognitionState(false);

    // Transition to thinking state
    setOrbState("thinking");
    callStatus.textContent = "Ava is thinking...";
    callStatus.style.color = "var(--color-amber)";
    callTelemetry.textContent = "Processing semantic intents...";

    // Print text dialogue
    addTranscriptBubble("You", text);

    const query = text.toLowerCase();
    let reply = "";

    setTimeout(() => {
      if (query.includes("price") || query.includes("cost") || query.includes("how much")) {
        reply = responses.pricing;
      } else if (query.includes("book") || query.includes("schedule") || query.includes("call") || query.includes("meeting")) {
        reply = responses.book;
      } else if (query.includes("service") || query.includes("workflow") || query.includes("do you do") || query.includes("automate")) {
        reply = responses.services;
      } else if (query.includes("voice") || query.includes("sound") || query.includes("quality") || query.includes("real")) {
        reply = responses.voice;
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
        reply = "Hello there! It is absolutely fantastic to hear from you today. How is your business doing, and what operational pipelines can we automate for you?";
      } else {
        reply = "That sounds fascinating! We can build a custom, high-fidelity AI Employee specifically configured to automate that exact process. Would you like me to book a technical consultation for your team to outline the ROI?";
      }

      speakAva(reply);
    }, 800);
  }

  // 7. Full-Duplex Call Controller
  function toggleFullDuplexCall() {
    if (callActive) {
      // HANG UP
      callActive = false;
      clearTimeout(silenceTimer);
      
      ensureRecognitionState(false);
      
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      avaSpeaking = false;

      setOrbState("idle");
      callStatus.textContent = "Ava is Offline";
      callStatus.style.color = "var(--color-text-muted)";
      callTelemetry.textContent = "Call terminated";
      startCallBtn.innerHTML = `<i data-lucide="phone"></i><span>Start Demo Call</span>`;
      micBtn.style.display = "none";
      promptChipsContainer.style.display = "none";
      addTranscriptBubble("System", "Call ended. Thank you for testing Ava!");
      lucide.createIcons();
      return;
    }

    // INITIALIZE & REQUEST MIC ACCESS
    if (!isSecureConnection()) {
      showToast("Warning: Speech Recognition requires HTTPS secure origin in production.", "info");
    }

    callActive = true; // Block parallel click triggers
    callStatus.textContent = "Initializing Secure Line...";
    callStatus.style.color = "var(--color-amber)";
    callTelemetry.textContent = "Requesting microphone permissions...";

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        // Permissions Granted! Stop stream immediately so SpeechRecognition can bind natively
        stream.getTracks().forEach(track => track.stop());

        if (!callActive) return; // User hung up during permission window

        callStatus.textContent = "Ava is Connecting...";
        callTelemetry.textContent = "Ringing Ava's Desk...";
        startCallBtn.innerHTML = `<i data-lucide="phone-off"></i><span>End Demo Call</span>`;
        lucide.createIcons();

        playSimulatedRing(() => {
          if (!callActive) return; // User hung up during ringing

          micMuted = false;

          // Configure mic controls
          micBtn.style.display = "inline-flex";
          micBtn.style.backgroundColor = "transparent";
          micBtn.style.borderColor = "var(--glass-border-heavy)";
          micBtn.style.color = "var(--color-text-primary)";
          micBtn.innerHTML = `<i data-lucide="mic"></i><span>Mute Mic</span>`;
          promptChipsContainer.style.display = "flex";

          initSpeechRecognition();
          ensureRecognitionState(true);
          lucide.createIcons();

          const greeting = "Hello there! I'm Ava, your dedicated Kaivora sales specialist, and it is absolutely wonderful to connect with you! We build highly advanced, custom AI Employees designed to take over your repetitive administrative and support workflows—saving you hundreds of hours and driving massive compound growth. What specific bottlenecks can we help automate for you today?";
          speakAva(greeting);
        });

      })
      .catch((err) => {
        console.warn("Microphone access failed", err);
        showToast("Microphone access denied or unavailable. Please enable permissions in settings.", "error");
        callActive = false;
        setOrbState("idle");
        callStatus.textContent = "Ava is Offline";
        callStatus.style.color = "var(--color-red)";
        callTelemetry.textContent = "Mic access blocked. Enable permissions in settings.";
        startCallBtn.innerHTML = `<i data-lucide="phone"></i><span>Start Demo Call</span>`;
        micBtn.style.display = "none";
        promptChipsContainer.style.display = "none";
        lucide.createIcons();
      });
  }

  if (startCallBtn) {
    startCallBtn.addEventListener("click", toggleFullDuplexCall);
  }

  // 8. Microphone Mute / Unmute Controller
  if (micBtn) {
    micBtn.addEventListener("click", () => {
      if (!callActive) return;

      micMuted = !micMuted;

      if (micMuted) {
        ensureRecognitionState(false);
        micBtn.style.backgroundColor = "rgba(248, 113, 113, 0.1)";
        micBtn.style.borderColor = "var(--color-red)";
        micBtn.style.color = "var(--color-red)";
        micBtn.innerHTML = `<i data-lucide="mic-off"></i><span>Unmute Mic</span>`;
        callTelemetry.textContent = "Microphone is muted. Use prompts below.";
      } else {
        micBtn.style.backgroundColor = "transparent";
        micBtn.style.borderColor = "var(--glass-border-heavy)";
        micBtn.style.color = "var(--color-text-primary)";
        micBtn.innerHTML = `<i data-lucide="mic"></i><span>Mute Mic</span>`;
        callTelemetry.textContent = "Listening continuously...";
        ensureRecognitionState(true);
      }
      lucide.createIcons();
    });
  }

  // 9. Prompt Chips Click Trigger (with integrated barge-in interruption)
  promptChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      if (!callActive) return;

      const userText = chip.textContent.replace(/[💬📞⚙️🤖"]/g, "").trim();

      if (avaSpeaking) {
        window.speechSynthesis.cancel();
        avaSpeaking = false;
        addTranscriptBubble("System", "Ava was interrupted.");
      }

      clearTimeout(silenceTimer);
      processUserTurn(userText);
    });
  });

  /* --- 10. LOGIN/SIGNUP MODAL & SESSION MANAGEMENT --- */
  const loginModal = document.getElementById("loginModal");
  const tabSignIn = document.getElementById("tabSignIn");
  const tabSignUp = document.getElementById("tabSignUp");
  const signUpNameGroup = document.getElementById("signUpNameGroup");
  const authForm = document.getElementById("authForm");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const authName = document.getElementById("authName");
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const authCheckLabel = document.getElementById("authCheckLabel");
  const toastContainer = document.getElementById("toastContainer");

  let isRegisterTab = false;

  // Header element selectors
  const headerActions = document.querySelector(".header-actions");
  const headerActionsMobile = document.querySelector(".mobile-menu div");

  // Load existing session on load
  function checkSession() {
    const userJson = localStorage.getItem("kaivoraUser");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        renderLoggedInHeader(user.name);
      } catch (e) {
        localStorage.removeItem("kaivoraUser");
      }
    }
  }

  // Toast helper
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    
    // Choose Lucide icon
    let icon = "check-circle";
    let color = "var(--color-emerald)";
    if (type === "info") {
      icon = "info";
      color = "var(--color-cyan)";
    } else if (type === "error") {
      icon = "alert-circle";
      color = "var(--color-red)";
    }

    toast.innerHTML = `
      <i data-lucide="${icon}" style="color: ${color}; width: 18px; height: 18px; display: flex;"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    lucide.createIcons();

    // Remove toast after 3.5s
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-10px)";
      toast.style.transition = "all 300ms ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Open Modal
  function openAuthModal() {
    loginModal.style.display = "flex";
    setTimeout(() => {
      loginModal.classList.add("open");
    }, 10);
  }

  // Close Modal
  function closeAuthModal() {
    loginModal.classList.remove("open");
    setTimeout(() => {
      loginModal.style.display = "none";
    }, 300);
  }

  // Switch to Sign In Tab
  function switchToSignIn() {
    isRegisterTab = false;
    tabSignIn.classList.add("active");
    tabSignIn.style.color = "var(--color-text-primary)";
    tabSignIn.style.borderBottomColor = "var(--color-cyan)";
    
    tabSignUp.classList.remove("active");
    tabSignUp.style.color = "var(--color-text-muted)";
    tabSignUp.style.borderBottomColor = "transparent";
    
    signUpNameGroup.style.display = "none";
    authName.removeAttribute("required");
    authCheckLabel.textContent = "Remember me on this device";
    authSubmitBtn.querySelector("span").textContent = "Sign In to Account";
  }

  // Switch to Register Tab
  function switchToSignUp() {
    isRegisterTab = true;
    tabSignUp.classList.add("active");
    tabSignUp.style.color = "var(--color-text-primary)";
    tabSignUp.style.borderBottomColor = "var(--color-cyan)";
    
    tabSignIn.classList.remove("active");
    tabSignIn.style.color = "var(--color-text-muted)";
    tabSignIn.style.borderBottomColor = "transparent";
    
    signUpNameGroup.style.display = "flex";
    authName.setAttribute("required", "true");
    authCheckLabel.textContent = "I accept the Kaivora Terms of Service";
    authSubmitBtn.querySelector("span").textContent = "Create AI Employee Account";
  }

  // Modal event listeners
  if (closeLoginBtn) {
    closeLoginBtn.addEventListener("click", closeAuthModal);
  }
  if (tabSignIn) {
    tabSignIn.addEventListener("click", switchToSignIn);
  }
  if (tabSignUp) {
    tabSignUp.addEventListener("click", switchToSignUp);
  }

  // Background overlay click to close
  if (loginModal) {
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        closeAuthModal();
      }
    });
  }

  // Intercept all pricing / demo buttons
  document.querySelectorAll(".btn-primary, .btn-secondary, .pricing-card button, .hero-cta button, .footer-col a").forEach((btn) => {
    // Exclude header buttons, demo ring buttons, and auth form submit button
    if (btn.id === "startCallBtn" || btn.id === "micBtn" || btn.id === "authSubmitBtn" || btn.closest(".header-actions") || btn.closest(".mobile-menu") || btn.closest("#authForm")) {
      return;
    }

    btn.addEventListener("click", (e) => {
      const userJson = localStorage.getItem("kaivoraUser");
      if (!userJson) {
        e.preventDefault();
        showToast("Authorization required. Opening secure dashboard login...", "info");
        openAuthModal();
      } else {
        // If logged in, simulate deployment success!
        const planName = btn.closest(".pricing-card") ? btn.closest(".pricing-card").querySelector("h3").textContent : "Custom";
        showToast(`Deploying ${planName} AI Employee cluster...`, "info");
        setTimeout(() => {
          showToast(`Successfully deployed ${planName} Agent! Initializing cognitive modules...`, "success");
          const analyticsEl = document.getElementById("analytics") || document.getElementById("workflow");
          if (analyticsEl) {
            analyticsEl.scrollIntoView({ behavior: "smooth" });
          }
        }, 1500);
      }
    });
  });

  // Attach login button in header
  const headerLoginBtn = document.querySelector(".header-actions .btn-secondary");
  if (headerLoginBtn) {
    headerLoginBtn.addEventListener("click", openAuthModal);
  }
  const mobileLoginBtn = document.querySelector(".mobile-menu .btn-secondary");
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener("click", openAuthModal);
  }

  // Dynamic Header UI rendering for logged in user
  function renderLoggedInHeader(userName) {
    const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
    
    const userUIHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-size: 13px; color: var(--color-text-secondary); font-weight: 500;">Hello, <strong style="color: var(--color-cyan);">${userName}</strong></span>
        <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--color-cyan) 0%, var(--color-emerald) 100%); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--bg-foundation); box-shadow: 0 0 15px rgba(34, 211, 238, 0.25); border: 2px solid rgba(255,255,255,0.2);">
          ${initials}
        </div>
        <button class="btn btn-secondary" id="logoutBtn" style="padding: 0.4rem 1rem; font-size: 12px; font-weight: 700; border-color: rgba(248, 113, 113, 0.2); color: var(--color-red); border-radius: 9999px;">Logout</button>
      </div>
    `;

    // Render for desktop header
    headerActions.innerHTML = userUIHTML;
    
    // Render for mobile header
    headerActionsMobile.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%;">
        <span style="font-size: 15px; color: var(--color-text-secondary);">Hello, <strong style="color: var(--color-cyan);">${userName}</strong></span>
        <button class="btn btn-secondary" id="logoutMobileBtn" style="width: 100%; border-color: rgba(248, 113, 113, 0.2); color: var(--color-red);">Logout</button>
      </div>
    `;

    // Attach logout listeners
    const attachLogout = () => {
      localStorage.removeItem("kaivoraUser");
      showToast("Logged out successfully.", "info");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    document.getElementById("logoutBtn").addEventListener("click", attachLogout);
    const logoutMobile = document.getElementById("logoutMobileBtn");
    if (logoutMobile) {
      logoutMobile.addEventListener("click", attachLogout);
    }
  }

  // Handle Sign In & Signup Submissions
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = authEmail.value;
    const name = isRegisterTab ? authName.value : "Alex Morgan"; 

    // Start loading state
    authSubmitBtn.disabled = true;
    authSubmitBtn.style.opacity = "0.7";
    authSubmitBtn.querySelector("span").textContent = "Connecting to Secure Cluster...";

    setTimeout(() => {
      // Create user session
      const userData = { name, email };
      localStorage.setItem("kaivoraUser", JSON.stringify(userData));

      // Reset loading state
      authSubmitBtn.disabled = false;
      authSubmitBtn.style.opacity = "1";
      switchToSignIn(); // default tab reset
      authForm.reset();

      // Show Success Toast
      showToast(isRegisterTab ? "Account created successfully! Welcome." : `Welcome back, ${name}! Securely logged in.`, "success");
      
      // Update header
      renderLoggedInHeader(name);

      // Close modal
      closeAuthModal();

    }, 1500);
  });

  // Run initial session check
  checkSession();

  /* --- 11. CHATBOT WINDOW TOGGLING --- */
  const chatbotTrigger = document.getElementById("chatbotTrigger");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const closeChatbotBtn = document.getElementById("closeChatbotBtn");
  const chatbotTriggerIcon = document.getElementById("chatbotTriggerIcon");

  let chatbotOpen = false;

  function toggleChatbot() {
    chatbotOpen = !chatbotOpen;
    if (chatbotOpen) {
      chatbotWindow.style.display = "flex";
      // Animate slide up
      setTimeout(() => {
        chatbotWindow.style.opacity = "1";
        chatbotWindow.style.transform = "translateY(0)";
      }, 10);
      chatbotTriggerIcon.setAttribute("data-lucide", "chevron-down");
      chatbotTrigger.style.background = "linear-gradient(135deg, var(--color-red) 0%, #b91c1c 100%)";
      chatbotTrigger.style.boxShadow = "0 0 25px rgba(248, 113, 113, 0.4)";
    } else {
      chatbotWindow.style.opacity = "0";
      chatbotWindow.style.transform = "translateY(20px)";
      setTimeout(() => {
        chatbotWindow.style.display = "none";
      }, 300);
      chatbotTriggerIcon.setAttribute("data-lucide", "message-square");
      chatbotTrigger.style.background = "linear-gradient(135deg, var(--color-cyan) 0%, var(--color-emerald) 100%)";
      chatbotTrigger.style.boxShadow = "0 0 25px rgba(34, 211, 238, 0.4)";
    }
    lucide.createIcons();
  }

  if (chatbotTrigger) {
    chatbotTrigger.addEventListener("click", toggleChatbot);
  }
  if (closeChatbotBtn) {
    closeChatbotBtn.addEventListener("click", toggleChatbot);
  }

  /* --- 12. CONTACT FORM SUBMISSION HOOK --- */
  const contactForm = document.getElementById("contactForm");
  const contactSubmitBtn = document.getElementById("contactSubmitBtn");

  if (contactForm && contactSubmitBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.style.opacity = "0.7";
      const originalHTML = contactSubmitBtn.innerHTML;
      contactSubmitBtn.innerHTML = `<span>Securing transmission channel...</span>`;

      setTimeout(() => {
        showToast("Collaboration request sent successfully! Our AI team will get in touch with you shortly.", "success");
        contactForm.reset();
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.style.opacity = "1";
        contactSubmitBtn.innerHTML = originalHTML;
      }, 1500);
    });
  }

  /* --- 13. INTERACTIVE ROI CALCULATOR MATHEMATICS --- */
  const agentsSlider = document.getElementById("agentsSlider");
  const agentsValDisplay = document.getElementById("agentsValDisplay");
  const salarySlider = document.getElementById("salarySlider");
  const salaryValDisplay = document.getElementById("salaryValDisplay");
  const humanCostDisplay = document.getElementById("humanCostDisplay");
  const savingsDisplay = document.getElementById("savingsDisplay");

  function calculateROI() {
    if (!agentsSlider || !salarySlider) return;

    const agents = parseInt(agentsSlider.value);
    const salary = parseInt(salarySlider.value);
    
    const humanCost = agents * salary;
    const kaivoraCost = 499;
    const savings = Math.max(0, humanCost - kaivoraCost);

    if (agentsValDisplay) agentsValDisplay.textContent = agents;
    if (salaryValDisplay) salaryValDisplay.textContent = "$" + salary.toLocaleString();
    if (humanCostDisplay) humanCostDisplay.textContent = "$" + humanCost.toLocaleString() + " / mo";
    
    if (savingsDisplay) {
      savingsDisplay.textContent = "$" + savings.toLocaleString();
    }
  }

  if (agentsSlider && salarySlider) {
    agentsSlider.addEventListener("input", calculateROI);
    salarySlider.addEventListener("input", calculateROI);
    // Initial calculation trigger
    calculateROI();
  }

  /* --- 14. EXIT-INTENT LEAD MAGNET MODAL FLOW --- */
  const exitIntentModal = document.getElementById("exitIntentModal");
  const closeExitBtn = document.getElementById("closeExitBtn");
  const exitForm = document.getElementById("exitForm");
  const exitSubmitBtn = document.getElementById("exitSubmitBtn");

  function openExitModal() {
    if (!exitIntentModal) return;
    exitIntentModal.style.display = "flex";
    setTimeout(() => {
      exitIntentModal.classList.add("open");
    }, 10);
  }

  function closeExitModal() {
    if (!exitIntentModal) return;
    exitIntentModal.classList.remove("open");
    setTimeout(() => {
      exitIntentModal.style.display = "none";
    }, 300);
  }

  // Mouse leave exit detector
  document.addEventListener("mouseleave", (e) => {
    // Check if exit intent has already triggered in this session
    const triggered = sessionStorage.getItem("exitPopupTriggered");
    if (triggered) return;

    // Trigger popup only when mouse exits top of window
    if (e.clientY < 20) {
      sessionStorage.setItem("exitPopupTriggered", "true");
      openExitModal();
      showToast("Wait! We have an exclusive AI Operational Audit for your business.", "info");
    }
  });

  if (closeExitBtn) {
    closeExitBtn.addEventListener("click", closeExitModal);
  }

  if (exitIntentModal) {
    exitIntentModal.addEventListener("click", (e) => {
      if (e.target === exitIntentModal) {
        closeExitModal();
      }
    });
  }

  // Handle lead magnet form submission
  if (exitForm && exitSubmitBtn) {
    exitForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("exitName").value;
      const email = document.getElementById("exitEmail").value;

      // Loading state
      exitSubmitBtn.disabled = true;
      exitSubmitBtn.style.opacity = "0.7";
      const originalHTML = exitSubmitBtn.innerHTML;
      exitSubmitBtn.innerHTML = `<span>Analyzing operations pipelines...</span>`;

      setTimeout(() => {
        showToast(`Success! Your custom 3-page AI automation blueprint will be delivered to ${email} within 15 minutes.`, "success");
        
        exitForm.reset();
        exitSubmitBtn.disabled = false;
        exitSubmitBtn.style.opacity = "1";
        exitSubmitBtn.innerHTML = originalHTML;
        
        closeExitModal();
      }, 1500);
    });
  }

});

