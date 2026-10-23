# Generates an original static PNG using Windows' built-in drawing library.
# Run again after changing the public metadata text below.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$portfolioImage = New-Object System.Drawing.Bitmap(1200, 630)
$portfolioCanvas = [System.Drawing.Graphics]::FromImage($portfolioImage)
$portfolioCanvas.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$portfolioCanvas.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$portfolioCanvas.Clear([System.Drawing.ColorTranslator]::FromHtml('#090d15'))
$portfolioBorder = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#25303e'), 1)
$portfolioAccent = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#7de9dd'))
$portfolioWhite = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#edf1f4'))
$portfolioMuted = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#a0acbb'))
$portfolioLabel = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$portfolioHeadline = New-Object System.Drawing.Font('Segoe UI', 62, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$portfolioCanvas.DrawRectangle($portfolioBorder, 70, 90, 1060, 450)
$portfolioCanvas.DrawEllipse($portfolioBorder, 880, 185, 260, 260)
$portfolioCanvas.DrawEllipse($portfolioBorder, 920, 225, 180, 180)
$portfolioCanvas.FillRectangle($portfolioAccent, 100, 144, 32, 2)
$portfolioCanvas.DrawString('MAHDI / FRONTEND DEVELOPER', $portfolioLabel, $portfolioMuted, 151, 133)
$portfolioCanvas.DrawString('Thoughtful interfaces.', $portfolioHeadline, $portfolioWhite, 95, 220)
$portfolioCanvas.DrawString('Purposeful interactions.', $portfolioHeadline, $portfolioAccent, 95, 306)
$portfolioCanvas.DrawString('REACT + TYPESCRIPT', $portfolioLabel, $portfolioMuted, 100, 463)
$portfolioImage.Save((Join-Path (Split-Path -Parent $PSScriptRoot) 'public/social-preview.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$portfolioCanvas.Dispose()
$portfolioImage.Dispose()
$portfolioBorder.Dispose()
$portfolioAccent.Dispose()
$portfolioWhite.Dispose()
$portfolioMuted.Dispose()
$portfolioLabel.Dispose()
$portfolioHeadline.Dispose()
