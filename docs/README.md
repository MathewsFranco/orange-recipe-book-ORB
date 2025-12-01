# ORB Documentation Index 📚

Welcome to the ORB (Orange Recipe Book) 🍊 project documentation. This directory contains all the planning, architectural, and design documentation for the project.

## Quick Navigation

### 📋 Core Documentation

1. **[IMPLEMENTATION_PHASES.md](./IMPLEMENTATION_PHASES.md)** - Detailed week-by-week implementation plan
   - Phase 1: Foundation & Setup (Weeks 1-2)
   - Phase 2: Authentication & Core Setup (Weeks 3-4)
   - Phase 3: Ingredient Management (Weeks 5-6)
   - Phase 4: Recipe Database & Browser (Weeks 7-9)
   - Phase 5: User Recipe Features (Weeks 10-11)
   - Phase 6: Shopping List & Export (Weeks 12-13)
   - Phase 7: Polish & Optimization (Weeks 14-15)
   - Phase 8: Testing & QA (Week 16)
   - Status: **Ready for implementation**

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system architecture
   - Technology Stack overview
   - Architecture Diagram with all layers
   - Data Flow diagrams
   - Component Structure & relationships
   - API Design & endpoints
   - Database Architecture
   - Authentication & Security
   - Performance Optimization
   - Scalability strategies
   - Status: **Production-ready design**

3. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Complete PostgreSQL schema
   - 8 main database tables with detailed definitions
   - Data relationships & ER diagram
   - Row Level Security (RLS) policies
   - Indexing strategy
   - Database functions for complex operations
   - Migration guide
   - Status: **Ready for SQL implementation**

4. **[WIREFRAMES.md](./WIREFRAMES.md)** - UI/UX Design specifications
   - Design System & Color Palette
   - Typography scale
   - Component Library
   - Detailed page wireframes for all screens
   - User flows & navigation
   - Responsive design breakpoints
   - Accessibility guidelines (WCAG 2.1 AA)
   - Status: **Design system complete**

---

## Project Overview

### What is ORB? 🍊

ORB (Orange Recipe Book) is a smart recipe discovery application that helps home cooks:
- **Input** ingredients they have available
- **Discover** recipes they can cook with those ingredients
- **Save** recipes to a personal cookbook
- **Generate** shopping lists for missing ingredients
- **Export** lists to other apps (Notes, Notion, etc.)

### Key Features (MVP)

✅ User authentication with Supabase
✅ Ingredient inventory management
✅ Recipe discovery with availability matching
✅ Recipe browsing with advanced filtering
✅ Ingredient availability tracking
✅ Save recipes to personal cookbook
✅ Generate shopping lists
✅ Export to external apps

### Tech Stack

**Frontend:**
- Next.js 15+ (React 19)
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Lucide React icons

**Backend:**
- Next.js API Routes & Server Actions
- PostgreSQL via Supabase
- Supabase Auth
- Row-Level Security (RLS)

**Infrastructure:**
- Vercel for hosting
- Supabase for database & auth
- GitHub Actions for CI/CD

---

## Getting Started

### For New Team Members

