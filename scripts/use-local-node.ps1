# Dot-source from any directory: . ./scripts/use-local-node.ps1
# Downloads only from nodejs.org; never modifies the system installation.
$ErrorActionPreference = 'Stop'
$portfolioRoot = Split-Path -Parent $PSScriptRoot
$portfolioTools = Join-Path $portfolioRoot '.tools'
$portfolioRuntime = Get-ChildItem -LiteralPath $portfolioTools -Directory -Filter 'node-v24.*-win-x64' -ErrorAction SilentlyContinue |
    Sort-Object Name -Descending | Select-Object -First 1
if (-not $portfolioRuntime) {
    $portfolioChecksums = (Invoke-WebRequest -Uri 'https://nodejs.org/dist/latest-v24.x/SHASUMS256.txt' -UseBasicParsing).Content
    $portfolioEntry = ($portfolioChecksums -split "`n" | Where-Object { $_ -match 'node-v24\.[0-9]+\.[0-9]+-win-x64\.zip$' } | Select-Object -First 1).Trim()
    if (-not $portfolioEntry) { throw 'Official Node 24 Windows x64 checksum not found.' }
    $portfolioParts = $portfolioEntry -split '\s+'
    New-Item -ItemType Directory -Path $portfolioTools -Force | Out-Null
    $portfolioArchive = Join-Path $portfolioTools $portfolioParts[1]
    Invoke-WebRequest -Uri "https://nodejs.org/dist/latest-v24.x/$($portfolioParts[1])" -OutFile $portfolioArchive -UseBasicParsing
    if ((Get-FileHash -LiteralPath $portfolioArchive -Algorithm SHA256).Hash -ne $portfolioParts[0]) {
        throw 'Node download failed SHA256 verification; the archive will not be extracted.'
    }
    Expand-Archive -LiteralPath $portfolioArchive -DestinationPath $portfolioTools -Force
    $portfolioRuntime = Get-Item -LiteralPath (Join-Path $portfolioTools ($portfolioParts[1] -replace '\.zip$', ''))
}
$env:Path = "$($portfolioRuntime.FullName);$env:Path"
node --version
npm --version
