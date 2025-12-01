# ORB Project Overview 🍊

A comprehensive visual guide to the Orange Recipe Book project.

---

## Project Vision

```
HOME COOK'S PROBLEM:
"I have chicken, tomatoes, and pasta... 
what can I cook?"

ORB SOLUTION:
Input ingredients → Get recipe suggestions → 
Save favorites → Generate shopping list → 
Export to shopping app
```

---

## The ORB Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1️⃣  SIGNUP                                                  │
│  └─ Create account with email/password                       │
│     ↓                                                         │
│  2️⃣  INPUT INGREDIENTS                                       │
│  └─ Add what you have: "Chicken, tomato, pasta, oil"        │
│     ↓                                                         │
│  3️⃣  BROWSE RECIPES                                          │
│  └─ See recipes ranked by ingredient availability            │
│     • Pasta Carbonara ✅ 100% (Can cook now!)               │
│     • Chicken Stir Fry ⚠️ 80% (Missing 1 item)              │
│     • Caesar Salad ⚠️ 60% (Missing 3 items)                 │
│     ↓                                                         │
│  4️⃣  SELECT A RECIPE                                         │
│  └─ View full details, ingredients, instructions             │
│     ↓                                                         │
│  5️⃣  GENERATE SHOPPING LIST                                  │
│  └─ Auto-calculate missing ingredients:                      │
│     • Bacon - 200g                                           │
│     • Parmesan - 100g                                        │
│     • Email                                                  │
│     • WhatsApp                                               │
│     • Apple Notes                                            │
│     • Notion                                                 │
│     • Copy to clipboard                                      │
│     ↓                                                         │
│  6️⃣  EXPORT & SHOP                                           │
│  └─ Send to:                                                 │
│     • Apple Notes                                            │
│     • Notion                                                 │
│     • Copy to clipboard                                      │
│     • Email                                                  │
│     • WhatsApp                                               │
│     ↓                                                         │
│  7️⃣  COOK & ENJOY! 🎉                                       │
│  └─ Delicious meal ready!                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## System Architecture

```
                    FRONTEND (Next.js 15 + React 19)
                    ┌──────────────────────────────┐
                    │  Pages & Components           │
                    │  - Dashboard                  │
                    │  - Recipe Browser             │
                    │  - Ingredient Manager         │
                    │  - Shopping List              │
                    └──────────────────────────────┘
                              │
                              │ HTTP/JSON
                              │
                    ┌──────────▼──────────────┐
                    │  API Layer (Next.js)    │
                    │  - /api/recipes         │
                    │  - /api/ingredients     │
                    │  - /api/shopping-list   │
                    └──────────┬──────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        │              ┌──────▼───────┐             │
        │              │  Supabase    │             │
        │              │  PostgreSQL  │             │
        │              │  Database    │             │
        │              └──────────────┘             │
        │                                           │
        │              ┌──────────────┐             │
        │              │ Supabase     │             │
        │              │ Auth (JWT)   │             │
        │              └──────────────┘             │
        │                                           │
        ▼                                           ▼
┌──────────────────────┐              ┌────────────────────┐
│ External Services    │              │ Vercel CDN         │
├──────────────────────┤              │ (Caching & Edge)   │
│ • Spoonacular API    │              └────────────────────┘
│ • Notion API         │
│ • Mathem API         │
└──────────────────────┘
```

---

## Key Statistics

### Database
```
┌─────────────────────────────────────┐
│         8 Main Tables               │
├─────────────────────────────────────┤
│ • users                  (ext. auth) │
│ • ingredients            (inventory) │
│ • recipes                (database)  │
│ • recipe_ingredients     (junction)  │
│ • saved_recipes          (cookbook)  │
│ • collections            (organize)  │
│ • shopping_lists         (generated) │
│ • ingredient_mappings    (synonyms)  │
└─────────────────────────────────────┘
```

### API
```
┌─────────────────────────────────────┐
│       25+ Endpoints                 │
├─────────────────────────────────────┤
│ Auth:        4 endpoints            │
│ Recipes:     5 endpoints            │
│ Ingredients: 5 endpoints            │
│ Saved:       4 endpoints            │
│ Collections: 4 endpoints            │
│ Lists:       3 endpoints            │
└─────────────────────────────────────┘
```

### UI Components
```
┌─────────────────────────────────────┐
│     50+ Reusable Components         │
├─────────────────────────────────────┤
│ Layout:       Header, Sidebar, Nav  │
│ Recipes:      Cards, Details, List  │
│ Ingredients:  Input, List, Search   │
│ Shopping:     List, Items, Export   │
│ Forms:        Login, Search, Filter │
│ Common:       Buttons, Modals, etc  │
└─────────────────────────────────────┘
```

