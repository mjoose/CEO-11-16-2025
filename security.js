// Security and Input Validation Utilities
// Prevents XSS, injection attacks, and validates user input
// Enhanced security against common web vulnerabilities

// HTML Entity Encoding to prevent XSS (enhanced)
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#96;',
    '=': '&#61;'
  };
  return text.replace(/[&<>"'/`=]/g, function(m) { return map[m]; });
}

// Enhanced XSS prevention - escape for use in HTML attributes
function escapeHtmlAttribute(text) {
  if (typeof text !== 'string') return '';
  return escapeHtml(text).replace(/\n/g, '&#10;').replace(/\r/g, '&#13;').replace(/\t/g, '&#9;');
}

// Escape for use in JavaScript context
function escapeJs(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\x00/g, '\\0');
}

// Enhanced sanitize input - remove potentially dangerous characters and XSS vectors
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // Remove null bytes, control characters, and HTML tags
  let sanitized = input
    .replace(/\0/g, '')
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/data:text\/html/gi, '') // Remove data URIs
    .replace(/data:image\/svg\+xml/gi, '') // Remove SVG data URIs that could contain scripts
    .replace(/expression\s*\(/gi, '') // Remove CSS expressions (IE)
    .replace(/@import/gi, '') // Remove CSS imports
    .replace(/<meta/gi, '') // Remove meta tags
    .replace(/<base/gi, ''); // Remove base tags
  
  // Additional XSS prevention patterns
  sanitized = sanitized
    .replace(/&#x[0-9a-f]+;/gi, '') // Remove hex entities
    .replace(/&#[0-9]+;/g, '') // Remove decimal entities
    .replace(/&[a-z]+;/gi, function(match) {
      // Only allow safe HTML entities
      const safeEntities = ['amp', 'lt', 'gt', 'quot', 'apos', 'nbsp'];
      const entity = match.replace(/[&;]/g, '').toLowerCase();
      return safeEntities.includes(entity) ? match : '';
    });
  
  return sanitized;
}

// Validate email format
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate phone number (flexible format)
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  // Allow various phone formats: (555) 123-4567, 555-123-4567, 5551234567, +1 555 123 4567
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
}

// Validate name (letters, spaces, hyphens, apostrophes only)
function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  const nameRegex = /^[a-zA-Z\s\-'\.]{2,100}$/;
  return nameRegex.test(name.trim());
}

// Validate and sanitize message/content
function validateMessage(message) {
  if (!message || typeof message !== 'string') return false;
  const sanitized = sanitizeInput(message.trim());
  return sanitized.length >= 10 && sanitized.length <= 5000;
}

// Rate limiting check (using localStorage - client-side only)
function checkRateLimit(action, maxAttempts = 5, windowMinutes = 15) {
  const key = `rateLimit_${action}`;
  const now = Date.now();
  const window = windowMinutes * 60 * 1000;
  
  let attempts = JSON.parse(localStorage.getItem(key) || '{"count": 0, "reset": ' + now + '}');
  
  // Reset if window expired
  if (now > attempts.reset) {
    attempts = { count: 0, reset: now + window };
  }
  
  // Check if limit exceeded
  if (attempts.count >= maxAttempts) {
    return {
      allowed: false,
      resetTime: attempts.reset,
      message: 'Too many requests. Please try again later.'
    };
  }
  
  // Increment counter
  attempts.count++;
  localStorage.setItem(key, JSON.stringify(attempts));
  
  return { allowed: true };
}

// Validate form data comprehensively
function validateFormData(formData) {
  const errors = [];
  const sanitized = {};
  
  // Name validation
  if (!formData.name || !validateName(formData.name)) {
    errors.push('Please enter a valid name (2-100 characters, letters and spaces only)');
  } else {
    sanitized.name = sanitizeInput(formData.name.trim());
  }
  
  // Email validation
  if (!formData.email || !validateEmail(formData.email)) {
    errors.push('Please enter a valid email address');
  } else {
    sanitized.email = sanitizeInput(formData.email.trim().toLowerCase());
  }
  
  // Phone validation (optional)
  if (formData.phone && formData.phone.trim() !== '') {
    if (!validatePhone(formData.phone)) {
      errors.push('Please enter a valid phone number');
    } else {
      sanitized.phone = sanitizeInput(formData.phone.trim());
    }
  } else {
    sanitized.phone = '';
  }
  
  // Service selection validation - Updated for general contractor services
  const allowedServices = [
    'residential-construction',
    'home-remodeling',
    'commercial-construction',
    'additions-extensions',
    'roofing-siding',
    'deck-patio',
    'kitchen-renovation',
    'bathroom-renovation',
    'other',
    ''
  ];
  if (formData.service && !allowedServices.includes(formData.service)) {
    errors.push('Invalid service selection');
  } else {
    sanitized.service = formData.service || '';
  }
  
  // Message validation
  if (!formData.message || !validateMessage(formData.message)) {
    errors.push('Message must be between 10 and 5000 characters');
  } else {
    sanitized.message = sanitizeInput(formData.message.trim());
  }
  
  return {
    valid: errors.length === 0,
    errors: errors,
    sanitized: sanitized
  };
}

// Prevent XSS in cookie preferences (validate cookie preference values)
function validateCookiePreferences(prefs) {
  const validKeys = ['required', 'analytics', 'marketing', 'functional', 'timestamp'];
  const sanitized = {};
  
  for (const key of validKeys) {
    if (key === 'timestamp') {
      sanitized[key] = new Date().toISOString();
    } else if (key === 'required') {
      sanitized[key] = true; // Always true
    } else {
      sanitized[key] = prefs[key] === true || prefs[key] === 'true';
    }
  }
  
  return sanitized;
}

// Honeypot field detection (for bot prevention)
function checkHoneypot(honeypotValue) {
  // If a honeypot field is filled, likely a bot
  return !honeypotValue || honeypotValue.trim() === '';
}

// Additional security: Validate URL to prevent open redirects
function validateUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const urlObj = new URL(url);
    // Only allow http, https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) return false;
    // Prevent javascript: and data: protocols
    if (urlObj.protocol === 'javascript:' || urlObj.protocol === 'data:') return false;
    return true;
  } catch (e) {
    return false;
  }
}

// Sanitize URL to prevent XSS and open redirects
function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '';
  // Remove dangerous protocols
  const sanitized = url
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
  
  // Only allow relative URLs or http/https
  if (sanitized.startsWith('http://') || sanitized.startsWith('https://') || sanitized.startsWith('/') || sanitized.startsWith('./')) {
    return sanitized;
  }
  return '';
}

// Content Security: Prevent DOM-based XSS
function safeSetInnerHTML(element, content) {
  if (!element || element.textContent === undefined) return false;
  // Use textContent instead of innerHTML to prevent XSS
  element.textContent = content;
  return true;
}

// Validate and sanitize JSON to prevent JSON injection
function safeJsonParse(jsonString) {
  if (!jsonString || typeof jsonString !== 'string') return null;
  try {
    // Remove potential JSON injection patterns
    const sanitized = jsonString
      .replace(/<script/gi, '')
      .replace(/javascript:/gi, '');
    return JSON.parse(sanitized);
  } catch (e) {
    return null;
  }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    escapeHtml,
    escapeHtmlAttribute,
    escapeJs,
    sanitizeInput,
    validateEmail,
    validatePhone,
    validateName,
    validateMessage,
    validateFormData,
    validateCookiePreferences,
    checkRateLimit,
    checkHoneypot,
    validateUrl,
    sanitizeUrl,
    safeSetInnerHTML,
    safeJsonParse
  };
}

