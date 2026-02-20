<# Installer for git hooks (PowerShell)
   Copies files from `githooks` into `.git/hooks` in this repository.
   Run from the repository root using: .\scripts\install-git-hooks.ps1
#>

$repoRoot = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $repoRoot 'githooks'
$destDir = Join-Path $repoRoot '.git\hooks'

if (-not (Test-Path $destDir)) {
    Write-Error ".git/hooks not found. Are you in a git repository?"
    exit 1
}

Get-ChildItem -Path $sourceDir -File | ForEach-Object {
    $dest = Join-Path $destDir $_.Name
    Copy-Item -Path $_.FullName -Destination $dest -Force
    Write-Host "Installed hook:" $_.Name
}

Write-Host "Git hooks installed. Make sure they are executable if using Git Bash."
Write-Host "To remove the block and push to master locally (not recommended), set ALLOW_PUSH_MASTER=1."