---

## Development Timeline

```
WEEK 1-2: FOUNDATION
└─ Project planning ✅
   Wireframes ✅
   Architecture ✅
   Database design ✅
   [You are here] 👈

WEEK 3-4: AUTH & SETUP
└─ User authentication
   App layout
   Navigation

WEEK 5-6: INGREDIENTS
└─ Inventory UI
   Add/edit/delete
   Categories & search

WEEK 7-9: RECIPES
└─ Recipe browser
   Availability matching
   Advanced search

WEEK 10-11: USER FEATURES
└─ Save recipes
   Collections
   Personal notes

WEEK 12-13: SHOPPING LIST
└─ List generation
   Export options
   Multiple integrations

WEEK 14-15: POLISH
└─ Performance
   Accessibility
   UI refinement

WEEK 16: LAUNCH
└─ Testing & QA
   Final deployment
   Production monitoring

TOTAL: 16 weeks to MVP 🚀
```

---

## Feature Matrix

```
┌────────────────────────────────────────────────────────┐
│ FEATURE                    │ PHASE │ STATUS           │
├────────────────────────────────────────────────────────┤
│ User Authentication        │ 2     │ Planned          │
│ Ingredient Management      │ 3     │ Planned          │
│ Recipe Database            │ 4     │ Planned          │
│ Recipe Search & Filter     │ 4     │ Planned          │
│ Availability Matching      │ 4     │ Planned          │
│ Save Recipes               │ 5     │ Planned          │
│ Collections                │ 5     │ Planned          │
│ Shopping List Gen          │ 6     │ Planned          │
│ Export to Notes            │ 6     │ Planned          │
│ Export to Notion           │ 6     │ Planned          │
│ Dark Mode                  │ 7     │ Planned          │
│ Responsive Design          │ 7     │ Planned          │
│ Performance Optimization   │ 7     │ Planned          │
│ Analytics                  │ Future│ Post-MVP         │
│ Mobile App                 │ Future│ Post-MVP         │
└────────────────────────────────────────────────────────┘
```

---

## Technology Stack

```
FRONTEND              BACKEND              INFRASTRUCTURE
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Next.js 15      │  │ Node.js         │  │ Vercel (Hosting)│
│ React 19        │  │ Next.js API     │  │ Supabase (DB)   │
│ TypeScript      │  │ PostgreSQL      │  │ GitHub Actions  │
│ Tailwind CSS    │  │ Supabase Auth   │  │ GitHub (Repo)   │
│ shadcn/ui       │  │ JWT Sessions    │  │ Vercel CDN      │
│ Radix UI        │  │ RLS Policies    │  │ SSL/TLS         │
│ Lucide Icons    │  │ Server Actions  │  │                 │
│ next-themes     │  │ Middleware      │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## Data Model Overview

```
┌─────────┐
│ USERS   │ (User profiles & auth)
├─────────┤
│ id      │──┐
│ email   │  │
│ name    │  │
│ prefs   │  │
└─────────┘  │
             │
    ┌────────┴──────────┬──────────────┬──────────────┐
    │                   │              │              │
    ▼                   ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────┐ ┌──────────────┐
│INGREDIENTS   │ │SAVED_RECIPES │ │COLLECTS  │ │SHOPPING_LIST │
│(Inventory)   │ │(Cookbook)    │ │(Organize)│ │(To Export)   │
├──────────────┤ ├──────────────┤ ├──────────┤ ├──────────────┤
│ id           │ │ id           │ │ id       │ │ id           │
│ user_id ◄────┼─┤ user_id ◄────┼─┤ user_id◄─┼─┤ user_id ◄────┤
│ name         │ │ recipe_id ──┐ │ │ name     │ │ recipe_id ──┐
│ quantity     │ │ collection_◄┼─┤ │ color    │ │ items       │
│ unit         │ │ notes       │ │ │ emoji    │ │ exported    │
│ category     │ │ favorite    │ │ │          │ │             │
│ expires_at   │ │             │ │ │          │ │             │
└──────────────┘ └──────────────┘ │          │ │             │
                       │           └──────────┘ └──────────────┘
                       │
                       │ (many:many)
                       │
                    ┌──▼────────────────┐
                    │ RECIPES           │
                    │ (Public Database) │
                    ├───────────────────┤
                    │ id                │
                    │ title             │
                    │ difficulty        │
                    │ cooking_time      │
                    │ cuisine           │
                    │ instructions      │
                    │ image_url         │
                    └────────┬──────────┘
                             │
                             │ (1:N)
                             │
                    ┌────────▼────────────────┐
                    │ RECIPE_INGREDIENTS      │
                    │ (Ingredient Mapping)    │
                    ├─────────────────────────┤
                    │ id                      │
                    │ recipe_id ◄─────────────┤
                    │ ingredient_name         │
                    │ quantity                │
                    │ unit                    │
                    │ is_optional             │
                    └─────────────────────────┘
