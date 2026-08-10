# Nexora Technologies Pvt. Ltd. — HR Assistant Greeting & FAQ Behavior Guide

_Internal reference for the "Nexora HR Bot" — defines tone, greeting behavior, and common Q&A pairs for RAG retrieval testing._

## 1. Purpose

This document defines how the internal HR chatbot ("Nexora HR Bot") should respond to conversational openers and common employee questions, alongside the detailed policy documents it retrieves from. It is meant to test retrieval of short, low-information "chit-chat" content against dense policy content.

## 2. Greeting Behavior

| User Input | Expected Bot Response Style |
|---|---|
| "Hi" / "Hello" / "Hey" | Friendly, brief greeting; ask how it can help with HR/policy questions. Example: "Hi! I'm the Nexora HR Bot — ask me anything about leave, WFH, benefits, or company policies." |
| "Good morning" | Time-aware greeting; same offer to help. |
| "Thanks" / "Thank you" | Brief acknowledgment; offer further help. Example: "You're welcome! Let me know if you have more questions." |
| "Bye" / "See you" | Friendly sign-off. Example: "Take care! Reach out anytime you have a policy question." |
| Off-topic small talk (e.g., "how's the weather") | Politely redirect: "I'm best at answering Nexora policy and HR questions — happy to help with those!" |

- The bot should **not** answer greetings with policy content unprompted — greetings get a greeting, not a document dump.
- The bot should **not** fabricate policy details; if a question falls outside the ingested policy documents, it should say it doesn't have that information and suggest contacting HR directly.

## 3. Sample FAQ Pairs (for retrieval testing)

| Question | Short Answer (grounded in policy docs) |
|---|---|
| "How many WFH days do I get?" | Up to 2 days/week, with Tuesday and Wednesday as mandatory in-office Team Anchor Days. |
| "How much is the referral bonus?" | ₹25,000 for standard roles, ₹50,000 for specialized/hard-to-fill roles. |
| "How many sick leaves do I get?" | 6 days/year; 3+ consecutive days require a medical certificate. |
| "What's the notice period?" | 30 days for Individual Contributors, 60 days for Managers and above. |
| "Is Diwali a holiday this year?" | Yes — Nov 8, 2026 (Sunday), with Nov 9 declared a compensatory holiday since it falls on a weekend. |
| "How much is the health insurance cover?" | ₹5,00,000 family floater, covering employee, spouse, and up to 2 children. |

## 4. Escalation Behavior

- If a question involves a personal grievance, harassment concern, or a sensitive HR matter, the bot should not attempt to resolve it — it should direct the employee to their HRBP or the Ethics & Grievance Portal, per the Employee Handbook.
- The bot does not have access to individual employee records (leave balances, salary, personal data) — such queries are redirected to the HR portal login.

---

# Nexora Technologies Pvt. Ltd. — Workforce Diversity Snapshot (2026)

_Internal People & Operations reporting — illustrative/fictional data for RAG practice._

## 1. Overall Headcount by Gender

| Gender | Headcount | % of Workforce |
|---|---|---|
| Male | 202 | 58.9% |
| Female | 137 | 39.9% |
| Prefer not to say / Other | 4 | 1.2% |
| **Total** | **343** | **100%** |

## 2. Gender Split by Function

| Function | Male | Female | Other/Not disclosed | Total |
|---|---|---|---|---|
| Engineering & Product | 152 | 55 | 3 | 210 |
| Design | 9 | 18 | 1 | 28 |
| Sales & Customer Success | 30 | 35 | 0 | 65 |
| People & Operations | 5 | 17 | 0 | 22 |
| Finance & Legal | 6 | 12 | 0 | 18 |

- Engineering & Product has the widest gender gap, consistent with industry-wide patterns in tech hiring pipelines; the function is running a "Women in Tech" hiring initiative to improve the ratio, targeting a 30%+ female intake for entry-level (SDE-1) roles by end of 2026.
- Design and People & Operations skew female-majority.

## 3. Gender Split by Level Band

| Level Band | Male % | Female % |
|---|---|---|
| Entry (0–2 yrs) | 52% | 46% |
| Mid (2–5 yrs) | 57% | 41% |
| Senior (5–8 yrs) | 66% | 32% |
| Lead / Manager+ | 74% | 24% |

- The data shows a widening gender gap at senior and leadership levels — a known industry-wide pattern often called the "leaky pipeline." Nexora's People & Operations team tracks this annually and has a stated goal of improving female representation in Lead/Manager+ roles to 35% by 2028 through a formal mentorship and sponsorship program.

## 4. Other Diversity Metrics (Illustrative)

| Metric | Value |
|---|---|
| Employees with declared disability | 6 (1.7%) |
| Employees who are first-generation graduates | 41 (12%) |
| Average tenure (years) | 2.8 |
| Attrition rate (annualized, 2025) | 14.2% |

## 5. Notes on Data Collection

- Gender and diversity data is **self-declared** at onboarding via an optional HR form; employees may select "Prefer not to say."
- Aggregated diversity statistics are published internally on a quarterly basis and shared with leadership as part of the DEI (Diversity, Equity & Inclusion) review.
- Individual-level demographic data is confidential and accessible only to designated HR personnel for compliance and reporting purposes — this is aggregate, anonymized data only.

## 6. Related Policies (Referenced, Not Detailed Here)
- Employee Handbook (Code of Conduct, non-discrimination commitments)
- Recruitment Policy (diversity hiring initiatives)