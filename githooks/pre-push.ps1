# PowerShell version of the pre-push hook
param()

if ($env:ALLOW_PUSH_MASTER -eq '1') { exit 0 }

$stdin = [Console]::In.ReadToEnd()
if ($stdin) {
    $lines = $stdin -split "`n"
    foreach ($line in $lines) {
        if ($line -match 'refs/heads/master') {
            Write-Error "Pushing to 'master' is blocked by local hook. Create a branch and push that instead."
            Write-Error "To override locally (not recommended): `$env:ALLOW_PUSH_MASTER='1'; git push ..."
            exit 1
        }
    }
}

exit 0
