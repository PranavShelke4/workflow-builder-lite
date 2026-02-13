# Test Data for Workflow Templates

This file contains sample text for testing each of the available workflow templates.

## 1. Clean Text

**Step Type:** `CLEAN_TEXT`
**Test Input:**

```text
This    text   has   too    many   spaces between words.
It also includes some    typos lik ths one.
<p>And random HTML tags that should be removed.</p>

PLEASE FIX THE CAPITALIZATION!!! and remove    extra  lines.


There are
too many
line breaks here.
```

**Expected Output:**
Normalized spacing, fixed typos, removed HTML tags, standard capitalization, and consolidated lines.

---

## 2. Summarize

**Step Type:** `SUMMARIZE`
**Test Input:**

```text
Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by humans and other animals. Example tasks in which this is done include speech recognition, computer vision, translation between (natural) languages, as well as other mappings of inputs.

AI applications include advanced web search engines (e.g., Google Search), recommendation systems (used by YouTube, Amazon, and Netflix), understanding human speech (such as Siri and Alexa), self-driving cars (e.g., Waymo), generative or creative tools (ChatGPT and AI art), automated decision-making, and competing at the highest level in strategic game systems (such as chess and Go).

As machines become increasingly capable, tasks considered to require "intelligence" are often removed from the definition of AI, a phenomenon known as the AI effect. For instance, optical character recognition is frequently excluded from things considered to be AI, having become a routine technology.
```

**Expected Output:**
A 2-4 sentence summary capturing the key points: definition of AI, examples of its applications, and the concept of the AI effect.

---

## 3. Extract Key Points

**Step Type:** `EXTRACT_KEY_POINTS`
**Test Input:**

```text
The new Project Alpha launch is scheduled for Q3 2025. Our primary goal is to increase user retention by 15% within the first six months. The marketing budget has been approved at $500,000, which will be allocated across social media ads, influencer partnerships, and email campaigns. The engineering team needs to complete the backend migration by June 1st to support the new features. Additionally, we are hiring two new senior developers to accelerate the timeline.
```

**Expected Output:**
A numbered list of key facts: Launch date (Q3 2025), retention goal (15%), marketing budget ($500k) & allocation, backend migration deadline (June 1st), hiring plans (2 senior devs).

---

## 4. Tag Category

**Step Type:** `TAG_CATEGORY`
**Test Input:**

```text
Tesla's latest software update introduces a new autonomous driving feature that uses neural networks to better predict pedestrian movement. The stock price rose by 4% immediately following the announcement, signaling strong investor confidence in the company's AI strategy.
```

**Expected Output:**
A list of tags such as: "Technology, Automotive, AI, Finance, Stock Market"

---

## 5. Sentiment Analysis

**Step Type:** `SENTIMENT_ANALYSIS`
**Test Input (Positive):**

```text
I absolutely love this new coffee machine! It brews the perfect cup every time, and the design is sleek and modern. Highly recommended to anyone looking for an upgrade.
```

**Test Input (Negative):**

```text
The service at this restaurant was terrible. The waiter was rude, the food arrived cold, and it was completely overpriced for the quality. I will not be coming back.
```

**Expected Output:**

- Positive: Sentiment: Positive, High Confidence.
- Negative: Sentiment: Negative, High Confidence.

---

## 6. Translate

**Step Type:** `TRANSLATE`
**Test Input (Spanish):**

```text
Hola, ¿cómo estás? Me gustaría reservar una mesa para dos personas en su restaurante para esta noche a las ocho. Gracias just.
```

**Test Input (French):**

```text
L'intelligence artificielle change le monde rapidement. Nous devons nous adapter à ces nouvelles technologies.
```

**Expected Output:**

- Spanish to English: "Hello, how are you? I would like to reserve a table for two people at your restaurant for tonight at eight o'clock. Thank you."
- French to English: "Artificial intelligence is changing the world rapidly. We must adapt to these new technologies."

---

## 7. Quick Summary Template

**Step Type:** `Quick Summary` (Template)
**Steps:** `Clean Text` → `Summarize`
**Test Input:**

```text
The    meeting   started   late due to technical   difficulties.
The main   topic was    Q4    marketing strategy.
We decided to focus on    social media ads and    influencer partnerships.
Budget was approved for $50k.    Next meeting is on    Friday.
```

**Expected Output:**

- **Clean Text:** Normalized text without extra spaces.
- **Summarize:** A brief summary mentioning the Q4 marketing strategy focus and approved budget.

---

## 8. Full Analysis Template

**Step Type:** `Full Analysis` (Template)
**Steps:** `Clean Text` → `Summarize` → `Extract Key Points`
**Test Input:**

```text
NEW PRODUCT    SPECIFICATIONS -- CONFIDENTIAL
The device weighs    150g and includes a    5000mAh battery.
   Input: USB-C. Output: 5V/3A.
Colors available:   Black, White, Blue.
Launch Date:    September 15, 2025.
Price: $299.
```

**Expected Output:**

- **Clean Text:** Cleaned up specifications.
- **Summarize:** Summary of the product specs.
- **Extract Key Points:** List including Weight (150g), Battery (5000mAh), Launch Date (Sept 15), and Price ($299).

---

## 9. Content Tagger Template

**Step Type:** `Content Tagger` (Template)
**Steps:** `Clean Text` → `Summarize` → `Tag Category`
**Test Input:**

```text
  Global   warming   is causing   temperatures to rise   unpredictably.
Glaciers are melting at an    alarming rate.
governments must take    IMMEDIATE action to reduce carbon emissions.
Renewable energy sources like    solar and wind    are vital for the future.
```

**Expected Output:**

- **Clean Text:** Cleaned text about climate change.
- **Summarize:** Summary of the urgency of climate action.
- **Tag Category:** Tags like "Environment, Climate Change, Renewable Energy, Politics".

---

## 10. Deep Insights Template

**Step Type:** `Deep Insights` (Template)
**Steps:** `Clean Text` → `Extract Key Points` → `Sentiment Analysis` → `Tag Category`
**Test Input:**

```text
I am extremely    disappointed with the    service I received yesterday.
1. The package arrived    damaged.
2. Customer support was    unhelpful and rude.
3. The refund process is    way too complicated.
I will NEVER buy from this    company again!
```

**Expected Output:**

- **Clean Text:** Cleaned complaint text.
- **Extract Key Points:** Damaged package, rude support, complicated refund.
- **Sentiment Analysis:** Negative, High Confidence.
- **Tag Category:** "Customer Service, Complaint, E-commerce, Review".
