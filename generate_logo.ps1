# PowerShell script to generate PRESTIGE HOME IMPROVEMENTS logo
Add-Type -AssemblyName System.Drawing

# Create a 400x400 bitmap
$bitmap = New-Object System.Drawing.Bitmap(400, 400)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Set high quality rendering
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# Colors
$darkBlue = [System.Drawing.Color]::FromArgb(0, 51, 102)
$brightRed = [System.Drawing.Color]::FromArgb(220, 20, 60)
$gray = [System.Drawing.Color]::FromArgb(128, 128, 128)
$lightBlue = [System.Drawing.Color]::FromArgb(100, 150, 200)
$black = [System.Drawing.Color]::Black

# Fill background
$graphics.Clear($black)

# Center coordinates
$centerX = 200
$centerY = 200

# Draw house roof icon
$roofTopY = $centerY - 100
$roofBottomY = $centerY - 20
$roofWidth = 120
$roofLeft = $centerX - $roofWidth / 2
$roofRight = $centerX + $roofWidth / 2

# Create pens and brushes
$bluePen = New-Object System.Drawing.Pen($darkBlue, 8)
$bluePen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$bluePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$bluePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round

$grayPen = New-Object System.Drawing.Pen($gray, 3)
$redBrush = New-Object System.Drawing.SolidBrush($brightRed)

# Draw roof outline (dark blue)
# Left wall
$graphics.DrawLine($bluePen, $roofLeft, $roofTopY, $roofLeft, $roofBottomY)
# Right wall
$graphics.DrawLine($bluePen, $roofRight, $roofTopY, $roofRight, $roofBottomY)
# Roof top (inverted V)
$graphics.DrawLine($bluePen, $roofLeft, $roofTopY, $centerX, $roofTopY - 30)
$graphics.DrawLine($bluePen, $centerX, $roofTopY - 30, $roofRight, $roofTopY)

# Draw red triangle inside roof
$roofPoints = @(
    [System.Drawing.Point]::new([int]$roofLeft + 4, [int]$roofTopY + 4),
    [System.Drawing.Point]::new([int]$centerX, [int]$roofTopY - 26),
    [System.Drawing.Point]::new([int]$roofRight - 4, [int]$roofTopY + 4)
)
$graphics.FillPolygon($redBrush, $roofPoints)

# Draw gray horizontal line
$graphics.DrawLine($grayPen, $roofLeft, $centerY + 10, $roofRight, $centerY + 10)

# Draw "PRESTIGE" text with 3D effect
$prestigeFont = New-Object System.Drawing.Font("Arial", 42, [System.Drawing.FontStyle]::Bold)
$prestigeText = "PRESTIGE"
$textY = $centerY + 30

# Measure text
$textSize = $graphics.MeasureString($prestigeText, $prestigeFont)
$textX = $centerX - $textSize.Width / 2

# Draw 3D effect - lighter blue text slightly offset
$lightBlueBrush = New-Object System.Drawing.SolidBrush($lightBlue)
$graphics.DrawString($prestigeText, $prestigeFont, $lightBlueBrush, $textX + 2, $textY + 2)

# Draw main dark blue text
$darkBlueBrush = New-Object System.Drawing.SolidBrush($darkBlue)
$graphics.DrawString($prestigeText, $prestigeFont, $darkBlueBrush, $textX, $textY)

# Draw "HOME IMPROVEMENTS" text
$homeFont = New-Object System.Drawing.Font("Arial", 18, [System.Drawing.FontStyle]::Regular)
$homeText = "HOME IMPROVEMENTS"
$homeY = $centerY + 80

$homeTextSize = $graphics.MeasureString($homeText, $homeFont)
$homeTextX = $centerX - $homeTextSize.Width / 2
$graphics.DrawString($homeText, $homeFont, $darkBlueBrush, $homeTextX, $homeY)

# Save the image
$outputPath = "images\prestige_logo_facebook.png"
if (-not (Test-Path "images")) {
    New-Item -ItemType Directory -Path "images" | Out-Null
}
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Clean up
$graphics.Dispose()
$bitmap.Dispose()
$bluePen.Dispose()
$grayPen.Dispose()
$redBrush.Dispose()
$lightBlueBrush.Dispose()
$darkBlueBrush.Dispose()
$prestigeFont.Dispose()
$homeFont.Dispose()

Write-Host "Logo saved to $outputPath" -ForegroundColor Green

