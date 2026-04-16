# ORB Wireframes & Design System 🎨

UI/UX design specifications and wireframes for the Orange Recipe Book application.

---

## Table of Contents

1. [Design System](#design-system)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Component Library](#component-library)
5. [Page Wireframes](#page-wireframes)
6. [User Flows](#user-flows)
7. [Responsive Design](#responsive-design)
8. [Accessibility Guidelines](#accessibility-guidelines)

---

## Design System

### Design Philosophy

- **Simplicity**: Clean, uncluttered interfaces
- **Clarity**: Clear visual hierarchy and information architecture
- **Consistency**: Unified design language across all pages
- **Accessibility**: WCAG 2.1 AA compliant
- **Modern**: Current design trends with timeless elements
- **Orange Theme**: Subtle orange accents inspired by the fruit 🍊

### Key Principles

1. **User-Centric**: Design for the home cook
2. **Mobile-First**: Optimized for mobile devices first
3. **Fast Interaction**: Quick feedback on user actions
4. **Progressive Disclosure**: Show important info first
5. **Consistency**: Familiar patterns and interactions

---

## Color Palette — "Saffron & Slate"

> Updated April 2026. Replaces the original orange/blue palette.

| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| **Primary** | `#D35400` (burnt orange) | `#D35400` |
| **Secondary** | `#382924` (dark brown) | `#382924` |
| **Background** | `#F7EADC` (warm cream) | `#1E1E1E` (near-black) |
| **Foreground** | `#1E1E1E` | `#F7EADC` |
| **Muted bg** | `#e8d9c8` | `#2a1f1b` |
| **Muted text** | `#382924` | `#c4a98a` |

### Semantic Colors

- **Success** (ingredient available): `#10B981`
- **Warning** (expiring soon / partial match): `#F59E0B`
- **Error** (missing ingredient / error): `#EF4444`

---

## Typography

> Updated April 2026. Replaces Inter with Bebas Neue + Nunito.

### Font Family

- **Headings**: `Bebas Neue` (400 weight) — display, section headers, recipe titles
- **Body**: `Nunito` (400/600 weight) — all body text, labels, UI copy
- **Mono**: `Fira Code` — ingredient amounts, measurements (optional)

### Type Scale

```
Display (48px, font-weight: 700)
  - Main page titles

Heading 1 (36px, font-weight: 700)
  - Section headers, recipe titles

Heading 2 (28px, font-weight: 600)
  - Sub-section headers

Heading 3 (24px, font-weight: 600)
  - Card titles

Body Large (18px, font-weight: 400)
  - Important body text, recipe descriptions

Body (16px, font-weight: 400)
  - Main body text, ingredient names

Body Small (14px, font-weight: 400)
  - Secondary text, metadata

Label (14px, font-weight: 500)
  - Form labels, buttons

Caption (12px, font-weight: 400)
  - Helper text, timestamps, hints
```

### Line Height

- Headings: `1.2`
- Body: `1.6`
- Tight: `1.4`

### Letter Spacing

- Normal: `0`
- Wide: `0.05em`

---

## Component Library

### Button Component

```
Primary Button
- Background: #FF8C42
- Text: White
- Padding: 12px 24px
- Border-radius: 8px
- Font-weight: 600
- Hover: #E67E3C (darker)
- Active: #D1703A
- Disabled: #D1D5DB (gray)

Secondary Button
- Background: #E0E7FF
- Text: #3B82F6
- Padding: 12px 24px
- Border: 1px solid #C7D2FE
- Border-radius: 8px
- Hover: #F0F9FF

Tertiary Button (Text only)
- Background: transparent
- Text: #FF8C42
- Hover: Background #FFE8D6

Ghost Button
- Background: transparent
- Text: #1F2937
- Border: 1px solid #E5E7EB
- Hover: Background #F3F4F6
```

### Input Component

```
Text Input
- Background: White
- Border: 1px solid #E5E7EB
- Border-radius: 6px
- Padding: 10px 14px
- Font: 16px (prevents zoom on mobile)
- Focus: Border #FF8C42, Shadow 0 0 0 3px rgba(255, 140, 66, 0.1)
- Error: Border #EF4444

Placeholder
- Color: #9CA3AF
- Font: 16px

Label
- Color: #1F2937
- Font-weight: 500
- Margin-bottom: 8px
- Display: block
```

### Card Component

```
Recipe Card
- Background: White
- Border-radius: 12px
- Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
- Padding: 16px
- Hover: Shadow 0 10px 25px rgba(0, 0, 0, 0.15)
- Transition: 200ms ease

Structure:
- Image (16:9 aspect ratio, rounded top)
- Title (Heading 3)
- Description (Body Small, 2 lines max)
- Metadata row: Difficulty, Time, Availability
- Availability badge with percentage
- Action buttons: Save, View Details
```

### Badge Component

```
Availability Badge
- Easy: Green background #D1FAE5, Text #047857
- Medium: Yellow background #FEF3C7, Text #D97706
- Hard: Red background #FEE2E2, Text #DC2626

Status Badge
- Can cook now: Green #10B981
- Missing 1-2: Yellow #F59E0B
- Missing 3+: Red #EF4444
```

### Navigation Component

```
Header
- Height: 64px (desktop), 56px (mobile)
- Background: White / Dark surface
- Sticky: Position fixed, top: 0
- Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
- Logo: ORB 🍊 (left)
- Nav links: center (desktop) / hidden (mobile)
- User menu: right
- Mobile hamburger: right

Sidebar (Desktop)
- Width: 280px
- Position: fixed, left: 0
- Height: calc(100vh - 64px)
- Background: #F9FAFB / Dark surface
- Border-right: 1px solid #E5E7EB
- Scrollable: Yes
- Items: Logo, Main nav, Collections, Settings

Bottom Navigation (Mobile)
- Height: 56px
- Position: fixed, bottom: 0
- Width: 100%
- Background: White / Dark surface
- Border-top: 1px solid #E5E7EB
- Items: 5 main sections
- Active indicator: Orange bottom border
```

---

## Page Wireframes

### 1. Authentication Pages

#### Login Page

```
┌─────────────────────────────────────────┐
│                                         │
│              ORB 🍊                     │
│      Orange Recipe Book                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Welcome back!                    │  │
│  │                                   │  │
│  │  Email                            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ [email input field]         │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Password                         │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ [password input field]      │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  [Forgot password?]               │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │    Sign In                  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Don't have an account?           │  │
│  │  [Create one]                     │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

#### Signup Page

```
┌─────────────────────────────────────────┐
│                                         │
│              ORB 🍊                     │
│      Orange Recipe Book                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  Create your account              │  │
│  │                                   │  │
│  │  Full Name                        │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ [full name input]           │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Email                            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ [email input]               │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Password                         │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ [password input]            │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  [I agree to terms]               │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │    Create Account           │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Already have an account?         │  │
│  │  [Sign in]                        │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

---

### 2. Home Page (Public — Search First)

> Updated April 2026. The home page is now the primary discovery surface, accessible without auth.
> There is no separate dashboard. The search page IS the entry point for all users.

```
┌──────────────────────────────────────────────────────────────┐
│ ORB           [My Ingredients]  [Saved]      [Log in] ▼      │
│  (logo Bebas)  (nudge if anon)  (nudge)      (or avatar)     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                                                              │
│                    ORB                                       │
│            (large Bebas Neue heading)                        │
│                                                              │
│         What do you want to cook?                           │
│         or: What's in your fridge?                          │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐  │
│   │  🔍  "pasta" or "chicken, garlic, tomatoes..."       │  │
│   └──────────────────────────────────────────────────────┘  │
│                                                              │
│                                                              │
│  ─────────────────── Results ────────────────────           │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  [Image]     │  │  [Image]     │  │  [Image]     │      │
│  │              │  │              │  │              │      │
│  │ Pasta        │  │ Stir Fry     │  │ Salad        │      │
│  │ Carbonara    │  │              │  │              │      │
│  │              │  │              │  │              │      │
│  │ ⏱ 20 min    │  │ ⏱ 15 min    │  │ ⏱ 10 min    │      │
│  │ 🎯 Easy     │  │ 🎯 Easy     │  │ 🎯 Very Easy │      │
│  │              │  │              │  │              │      │
│  │ [🤍 Save]   │  │ [🤍 Save]   │  │ [🤍 Save]   │      │
│  │ (anon nudge) │  │ (anon nudge) │  │ (anon nudge) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  Logged-in variant: cards show match % badge                 │
│  ┌──────────────┐                                           │
│  │  [Image]     │                                           │
│  │ Carbonara    │  ← ✅ 100% match  (green badge)           │
│  │ [❤️ Save]   │  ← button active, no nudge               │
│  └──────────────┘                                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Auth nudge behavior** (anonymous user clicks "Save"):
```
┌─────────────────────────────┐
│  Log in to save recipes     │
│  [Continue with Google]     │
│  [Maybe later]              │
└─────────────────────────────┘
```
Displayed as a small popover/tooltip — not a page redirect.

---

### 3. Ingredient Management Page

```
┌──────────────────────────────────────────────────────────────┐
│ ORB 🍊  Home  Recipes  My Recipes  Settings        User ▼    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  My Ingredients                                              │
│  ┌────────────────────────────────────┐  [Add Ingredient] + │
│  │ Search ingredients... 🔍           │                     │
│  └────────────────────────────────────┘                     │
│                                                              │
│  🔥 Pantry          ┌─────────────────┐                    │
│                     │ Filter Options  │                    │
│  ┌──────────────────┤ ├─────────────────┤                 │
│  │ Pasta        2kg │ │ Sort by:        │                 │
│  │ [Edit] [✕]      │ │ • Expiry date   │                 │
│  │                 │ │ • Name          │                 │
│  │ Olive Oil  500ml │ │ • Quantity      │                 │
│  │ [Edit] [✕]      │ │ ├─────────────────┤                 │
│  │                 │ │ Hide Expired    │                 │
│  │ Flour       1kg │ │ ☑              │                 │
│  │ [Edit] [✕]      │ └─────────────────┘                 │
│  └──────────────────┤                                     │
│                                                              │
│  ❄️ Freezer                                                  │
│  ┌──────────────────┐                                      │
│  │ Chicken Breast3  │                                      │
│  │ [Edit] [✕]      │                                      │
│  │                 │                                      │
│  │ Vegetables   5   │                                      │
│  │ [Edit] [✕]      │                                      │
│  └──────────────────┘                                      │
│                                                              │
│  🧊 Fridge                                                  │
│  ┌──────────────────┐                                      │
│  │ Milk       1L    │                                      │
│  │ [Edit] [✕]      │ Expires: 2025-02-15                 │
│  │                 │                                      │
│  │ Cheese     200g  │                                      │
│  │ [Edit] [✕]      │ Expires: 2025-02-10 ⚠️              │
│  └──────────────────┘                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 4. Recipe Browser Page

```
┌──────────────────────────────────────────────────────────────┐
│ ORB 🍊  Home  Recipes  My Recipes  Settings        User ▼    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Recipes                                                     │
│  ┌────────────────────────────────────┐  [List] [Grid] view │
│  │ Search recipes... 🔍               │                     │
│  └────────────────────────────────────┘                     │
│                                                              │
│  FILTERS ▼                                                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Cuisine: All ▼        Difficulty: All ▼                ││
│  │ Time: All ▼           Availability: All ▼              ││
│  │ [Reset Filters]                                        ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Showing 127 recipes                                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │   [Image]    │  │   [Image]    │  │   [Image]    │      │
│  │              │  │              │  │              │      │
│  │ Pasta        │  │ Stir Fry     │  │ Salad        │      │
│  │ Carbonara    │  │              │  │              │      │
│  │              │  │              │  │              │      │
│  │ ⏱ 20 min     │  │ ⏱ 15 min     │  │ ⏱ 10 min     │      │
│  │ 🎯 Easy      │  │ 🎯 Easy      │  │ 🎯 Very Easy │      │
│  │              │  │              │  │              │      │
│  │ ✅ 100% match│  │ ⚠️  80% match │  │ ⚠️  60% match │      │
│  │              │  │              │  │              │      │
│  │ [❤️ Save]    │  │ [🤍 Save]    │  │ [🤍 Save]    │      │
│  │ [View →]     │  │ [View →]     │  │ [View →]     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   [Image]    │  │   [Image]    │  │   [Image]    │      │
│  │ ...          │  │ ...          │  │ ...          │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ◀ 1 2 3 4 ... 25 ▶  (Pagination)                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 5. Recipe Detail Page

```
┌──────────────────────────────────────────────────────────────┐
│ ◀ Recipes  Home  Recipes  My Recipes  Settings    User ▼    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │                  [Large Recipe Image]               │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Pasta Carbonara                         [❤️ Save] [Share] │
│  ⏱ 20 min  🎯 Easy  👥 4 servings  🇮🇹 Italian           │
│                                                              │
│  ✅ 100% of ingredients available - You can cook this now! │
│                                                              │
│  Description                                                │
│  Traditional Italian pasta dish made with eggs, cheese,     │
│  and pancetta. Simple yet delicious!                        │
│                                                              │
│  ┌────────────────────────────┐  ┌───────────────────────┐ │
│  │ INGREDIENTS (4 servings)   │  │ INSTRUCTIONS          │ │
│  ├────────────────────────────┤  ├───────────────────────┤ │
│  │ ☑ 400g Pasta              │  │ 1. Boil pasta in     │ │
│  │   ✅ You have it          │  │    salted water       │ │
│  │                            │  │                       │ │
│  │ ☑ 200g Bacon              │  │ 2. Cut bacon into    │ │
│  │   ✅ You have it          │  │    pieces             │ │
│  │                            │  │                       │ │
│  │ ☑ 4 Eggs                  │  │ 3. Fry bacon until   │ │
│  │   ✅ You have it          │  │    crispy             │ │
│  │                            │  │                       │ │
│  │ ☑ 100g Parmesan           │  │ 4. Mix eggs with     │ │
│  │   ✅ You have it          │  │    cheese             │ │
│  │                            │  │                       │ │
│  │ ☑ Salt & Pepper           │  │ 5. Combine pasta     │ │
│  │   ✅ You have it          │  │    with mixture       │ │
│  │                            │  │                       │ │
│  │                            │  │ 6. Serve hot         │ │
│  │                            │  │                       │ │
│  │ [Add to Shopping List]     │  │                       │ │
│  │                            │  │                       │ │
│  └────────────────────────────┘  └───────────────────────┘ │
│                                                              │
│  Notes (Add personal notes)                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Great for weeknight dinners! 👍                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 6. Shopping List Page

```
┌──────────────────────────────────────────────────────────────┐
│ ORB 🍊  Home  Recipes  My Recipes  Settings        User ▼    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Shopping List                                               │
│  Generated from: Pasta Carbonara                             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Items                         [Add item +]             │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │                                                        │ │
│  │ ☐ Pasta           400g     [Edit] [Remove]            │ │
│  │ ☐ Bacon           200g     [Edit] [Remove]            │ │
│  │ ☐ Eggs             4       [Edit] [Remove]            │ │
│  │ ☐ Parmesan       100g      [Edit] [Remove]            │ │
│  │ ☐ Salt                     [Edit] [Remove]            │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Export Options                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [📝 Apple Notes] [📕 Notion] [📋 Copy] [✉️ Email]     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Export to Notes                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │ Shopping List - Pasta Carbonara                       │ │
│  │                                                        │ │
│  │ - Pasta (400g)                                         │ │
│  │ - Bacon (200g)                                         │ │
│  │ - Eggs (4)                                             │ │
│  │ - Parmesan (100g)                                      │ │
│  │ - Salt                                                 │ │
│  │                                                        │ │
│  │ Created: 2025-01-20 via ORB                           │ │
│  │                                                        │ │
│  │ [Copy to Clipboard] [Open in Notes] [Email]           │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 7. Saved Recipes Page

```
┌──────────────────────────────────────────────────────────────┐
│ ORB 🍊  Home  Recipes  My Recipes  Settings        User ▼    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  My Recipes                                                  │
│  [List] [Grid] view                [Sort by: Recent ▼]     │
│                                                              │
│  Collections                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ 🍳 Breakfast (5)  │ 🍰 Desserts (8)  │ 🥗 Healthy (12) ││
│  │ [View] [Edit]     │ [View] [Edit]    │ [View] [Edit]   ││
│  │ [Delete]          │ [Delete]         │ [Delete]        ││
│  │                   │                  │                 ││
│  │ [+ Create Collection]                                  ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  All Saved Recipes (25)              [❤️ Favorites] [All]  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │              │  │              │  │              │      │
│  │   [Image]    │  │   [Image]    │  │   [Image]    │      │
│  │              │  │              │  │              │      │
│  │ Pasta        │  │ Stir Fry     │  │ Salad        │      │
│  │ Carbonara    │  │              │  │              │      │
│  │              │  │              │  │              │      │
│  │ ❤️ Favorite  │  │ Not favorite  │  │ Not favorite  │      │
│  │              │  │              │  │              │      │
│  │ [Delete]     │  │ [Delete]     │  │ [Delete]     │      │
│  │ [View →]     │  │ [View →]     │  │ [View →]     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │   [Image]    │  │   [Image]    │                        │
│  │ ...          │  │ ...          │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### 8. User Settings Page

```
┌──────────────────────────────────────────────────────────────┐
│ ORB 🍊  Home  Recipes  My Recipes  Settings        User ▼    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Settings                                                    │
│                                                              │
│  Profile                                                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Avatar: [👤 Photo]  [Change]                          │  │
│  │                                                       │  │
│  │ Full Name                                             │  │
│  │ ┌──────────────────────────────────────────────────┐ │  │
│  │ │ [John Doe]                                       │ │  │
│  │ └──────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │ Email                                                 │  │
│  │ ┌──────────────────────────────────────────────────┐ │  │
│  │ │ john@example.com                                 │ │  │
│  │ └──────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │ [Save Changes]                                        │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  Preferences                                                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Theme: [○ Light] [● Dark] [○ System]                 │  │
│  │                                                       │  │
│  │ Language: English ▼                                   │  │
│  │                                                       │  │
│  │ Dietary Restrictions:                                 │  │
│  │ ☐ Vegetarian  ☐ Vegan  ☐ Gluten-free               │  │
│  │ ☐ Nut-free    ☐ Dairy-free                          │  │
│  │                                                       │  │
│  │ Default Servings: [4]                                │  │
│  │                                                       │  │
│  │ ☑ Email notifications for new suggestions            │  │
│  │ ☑ Show expiring ingredients                          │  │
│  │                                                       │  │
│  │ [Save Preferences]                                    │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  Integrations                                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Apple Notes:    [Not Connected] [Connect]             │  │
│  │ Notion:         [Connected ✓]   [Disconnect]         │  │
│  │ Mathom:         [Not Connected] [Connect]             │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  Security                                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Change Password:                                       │  │
│  │ ┌──────────────────────────────────────────────────┐ │  │
│  │ │ Current: [••••••••]                              │ │  │
│  │ └──────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │ ┌──────────────────────────────────────────────────┐ │  │
│  │ │ New: [••••••••]                                  │ │  │
│  │ └──────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │ [Update Password]                                     │  │
│  │                                                       │  │
│  │ [Delete Account]                                      │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [Sign Out]                                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## User Flows

### User Registration & Onboarding Flow

```
START
  ↓
[Homepage/Landing Page]
  ↓
User clicks "Sign Up"
  ↓
[Signup Form]
  ├─ Email validation
  ├─ Password requirements
  └─ Terms acceptance
  ↓
Email confirmation sent
  ↓
[Email Verification]
  ↓
Account created ✓
  ↓
[Welcome/Onboarding]
  ├─ Explain features
  ├─ Quick tutorial
  └─ Optional: Set dietary preferences
  ↓
[Add Initial Ingredients]
  ├─ Option 1: Manual entry
  ├─ Option 2: Quick templates
  └─ Option 3: Skip for now
  ↓
[Dashboard]
  ↓
END
```

### Recipe Discovery & Saving Flow

```
START
  ↓
[Dashboard] or [Recipes Page]
  ↓
User browses/searches recipes
  ↓
Filter applied (cuisine, difficulty, time, availability)
  ↓
[Recipe List]
  ├─ Recipes shown with availability %
  └─ Visual indicators for "Can cook now"
  ↓
User clicks recipe card
  ↓
[Recipe Detail Page]
  ├─ Full ingredients list
  ├─ Green ✅ for available ingredients
  ├─ Red ⚠️ for missing ingredients
  └─ Instructions
  ↓
User clicks "Save Recipe"
  ↓
[Collection Selector]
  ├─ Assign to collection
  ├─ Add personal notes
  └─ Mark as favorite
  ↓
Recipe saved ✓
  ↓
[Add to Shopping List?]
  ├─ Yes: Generate shopping list
  └─ No: Back to recipes
  ↓
END
```

### Shopping List Export Flow

```
START
  ↓
[Recipe Detail Page]
  ↓
User clicks "Add to Shopping List"
  ↓
[Shopping List Generated]
  ├─ Missing ingredients listed
  ├─ Quantities calculated
  └─ Editable items
  ↓
User clicks "Export"
  ↓
[Export Options Modal]
  ├─ Apple Notes
  ├─ Notion
  ├─ Copy to Clipboard
  ├─ Email
  └─ Plain Text
  ↓
User selects destination
  ↓
[Format Selection (if needed)]
  ├─ Simple list
  ├─ Checklist format
  └─ Detailed format
  ↓
Export processed ✓
  ↓
[Success Confirmation]
  └─ "List copied to Notes!"
  ↓
END
```

---

## Responsive Design

### Breakpoints

```
Mobile: 320px - 640px
  - Single column
  - Bottom navigation
  - Hamburger menu
  - Full-width cards

Tablet: 641px - 1024px
  - Two columns
  - Mixed layout
  - Sidebar visible (optional)
  - Responsive spacing

Desktop: 1025px+
  - Three columns
  - Full sidebar
  - Top navigation
  - Optimal spacing
```

### Mobile-First Approach

```
Base: Mobile (320px)
├─ Single column layout
├─ Large touch targets (48px min)
├─ Full-width inputs
├─ Bottom sheet modals
└─ Hamburger navigation

@media (min-width: 641px)
├─ Two column layout
├─ Sidebar visible (optional toggle)
├─ More spacing
└─ Larger fonts

@media (min-width: 1025px)
├─ Three column layout
├─ Permanent sidebar
├─ Advanced filters
└─ Multiple panels visible
```

### Touch-Friendly Interactions

- Minimum touch target: 48x48px
- Spacing between targets: 8px min
- Modal buttons: Full width on mobile
- Long press support for context menus
- Swipe gestures (optional): Swipe left to delete, right to undo

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color & Contrast
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text (18pt+)
- Don't rely on color alone (use icons, patterns, text labels)
- Provide alt text for all images

#### Keyboard Navigation
- All interactive elements accessible via Tab
- Focus indicators visible (outline)
- Logical tab order
- Keyboard shortcuts documented

#### Screen Reader Support
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels for complex components
- Form labels associated with inputs
- Alt text for images (not "image of")
- Skip navigation links

#### Text & Content
- Clear, simple language
- Short paragraphs and sentences
- Headings structure (h1 > h2 > h3)
- Descriptive link text (not "click here")
- Abbreviations explained on first use

#### Forms
- Clear labels for all inputs
- Error messages associated with fields
- Required fields marked
- Helpful placeholder text
- Error messages descriptive

#### Animations
- Reduce motion option respected
- No auto-playing videos/animations
- No flashing content (>3 times/sec)
- Animations not essential to task

---

## Mobile App Considerations

### Bottom Navigation (Mobile)

```
┌────────────────────────────────────┐
│         Main Content Area          │
├────────────────────────────────────┤
│ [Home] [Search] [Save] [List] [Me] │
└────────────────────────────────────┘
```

Tab Items:
1. **Home**: Dashboard, quick suggestions
2. **Search**: Recipe browser with filters
3. **Save**: Saved recipes & collections
4. **List**: Shopping list
5. **Me**: Profile, settings

### Swipe Gestures

```
Right swipe on recipe: Save recipe
Left swipe on recipe: Delete/Unsave
Swipe down: Refresh content
Pinch: Zoom recipe image
Long press: Context menu
```

### Safe Areas

- iOS: Notch/Dynamic Island safe area
- Android: System gesture area (bottom 3%)
- Status bar: Always accessible
- Bottom sheets: Avoid bottom 50px (Android gesture)

---

## Design System Components Inventory

- ✅ Button (Primary, Secondary, Tertiary, Ghost)
- ✅ Input (Text, Number, Search, Password)
- ✅ Select/Dropdown
- ✅ Checkbox
- ✅ Radio Button
- ✅ Badge/Tag
- ✅ Card
- ✅ Modal/Dialog
- ✅ Toast Notification
- ✅ Loading Skeleton
- ✅ Error State
- ✅ Empty State
- ✅ Navigation (Header, Sidebar, Bottom Nav)
- ✅ Forms
- ✅ Lists
- ✅ Chips/Pills
- ✅ Carousel/Slider

---

## Design Tokens

### Spacing
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Border Radius
```
sm: 4px
md: 8px
lg: 12px
full: 999px
```

### Shadows
```
sm: 0 1px 2px rgba(0, 0, 0, 0.05)
md: 0 4px 6px rgba(0, 0, 0, 0.1)
lg: 0 10px 25px rgba(0, 0, 0, 0.15)
xl: 0 20px 40px rgba(0, 0, 0, 0.2)
```

### Animation Duration
```
fast: 100ms
normal: 200ms
slow: 300ms
slower: 500ms
```

### Z-Index
```
dropdown: 1000
sticky: 1020
fixed: 1030
modal-backdrop: 1040
modal: 1050
popover: 1060
tooltip: 1070
```

---

## Design System Resources

### External Tools & Services

- **Figma**: Design and prototyping
- **zeplin.io**: Design handoff
- **Storybook**: Component documentation
- **Color Palette Generator**: colorhunt.co
- **Font Pairing**: google fonts

### Implementation

- shadcn/ui: Pre-built components
- Tailwind CSS: Utility classes
- Radix UI: Headless components
- Lucide Icons: Icon library

---

**Last Updated**: January 2025
**Version**: 1.0
**Status**: Ready for Design Implementation