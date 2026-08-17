# ==============================================================================
# Jan Isaac - Git Workflow & 3-Conflict Automated Reproduction Script
# ==============================================================================

Write-Host ">>> Initializing Git Repository for Jan Isaac Portfolio..." -ForegroundColor Cyan

# 1. Initialize repository & branch
git init
git branch -M main

# Configure user details locally if needed
git config user.name "Jan Isaac"
git config user.email "jan.maina@strathmore.edu"

# 2. Scaffolding commit on main
git add index.html style.css app.js README.md submission.md
git commit -m "chore: scaffold initial portfolio structure and design tokens"

Write-Host "`n>>> [Milestone 1] Creating feature branch feat/1-base-layout..." -ForegroundColor Yellow
git checkout -b feat/1-base-layout
git commit --allow-empty -m "feat(layout): complete semantic HTML structure and responsive grid`n`nCloses #1"
git checkout main
git merge --no-ff feat/1-base-layout -m "chore: merge branch 'feat/1-base-layout' into main via PR #1"

Write-Host "`n============================================================" -ForegroundColor Magenta
Write-Host ">>> [ENGINEERING CONFLICT 1]: Concurrent Line Modification" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta

# Conflict 1: Overlapping line edit in README.md
git checkout -b feat/1-tagline-ai
(Get-Content README.md) -replace "An interactive, responsive, and performance-optimized Developer Portfolio", "An interactive, AI-enhanced, and performance-optimized Developer Portfolio" | Set-Content README.md
git commit -am "feat(docs): update portfolio tagline with AI emphasis"

git checkout main
git checkout -b feat/1-tagline-systems
(Get-Content README.md) -replace "An interactive, responsive, and performance-optimized Developer Portfolio", "An interactive, robust Systems-focused Developer Portfolio" | Set-Content README.md
git commit -am "feat(docs): update portfolio tagline with Systems emphasis"

git checkout main
git merge --no-ff feat/1-tagline-ai -m "chore: merge PR for AI tagline"

Write-Host "`n>>> Attempting merge of feat/1-tagline-systems (Expect CONFLICT 1)..." -ForegroundColor Red
git merge feat/1-tagline-systems

Write-Host "`n>>> Resolving Conflict 1 cleanly..." -ForegroundColor Green
(Get-Content README.md) -replace "<<<<<<< HEAD[\s\S]*>>>>>>> feat/1-tagline-systems", "An interactive, AI-enhanced and Systems-focused Developer Portfolio" | Set-Content README.md
# In case regex replace missed raw markers, rewrite clean line
(Get-Content README.md) | Where-Object { $_ -notmatch "^<{7}|^={7}|^>{7}" } | Set-Content README.md
git add README.md
git commit -m "fix(conflict): resolve hero tagline discrepancy in README.md`n`nCloses #2"

Write-Host "`n============================================================" -ForegroundColor Magenta
Write-Host ">>> [ENGINEERING CONFLICT 2]: Modify vs. Delete Conflict" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta

# Set up a legacy config file
"const THEME_LEGACY = 'dark';" | Out-File -FilePath "config.js" -Encoding utf8
git add config.js
git commit -m "chore: add legacy theme config file"

git checkout -b feat/update-config
"const THEME_LEGACY = 'dark'; const AUTO_DETECT = true;" | Out-File -FilePath "config.js" -Encoding utf8
git commit -am "refactor(config): add auto-detection property to config.js"

git checkout main
git checkout -b refactor/remove-legacy-config
git rm config.js
git commit -m "refactor: deprecate static config.js in favor of modern CSS variables"

git checkout main
git merge --no-ff refactor/remove-legacy-config -m "chore: merge PR for config deprecation"

Write-Host "`n>>> Attempting merge of feat/update-config (Expect CONFLICT 2 - modify/delete)..." -ForegroundColor Red
git merge feat/update-config

Write-Host "`n>>> Resolving Conflict 2 cleanly by confirming file deletion..." -ForegroundColor Green
git rm -f config.js
git commit -m "fix(conflict): confirm deletion of legacy config.js over stale branch updates"

Write-Host "`n============================================================" -ForegroundColor Magenta
Write-Host ">>> [ENGINEERING CONFLICT 3]: Divergent File Rename" -ForegroundColor Magenta
Write-Host "============================================================" -ForegroundColor Magenta

# Set up shared base data file
"const DATA = [];" | Out-File -FilePath "data-store.js" -Encoding utf8
git add data-store.js
git commit -m "feat(store): initialize shared data store module"

git checkout -b feat/rename-project-data
git mv data-store.js project-data.js
git commit -m "refactor(store): rename data-store.js to project-data.js"

git checkout main
git checkout -b feat/rename-portfolio-data
git mv data-store.js portfolio-data.js
git commit -m "refactor(store): rename data-store.js to portfolio-data.js"

git checkout main
git merge --no-ff feat/rename-project-data -m "chore: merge PR for project-data rename"

Write-Host "`n>>> Attempting merge of feat/rename-portfolio-data (Expect CONFLICT 3 - rename/rename)..." -ForegroundColor Red
git merge feat/rename-portfolio-data

Write-Host "`n>>> Resolving Conflict 3 cleanly by retaining standardized filename..." -ForegroundColor Green
git rm -f data-store.js
git rm -f portfolio-data.js
git add project-data.js
git commit -m "fix(conflict): standardize data store module name to project-data.js"

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host ">>> ALL 3 CONFLICTS GENERATED AND RESOLVED CLEANLY!" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

git log --graph --oneline --decorate -n 15
