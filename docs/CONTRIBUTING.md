# Contributing Guidelines

Thank you for contributing! To maintain quality and consistency, please follow these rules:

---

## 🧩 Pull Request (PR) Rules
- Keep PRs **focused on a single topic or feature**.
- Maximum **~200 lines of code (LOC)** per PR.
- Every PR must include a **2-minute Loom video walkthrough** explaining:
  - What changed
  - Why it changed
  - Quick demo (if applicable)
- Use **clear, descriptive commit messages**.

---

## 🌿 Branch Naming Convention
Follow the prefix-based naming:
- `feat/<short-description>` → for new features  
- `fix/<short-description>` → for bug fixes  
- `chore/<short-description>` → for maintenance, refactors, or CI updates  

Example:  

feat/add-payment-api
fix/profile-picture-bug
chore/update-eslint-config



---

## ⚙️ Dependencies
- **No major dependency upgrades or new dependencies** without an **ADR (Architecture Decision Record)**.
- ADR must include:
  - Why the dependency is needed  
  - Alternatives considered  
  - Impact on build, performance, and maintainability  

---

## ✅ Definition of Done (DoD)
A PR is considered complete when:
- [ ] All lint/build/test checks pass  
- [ ] Loom walkthrough attached  
- [ ] Reviewed and approved  
- [ ] Branch protection checks pass  

---

_Once these steps are followed, your PR will be eligible for merge!_
