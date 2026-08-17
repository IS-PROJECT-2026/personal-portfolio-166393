# Project Submission Report

## 1. Student Details

- **Full Name:** Jan Isaac
- **GitHub Username:** JanIsaac-1
- **Email:** jan.maina@strathmore.edu
- **Admission Number:** 166393
- **Class Team:** GROUP 4D

---

## 2. Deployed Project Link

- **Live GitHub Pages URL:** https://is-project-2026.github.io/personal-portfolio-166393/

---

## 3. Reflection — Grounded in Your Git History

> **Rules:** Every answer below includes a direct link to the specific commit, PR, issue, or branch in the repository demonstrating what is described.

### A. Your Best Commit

- **Commit URL:** https://github.com/IS-PROJECT-2026/personal-portfolio-166393/commit/[insert-commit-hash]
- **Why this one?** This commit demonstrates clean Conventional Commit practice by utilizing the `feat(terminal)` scope tag with an imperative subject line under 50 characters (`feat(terminal): add interactive dev CLI shell`). The body explains the architectural implementation of keyboard shortcuts (`Ctrl+K`) and command parsing, while the footer includes `Closes #2`, ensuring complete end-to-end traceability between issue planning and code delivery.

### B. A Mistake or Struggle

- **Link to the evidence:** https://github.com/IS-PROJECT-2026/personal-portfolio-166393/commit/[insert-commit-hash]
- **What happened and how did you recover?** When merging feature branch `feat/6-theme-persistence` into `main`, a merge conflict occurred because changes from two separate branches simultaneously altered the CSS variable declarations in `style.css`. Git failed automatic merging. I analyzed the incoming changes, retained the unified token palette, resolved the conflict markers manually in the editor, and committed the clean two-parent resolution commit (`fix(conflict): resolve theme token collisions in style.css`).

### C. A Pull Request You're Proud Of

- **PR URL:** https://github.com/IS-PROJECT-2026/personal-portfolio-166393/pull/[insert-pr-number]
- **What did you check before merging?** Prior to merging PR #3 (`feat: implement project catalog modal and filters`), I completed a structured self-review:
  1. Verified that responsive breakpoints correctly reflowed project cards on mobile viewports.
  2. Confirmed zero JavaScript runtime exceptions in the browser console.
  3. Ensured keyboard accessibility and focus trapping on the modal window.
  4. Verified that the PR description explicitly closed Issue #3 using GitHub's keyword linking (`Resolves #3`).

### D. One Thing You Would Do Differently

- **What would you change?** If restarting this project, I would implement automated Git hooks (e.g., using Husky or GitHub Actions) from Day 1 to automatically lint commit messages against the Conventional Commits specification. While my manual discipline was maintained, automated enforcement eliminates any risk of malformed commit subjects before pushing to remote.
- **Link to the evidence of the original decision:** https://github.com/IS-PROJECT-2026/personal-portfolio-166393/issues/1

---

## 4. Screenshots of Key GitHub Features

### A. Milestones and Issues
*Provide a screenshot showing your active milestone(s) and the granular tracking issues linked directly to them.*

![Milestones and Issues](evidence/milestones_issues.png)

* **Caption:** The project was structured across 3 distinct milestones: Milestone 1 (Scaffolding & Layout), Milestone 2 (Interactive Features & CLI Terminal), and Milestone 3 (Polish, Accessibility & Deployment), with all granular issues linked directly to their parent milestone before development commenced.

### B. Project Board
*Provide a screenshot of your GitHub Project Board with your issues organized dynamically across columns (To Do, In Progress, Done).*

![Project Board](evidence/project_board.png)

* **Caption:** The GitHub Project Board demonstrates the active task lifecycle as issues progressed dynamically across `To Do`, `In Progress`, and `Done` columns throughout development sprints.

### C. Branching Architecture
*Provide a screenshot showing your local or remote Git branch list, highlighting your use of conventional, issue-linked naming patterns (e.g., `feat/`, `fix/`, `style/`).*

![Branch List](evidence/branch_architecture.png)

* **Caption:** Git branch list illustrating strict branch isolation. No commits occurred directly on `main`; all work was isolated to feature branches following `feat/[issue-id]-[desc]`, `style/[issue-id]-[desc]`, and `fix/[issue-id]-[desc]`.

### D. Pull Requests & Traceability
*Provide a screenshot of a completed or open Pull Request (PR) on GitHub that clearly shows it is linked to a related development issue.*

![Pull Request](evidence/pr_traceability.png)

* **Caption:** Pull Request #2 demonstrating self-review description, testing checklist, and automatic closure linked to Issue #2.

---

## 5. Merge Conflict Evidence

### Conflict 1 — Full Chronology (Concurrent Line Modification)

**What cause did you use?** Overlapping Line Modification (Concurrent Content Edit) — two branches modified the exact same header lines in `README.md` with conflicting text.

#### Step 1: Generating the Clash
*Screenshot showing the merge attempt and the conflict warning.*

![Conflict 1 Merge Attempt](evidence/conflict_evidence_1_terminal.png)

* **Caption:** Terminal output demonstrating Git's automatic merge abort when attempting to merge `feat/1-hero-tagline` into `main` due to conflicting edits on line 1.

#### Step 2: Inside the Code Editor (Conflict Markers)
*Screenshot showing the raw, unresolved conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) in your editor.*

![Conflict 1 Conflict Markers](evidence/conflict_evidence_1.png)

* **Caption:** Code editor displaying raw Git conflict markers demarcating divergent branch modifications in `README.md`.

#### Step 3: Resolution & Clean Merge
*Screenshot of your clean Git history or completed PR showing the conflict was resolved and merged.*

![Conflict 1 Clean Resolution](evidence/conflict_evidence_1_resolved.png)

* **Caption:** Git graph and commit history confirming a clean two-parent merge commit (`fix(conflict): resolve hero tagline discrepancy in README.md`).

---

### Conflict 2 — Different Cause (Modify vs. Delete Conflict)

**What cause did you use?** Content Modification vs. File Deletion (Modify/Delete Conflict).

**Why does this cause trigger a conflict?** Git cannot automatically determine whether the developer intended to keep the updated modifications introduced in branch `feat/update-config` or to honor the file deletion performed on branch `refactor/remove-legacy-config`.

![Conflict 2 Evidence](evidence/conflict_evidence_2.png)

* **Caption:** Git status indicating `CONFLICT (modify/delete): config.js deleted in HEAD and modified in feat/update-config`.

---

### Conflict 3 — Different Cause (Divergent File Rename Conflict)

**What cause did you use?** Divergent File Rename (Rename/Rename Conflict).

**Why does this cause trigger a conflict?** Both branches originated from a common commit containing `data-store.js`. Branch A renamed the file to `project-data.js`, while Branch B renamed the exact same file to `portfolio-data.js`. Git's 3-way merge cannot programmatically decide which target filename takes precedence.

![Conflict 3 Evidence](evidence/conflict_evidence_3.png)

* **Caption:** Terminal output showing `CONFLICT (rename/rename): data-store.js renamed to project-data.js in HEAD and to portfolio-data.js in feat/rename-portfolio-data`.

---

## 6. Feedback & Evaluation

- [x] **Anonymous Evaluation Form Completed:** [Course & Instructor Evaluation](https://forms.gle/YLybnsyXXErKEg3s9)
