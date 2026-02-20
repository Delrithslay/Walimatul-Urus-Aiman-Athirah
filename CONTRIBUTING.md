Branching workflow
------------------

Workflow (short):
- Do all development on branches created from `develop` (feature/*, fix/*, chore/*).
- Open PRs to merge into `develop` and test there.
- Only merge to `master` via a release process (protected branch).

Quick commands

- Create a branch: `git checkout -b feature/my-change develop`
- Push branch: `git push -u origin feature/my-change`
- Open PR to `develop` on GitHub.

Install client git hooks (recommended)

Run the included PowerShell installer to copy the repo hooks into your local `.git/hooks` folder:

```powershell
.\scripts\install-git-hooks.ps1
```

The included pre-push hook blocks accidental pushes to `master` on your machine. To override locally (not recommended) set the environment variable `ALLOW_PUSH_MASTER=1` before pushing.

Notes for repo admins

- To fully protect `master`, enable branch protection rules on GitHub so `master` requires PRs and cannot be force-pushed.
- I can help set that up if you provide access or a GitHub token.

Terjemahan ringkas (Malay):
- Semua coding dibuat di cawangan (`develop`), bukan `master`.
- Pasang hooks dan ikut aliran kerja cawangan.