1. **Start here**: Read the [main README.md](../README.md) for project overview
2. **Understand the plan**: Review [IMPLEMENTATION_PHASES.md](./IMPLEMENTATION_PHASES.md)
3. **Learn the architecture**: Study [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **See the design**: Check [WIREFRAMES.md](./WIREFRAMES.md)
5. **Understand the database**: Review [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

### For Developers

1. **Phase 1**: Follow [IMPLEMENTATION_PHASES.md - Phase 1](./IMPLEMENTATION_PHASES.md#phase-1-foundation--planning-weeks-1-2)
2. **Set up database**: Use SQL from [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
3. **Build API**: Reference endpoints in [ARCHITECTURE.md - API Design](./ARCHITECTURE.md#api-design)
4. **Implement UI**: Follow wireframes in [WIREFRAMES.md](./WIREFRAMES.md)
5. **Code Quality & Formatting**: Use [Biome](https://biomejs.dev/) for linting and formatting (see below).

### For Designers

1. Review [WIREFRAMES.md](./WIREFRAMES.md) for design system
2. Check [Color Palette](./WIREFRAMES.md#color-palette) and [Typography](./WIREFRAMES.md#typography)
3. Use [Component Library](./WIREFRAMES.md#component-library) section
4. Follow [Accessibility Guidelines](./WIREFRAMES.md#accessibility-guidelines)

---

## Project Structure

```
orb/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── recipes/          # Recipe components
│   ├── ingredients/      # Ingredient components
│   └── layout/           # Layout components
├── lib/                  # Utilities & helpers
├── docs/                 # 📍 You are here
│   ├── IMPLEMENTATION_PHASES.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── WIREFRAMES.md
│   └── README.md (this file)
├── public/               # Static assets
└── README.md            # Main project README
```

---

## Timeline

| Phase | Focus | Duration | Status |
|-------|-------|----------|--------|
| 1 | Foundation & Setup | Weeks 1-2 | ✋ Current |
| 2 | Auth & Core Setup | Weeks 3-4 | Planned |
| 3 | Ingredient Management | Weeks 5-6 | Planned |
| 4 | Recipe Database & Browser | Weeks 7-9 | Planned |
| 5 | User Recipe Features | Weeks 10-11 | Planned |
| 6 | Shopping List & Export | Weeks 12-13 | Planned |
| 7 | Polish & Optimization | Weeks 14-15 | Planned |
| 8 | Testing & QA | Week 16 | Planned |

**Total Timeline**: ~16 weeks to production-ready MVP

---

## Code Quality & Formatting: Biome

### Why Biome?

ORB uses [Biome](https://biomejs.dev/) for code linting and formatting. Biome is a fast, all-in-one tool that replaces both ESLint and Prettier, providing modern, strict, and clean rules for TypeScript, React, and Next.js projects.

### Migration Notes

- **ESLint and Prettier have been removed** from the project.
- **Biome** is now the only tool for linting and formatting.
- All configuration is in `biome.json` at the project root.

### Usage

- **Lint code:**  
  `npm run lint`  
  (Runs `biome lint .` with recommended rules)
- **Format code:**  
  `npm run format`  
  (Runs `biome format .` with project formatting rules)

### Configuration

See `biome.json` for all rules.  
Key features:
- Strict recommended rules for React, TypeScript, accessibility, and code style.
- Automatic import organization.
- 2-space indentation, double quotes, trailing commas, 100 character line width.
- Warnings for unused variables, console statements, implicit `any`, and more.
- Accessibility rules for JSX.

### How to update rules

Edit `biome.json` and commit changes.  
See [Biome documentation](https://biomejs.dev/docs/) for details.

### Troubleshooting

- If you see lint errors, run `npm run format` to auto-fix.
- For rule explanations, run `npx biome explain <rule-name>`.
- For migration help, see [Biome migration guide](https://biomejs.dev/docs/migration/).

---


---

## Key Decision Points

### Architecture
- ✅ **Database**: PostgreSQL (Supabase) - chosen for relational data and native auth
- ✅ **Hosting**: Vercel - optimized for Next.js
- ✅ **State Management**: React Context + Hooks (upgrade path to Zustand available)
- 🔄 **Recipe API**: TBD - To be decided (Spoonacular, Edamam, or custom)

### Design
- ✅ **UI Framework**: shadcn/ui + Radix UI - accessible and customizable
- ✅ **Styling**: Tailwind CSS - utility-first for rapid development
- ✅ **Theme**: Orange-based with light/dark modes
- ✅ **Responsive**: Mobile-first approach

---

## Database Schema Overview

### 8 Main Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `users` | User profiles | id, email, full_name, preferences |
| `ingredients` | User inventory | id, user_id, name, quantity, unit, category |
| `recipes` | Recipe database | id, title, difficulty, cooking_time, cuisine |
| `recipe_ingredients` | Recipe-ingredient mapping | recipe_id, ingredient_name, quantity, unit |
| `saved_recipes` | User's cookbook | user_id, recipe_id, collection_id, notes |
| `collections` | Recipe organization | user_id, name, color, emoji |
| `shopping_lists` | Generated lists | user_id, recipe_id, items (JSONB) |

All tables include:
- Row-Level Security (RLS) for user privacy
- Proper indexes for performance
- Foreign key constraints for data integrity
- Timestamps for auditing (created_at, updated_at)

---

## API Endpoints

### Core Endpoint Categories

**Authentication** (`/api/auth/`)
- POST /signup
- POST /login
- POST /logout

**Recipes** (`/api/recipes/`)
- GET /recipes (list with filters)
- GET /recipes/:id (details)
- GET /recipes/available (user-specific)

**Ingredients** (`/api/ingredients/`)
- GET /ingredients (list)
- POST /ingredients (add)
- PUT /ingredients/:id (update)
- DELETE /ingredients/:id (remove)

**Saved Recipes** (`/api/saved-recipes/`)
- GET / (list)
- POST / (save)
- DELETE /:id (unsave)

**Shopping Lists** (`/api/shopping-lists/`)
- POST /generate (from recipe)
- GET /:id (retrieve)
- POST /:id/export (export)

---

## Component Architecture

### Page Hierarchy

```
App (Root)
├── (auth) - Authentication routes
│   ├── /login
│   ├── /signup
│   └── /reset-password
└── (dashboard) - Protected routes
    ├── layout (with sidebar)
    ├── / (dashboard home)
    ├── /recipes (browser)
    ├── /recipes/[id] (detail)
    ├── /ingredients (management)
    ├── /my-recipes (cookbook)
    ├── /shopping-list
    └── /settings
```

### Key Components

- **RecipeCard**: Preview of recipe with availability
- **IngredientMatching**: Show have/need ingredients
- **ShoppingListGenerator**: Create list from recipe
- **AuthForm**: Reusable login/signup
- **AvailabilityIndicator**: Visual percentage

---

## Security & Privacy

### User Data Protection
- ✅ JWT-based authentication
- ✅ Row-Level Security (RLS) on all user data
- ✅ HTTPS only (Vercel enforced)
- ✅ Encrypted passwords (bcrypt via Supabase)
- ✅ Secure HTTP-only cookies

### Data Access
- Users can only access their own data
- Recipes are publicly readable
- Shopping lists and saved recipes are private
- Collections are user-specific

### Best Practices
- No sensitive data in client code
- Environment variables for secrets
- Input validation on all endpoints
- Rate limiting on API endpoints
- Regular security audits planned

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint (FCP) | < 1.8s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Time to Interactive (TTI) | < 3.7s | Lighthouse |
| Lighthouse Performance | >= 90 | Score |
| Lighthouse Accessibility | >= 90 | Score |

---

## Accessibility Standards

- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation throughout
- ✅ Screen reader support
- ✅ 4.5:1 minimum color contrast
- ✅ Focus indicators visible
- ✅ Semantic HTML
- ✅ Alt text on images
- ✅ Form labels associated with inputs

---

## Deployment Checklist

### Pre-Launch
- [ ] All tests passing (95%+ coverage)
- [ ] Code reviewed and approved
- [ ] Database migrations tested
- [ ] Secrets configured in production
- [ ] Monitoring & alerting active
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Documentation complete

### Launch Day
- [ ] Create database backup
- [ ] Deploy to staging first
- [ ] Run validation tests
- [ ] Deploy to production
- [ ] Monitor metrics
- [ ] Be available for quick fixes

---

## Future Enhancements (Post-MVP)

### Phase 2 Features
- 🤖 AI-powered recipe recommendations
- 📱 Mobile app (React Native)
- 🌍 Multi-language support
- 📊 Cooking statistics & analytics
- ⭐ Community recipes & ratings
- 🔗 Advanced app integrations

### Phase 3+ Vision
- 📸 Recipe photo uploads
- 🎥 Video instructions
- 💬 Social features
- 🏪 Price optimization
- 📈 Meal planning
- 🔔 Smart notifications

---

## Communication & Collaboration

### Weekly Meetings
- **Monday**: Week planning & sprint kickoff
- **Wednesday**: Mid-week progress check-in
- **Friday**: Week retrospective & planning next week

### Project Tracking
- **Issues**: GitHub Issues for feature tracking
- **Projects**: GitHub Projects for sprint boards
- **Design**: Figma for design iterations
- **Database**: Supabase dashboard for migrations

### Documentation
- Keep all docs updated with changes
- Document decisions in commit messages
- Maintain changelog for each phase
- Code comments for complex logic
- Regular README updates

---

## Resources

### External Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Tools & Services
- **Code Editor**: VS Code
- **Version Control**: Git/GitHub
- **Design Tool**: Figma
- **Deployment**: Vercel
- **Database**: Supabase
- **CI/CD**: GitHub Actions
- **Error Tracking**: Sentry (future)
- **Analytics**: Vercel Analytics

---

## FAQ

### Q: Why PostgreSQL instead of NoSQL?
A: Better for relational data (users → recipes → ingredients). Strong consistency, ACID properties, and excellent for complex queries. Plus Supabase integration is seamless.

### Q: Why Supabase instead of Firebase?
A: PostgreSQL flexibility, better for complex queries, RLS policies more fine-grained, and better alignment with Vercel deployment.

### Q: Can we scale to millions of users?
A: Yes! The architecture supports horizontal scaling through Vercel Edge Functions, database read replicas, and caching layers. See ARCHITECTURE.md for scaling strategy.

### Q: How do we handle recipe API rate limits?
A: Implement caching strategy, have backup API ready, consider self-hosting recipe data for critical features.

### Q: Is the app mobile-responsive?
A: Yes! Mobile-first design with breakpoints for tablet and desktop. Full responsive implementation planned for Phase 7.

---

## Contributing

### Before Starting
1. Read this entire README
2. Review the phase you're working on in IMPLEMENTATION_PHASES.md
3. Understand the architecture from ARCHITECTURE.md
4. Review relevant section in WIREFRAMES.md

### During Development
1. Follow the code style & conventions
2. Write tests for new features
3. Update documentation as you go
4. Make clear commit messages
5. Create meaningful pull requests

### Code Review
- At least 1 approval required
- All tests must pass
- No console errors/warnings
- Documentation updated
- Follow TypeScript strictly

---

## Support & Questions

### Getting Help
- Check the relevant documentation file
- Search GitHub Issues for similar questions
- Ask in team meetings
- Create a new issue for bugs/questions

### Reporting Issues
1. Clear title describing the problem
2. Steps to reproduce
3. Expected vs actual behavior
4. Environment details
5. Screenshots/error logs if applicable

---

## License

MIT - Feel free to use this project as you wish.

---

## Summary

This documentation provides everything needed to understand, develop, and deploy ORB. The project is well-planned with clear phases, architectural decisions documented, and design specifications detailed.

**Key Takeaways:**
- 🎯 MVP targeting 16 weeks from start to production
- 📚 All major decisions documented with rationale
- 🏗️ Scalable architecture supporting future growth
- 🎨 Accessible, modern design system in place
- 🔒 Security and privacy by design
- 📊 Clear success metrics and monitoring strategy

**Ready to build?** Start with Phase 1 in [IMPLEMENTATION_PHASES.md](./IMPLEMENTATION_PHASES.md)

---

**Last Updated**: January 2025
**Documentation Version**: 1.0
**Project Status**: Ready for Implementation ✅