```

---

## Phase Dependencies

```
Phase 1: FOUNDATION ✅
  ↓
Phase 2: AUTH & SETUP
  ↓ (depends on user auth)
Phase 3: INGREDIENTS
  ↓ (depends on user system)
Phase 4: RECIPES ◄── (can run parallel with Phase 3)
  ↓ (depends on ingredient matching)
Phase 5: USER FEATURES (depends on saved data)
  ↓
Phase 6: SHOPPING & EXPORT (depends on recipe selection)
  ↓
Phase 7: POLISH & OPTIMIZATION
  ↓
Phase 8: TESTING & LAUNCH
  ↓
🚀 PRODUCTION LAUNCH
```

---

## Success Metrics

```
USER ENGAGEMENT
├─ 50-100 beta users in first month
├─ 5 min average session duration
├─ 3+ recipes saved per user
└─ 2+ shopping lists generated per week

PERFORMANCE
├─ <2s page load time (average)
├─ 90+ Lighthouse score
├─ 95%+ uptime
└─ <100ms API response time

QUALITY
├─ 80%+ test coverage
├─ <1% error rate
├─ <1 critical bug per 1000 users
└─ WCAG 2.1 AA accessibility

ADOPTION
├─ 80% mobile traffic
├─ 5+ integrations used daily
├─ 40% recipe sharing rate
└─ 30-day retention >60%
```

---

## Team Structure

```
PROJECT MANAGER (1)
├─ Overall timeline
├─ Team coordination
└─ Stakeholder management
    
TECH LEAD (1)
├─ Architecture decisions
├─ Code review
└─ Technical guidance
    
FRONTEND TEAM (1-2)
├─ UI/UX implementation
├─ Component development
└─ Responsive design
    
BACKEND TEAM (1-2)
├─ API routes
├─ Database queries
└─ Business logic
    
DESIGNER (1)
├─ UI mockups
├─ Design system
└─ User experience
    
DEVOPS (1, part-time)
├─ Deployment
├─ Infrastructure
└─ Monitoring
```

---

## Communication Plan

```
DAILY
└─ 15-min standup (async or sync)
   - What I did
   - What I'm doing
   - Any blockers

WEEKLY
├─ Monday: Sprint planning (1h)
├─ Wednesday: Progress check-in (30min)
└─ Friday: Retrospective (1h)

ONGOING
├─ GitHub Issues for tracking
├─ Pull Requests for code review
├─ Discord/Slack for questions
└─ Figma for design feedback
```

---

## Risk Management

```
HIGH RISKS
├─ Recipe API changes
│  └─ Mitigation: Abstract API layer, backup API ready
├─ Database performance
│  └─ Mitigation: Early optimization, load testing
└─ Scope creep
   └─ Mitigation: Clear phase gates, prioritization

MEDIUM RISKS
├─ Team availability
│  └─ Mitigation: Clear documentation
├─ Third-party integrations
│  └─ Mitigation: Fallback options
└─ Security issues
   └─ Mitigation: Regular audits, RLS policies

LOW RISKS
├─ Technology selection
│  └─ Mitigation: Proven stack
├─ Learning curve
│  └─ Mitigation: Documentation & training
└─ Market fit
   └─ Mitigation: User research, iterations
```

---

## Budget & Resources

```
INFRASTRUCTURE COSTS
├─ Vercel (Next.js hosting): $20-50/month
├─ Supabase (Database): $25-100/month
├─ Recipe API: $50-200/month
└─ Monitoring & Tools: $50-100/month
Total: ~$145-450/month (before scale)

DEVELOPMENT TIME
├─ Phase 1: 80 hours (planning)
├─ Phase 2-8: 400 hours (development)
├─ Testing: 100 hours
└─ Deployment: 40 hours
Total: ~620 hours (16 weeks, 2-3 devs)

