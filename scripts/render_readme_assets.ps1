$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $bitmap = New-Object System.Drawing.Bitmap 1440, 900
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(90, 103, 224, 190), 3)

  $graphics.FillRectangle($panelBrush, 45, 45, 1350, 810)
  $graphics.DrawRectangle($borderPen, 45, 45, 1350, 810)

  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontTitle = New-Object System.Drawing.Font("Georgia", 32, [System.Drawing.FontStyle]::Bold)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $graphics.DrawString("Board Decision Bottleneck Heatmap", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $textBrush, [System.Drawing.RectangleF]::new(70, 150, 1220, 170))
  $graphics.DrawString($Subtitle, $fontBody, $mutedBrush, [System.Drawing.RectangleF]::new(70, 315, 1240, 100))

  $y = 430
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 86, $y + 10, 10, 10)
    $graphics.DrawString($bullet, $fontBody, $textBrush, [System.Drawing.RectangleF]::new(110, $y, 1220, 70))
    $y += 78
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 780)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Board-visible bottlenecks stay explicit before drag turns into another vague execution complaint" -Subtitle "This heatmap exposes queue drag, handoff pressure, owner overload, freshness drift, and latency in one board-facing surface." -Bullets @(
  "Which lanes are hot enough to justify immediate intervention before another review cycle compounds delay.",
  "Where queue drag, handoff churn, owner concentration, or threshold ambiguity are really clustering.",
  "What should be collapsed, reassigned, standardized, or bound to one threshold next."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-bottleneck-register-proof.png") -Title "Bottleneck register keeps each lane, owner, audience, and heat tier attached" -Subtitle "Every lane retains the hotspot theme, accountable owner, board audience, and immediate next move." -Bullets @(
  "Each lane stays connected to one owner and one board-facing audience.",
  "Heat is visible before it turns into another generic status update.",
  "The next corrective move stays next to the lane instead of disappearing into a separate memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-hotspot-clusters-proof.png") -Title "Hotspot clusters show where queue drag, handoff churn, and latency are actually accumulating" -Subtitle "The dominant bottleneck stays visible so leadership can fix the right operating failure first." -Bullets @(
  "The blocking issue is explicit instead of implied.",
  "Review drag, handoff pressure, and latency stay readable at a glance.",
  "Each lane ties to a concrete intervention instead of a generic operating complaint."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-owner-concentration-proof.png") -Title "Owner concentration keeps the real choke points grounded in one operating view" -Subtitle "The same surface shows where one owner or lane is carrying too much final decision weight." -Bullets @(
  "Owner concentration is visible before it becomes another overloaded review lane.",
  "Backup ownership and load-distribution gaps stay tied to the same board packet.",
  "Boards and operators can see which ownership reset should move first."
)
