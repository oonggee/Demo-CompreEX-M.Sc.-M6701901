$content = Get-Content 'styles.css' -Raw -Encoding UTF8
$content = $content -replace '--teal: #0D9488;', '--teal: #3B97D3;'
$content = $content -replace '--teal-light: #CCFBF1;', '--teal-light: #DBEAFE;'
$content = $content -replace '--teal-dark: #0F766E;', '--teal-dark: #1D6FA8;'
$content = $content -replace 'rgba\(13, 148, 136,', 'rgba(59, 151, 211,'
$content = $content -replace '#f0fdfa', '#EFF6FF'
$content = $content -replace 'rgba\(13,148,136,', 'rgba(59, 151, 211,'
[System.IO.File]::WriteAllText((Resolve-Path 'styles.css').Path, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done - colors replaced"