TOOLS (One-time or Annual)
├─ GitHub: Free/$21/user
├─ Figma: Free/$12/month
├─ VS Code: Free
├─ Domain name: $10-15/year
└─ SSL: Free (Let's Encrypt)
```

---

## Documentation Structure

```
📂 docs/
│
├─ 📄 README.md
│  └─ Documentation index & quick start
│
├─ 📄 IMPLEMENTATION_PHASES.md (694 lines)
│  └─ Week-by-week breakdown (Phases 1-8)
│
├─ 📄 ARCHITECTURE.md (995 lines)
│  └─ System design & technical details
│
├─ 📄 DATABASE_SCHEMA.md (1003 lines)
│  └─ Complete schema definitions & RLS
│
├─ 📄 WIREFRAMES.md (1042 lines)
│  └─ UI/UX specs & design system
│
└─ 📄 PROJECT_OVERVIEW.md (this file)
   └─ Visual summary & quick reference

TOTAL: ~4,000 lines of documentation 📚
```

---

## Quick Reference Commands

```bash
# Setup
npm install                    # Install dependencies
cp .env.local.example .env.local  # Configure env
npm run dev                    # Start dev server

# Development
npm run lint                   # Check code quality
npm run build                  # Build for production
npm start                      # Run production build
npm run test                   # Run tests

# Database
npm run db:migrate            # Run migrations
npm run db:reset              # Reset database (dev only)
npm run db:seed               # Seed initial data
```

---

## Onboarding Checklist

### First Time Setup
- [ ] Clone repository
- [ ] Install Node.js 18+
- [ ] Run `npm install`
- [ ] Copy `.env.local.example`
- [ ] Get Supabase credentials
- [ ] Run dev server
- [ ] Verify running on localhost:3000

### Learning Path (Day 1)
- [ ] Read main README.md
- [ ] Review PROJECT_OVERVIEW.md (this file)
- [ ] Study ARCHITECTURE.md
- [ ] Check WIREFRAMES.md
- [ ] Review DATABASE_SCHEMA.md

### Development Prep (Day 2)
- [ ] Set up code editor (VS Code)
- [ ] Install recommended extensions
- [ ] Review IMPLEMENTATION_PHASES.md
- [ ] Understand your assigned phase
- [ ] Create feature branch
- [ ] Make first commit

---

## Next Steps

### Immediate (This Week - Phase 1)
1. ✅ Documentation complete
2. ⏳ Team review & approval
3. ⏳ Supabase project setup
4. ⏳ GitHub repository configuration
5. ⏳ CI/CD pipeline setup

### Short Term (Next Week - Phase 1)
1. ⏳ Database schema creation
2. ⏳ Authentication setup
3. ⏳ Development environment ready
4. ⏳ Team training complete
5. ⏳ Ready for Phase 2

### Medium Term (Weeks 3-4 - Phase 2)
1. ⏳ User authentication working
2. ⏳ App shell & navigation
3. ⏳ Login/signup pages
4. ⏳ Protected routes

### Long Term (Weeks 5-16 - Phases 3-8)
1. ⏳ Core features implementation
2. ⏳ Testing & optimization
3. ⏳ Beta launch
4. ⏳ Production deployment

---

## Final Thoughts

ORB is an ambitious yet achievable project that will help millions of home cooks discover recipes they can actually make. The comprehensive documentation, clear architecture, and phased approach ensure:

✅ **Clear Direction**: Every team member knows what to build
✅ **Quality Code**: Architecture and best practices defined
✅ **Easy Onboarding**: New team members can ramp up quickly
✅ **Risk Mitigation**: Potential issues identified and addressed
✅ **Timeline Confidence**: Realistic 16-week path to MVP
✅ **Scalability**: Foundation supports millions of users

### Core Values
- 🍊 **User-First**: Build for home cooks
- 📚 **Document Everything**: Future maintainability
- 🎯 **Stay Focused**: MVP first, features later
- 🚀 **Ship Quality**: Better slow than broken
- 🤝 **Team Collaboration**: Open communication
- ♻️ **Iterate & Improve**: Continuous refinement

---

## Get Started Now

1. **Read the Docs**
   - Start: README.md (main)
   - Then: docs/README.md (index)
   - Study: ARCHITECTURE.md

2. **Set Up Dev Environment**
   - Install dependencies
   - Configure environment
   - Start dev server

3. **Begin Phase 1**
   - Follow IMPLEMENTATION_PHASES.md
   - Complete documentation reviews
   - Set up infrastructure

4. **Stay Updated**
   - Weekly standups
   - Keep docs current
   - Communicate blockers

---

**Status**: ✅ Documentation Complete & Ready for Implementation
**Phase**: 1 (Foundation & Setup)
**Timeline**: 16 weeks to MVP
**Team**: Ready to begin
**Next**: Team review & Phase 1 kickoff

🍊 **Let's build something amazing!**

---

*Last Updated: January 2025*
*Version: 1.0 - Foundation Complete*
*Total Documentation: 4,000+ lines across 6 files*
*All files available in `/orb/docs/` directory*
