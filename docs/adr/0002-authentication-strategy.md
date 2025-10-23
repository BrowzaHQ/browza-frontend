# ADR-0001: Authentication Strategy

## Status
Accepted

## Context
Need secure authentication for frontend application with ability to test UI independently of backend availability.

## Decision
- Use in-memory token storage (not localStorage) for security
- Implement TanStack Query for API state management
- Add mock fallback for development/testing when API unavailable
- Use react-hot-toast for user feedback

## Consequences
### Positive
- More secure against XSS attacks
- Can develop/test UI without backend dependency
- Centralized error handling
- Type-safe API calls

### Negative
- Token lost on page refresh (requires re-login)
- Additional mock logic maintenance
