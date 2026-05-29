# Pure PowerShell Local HTTP Server
# Serves static files from the Kaivora workspace on http://localhost:8000/

$port = 8000
$workspace = "d:\kaivora website"

# Enable console coloring
$Host.UI.RawUI.ForegroundColor = "Cyan"

Write-Host "Initializing Native PowerShell HTTP Server..."
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "============================================="
    Write-Host "  KAIVORA LOCAL SERVER ONLINE                "
    Write-Host "  URL: http://localhost:$port/               "
    Write-Host "  Root: $workspace                           "
    Write-Host "  Press Ctrl+C in terminal to stop server   "
    Write-Host "============================================="
} catch {
    Write-Host "Error starting server: $_"
    exit 1
}

# Serve requests loop
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") {
            $localPath = "/index.html"
        }
        
        # Remove leading slash and combine path
        $relPath = $localPath.TrimStart('/')
        $filePath = Join-Path $workspace $relPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Content Type mappings
            if ($filePath -like "*.html") { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath -like "*.css") { $response.ContentType = "text/css; charset=utf-8" }
            elseif ($filePath -like "*.js") { $response.ContentType = "application/javascript; charset=utf-8" }
            elseif ($filePath -like "*.svg") { $response.ContentType = "image/svg+xml" }
            elseif ($filePath -like "*.png") { $response.ContentType = "image/png" }
            elseif ($filePath -like "*.jpg" -or $filePath -like "*.jpeg") { $response.ContentType = "image/jpeg" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>File $localPath was not found in the workspace.</p>")
            $response.ContentType = "text/html; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $response.Close()
    } catch {
        # Catch connection resets or cancelled requests silently
    }
}
