$content = Get-Content 'index.html' -Raw -Encoding UTF8
$content = $content -replace '#0D9488', '#3B97D3'
$content = $content -replace '#CFFDE1', '#DBEAFE'
$content = $content -replace 'rgba\(13,148,136,', 'rgba(59, 151, 211,'
$content = $content -replace 'rgba\(13, 148, 136,', 'rgba(59, 151, 211,'
[System.IO.File]::WriteAllText((Resolve-Path 'index.html').Path, $content, [System.Text.Encoding]::UTF8)
Write-Host "HTML Done"
