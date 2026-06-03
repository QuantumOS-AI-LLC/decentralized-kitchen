# Ghost Kitchens in Action (GKIA) - PowerShell Backend Server
# Runs natively on Windows using .NET HttpListener

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "GKIA PowerShell Backend Server started on http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Yellow

# In-Memory Database State
$state = [ordered]@{
    todaySales = 602.00
    activeCooksCount = 2
    activeRoachCoachesCount = 3
    cooks = @(
        [ordered]@{ id = 'cook-1'; name = "Maria Sanchez"; location = "Maryvale, Phoenix"; rating = 4.9; activeBatch = 120; status = "active" },
        [ordered]@{ id = 'cook-2'; name = "Elena Rodriguez"; location = "South Phoenix"; rating = 4.8; activeBatch = 0; status = "pending" },
        [ordered]@{ id = 'cook-3'; name = "Juana Martinez"; location = "Glendale, AZ"; rating = 4.9; activeBatch = 80; status = "active" }
    )
    mobileKitchens = @(
        [ordered]@{ id = 'truck-1'; name = "Antojitos El Sol"; contact = "Jose L."; stock = 45; status = "active" },
        [ordered]@{ id = 'truck-2'; name = "Phoenix Taco Express"; contact = "Mateo R."; stock = 12; status = "active" },
        [ordered]@{ id = 'truck-3'; name = "Tamales Don Lupe"; contact = "Lupe H."; stock = 80; status = "active" }
    )
    drivers = @(
        [ordered]@{ id = 'driver-1'; name = "Carlos Perez"; status = "delivering"; vehicle = "Honda Civic" },
        [ordered]@{ id = 'driver-2'; name = "Miguel Torres"; status = "idle"; vehicle = "Toyota Prius" },
        [ordered]@{ id = 'driver-3'; name = "Sofia Gomez"; status = "offline"; vehicle = "E-Bike" }
    )
    orders = @(
        [ordered]@{ id = 'G-1004'; customer = "Roberto D."; destination = "Desert Diamond Casino Parking Lot"; source = "Uber Eats"; items = "12x Pork Red Tamales"; total = 84.00; status = "pending" },
        [ordered]@{ id = 'G-1003'; customer = "Sandra L."; destination = "Maryvale Residential"; source = "Instacart"; items = "24x Sweet Corn Tamales"; total = 168.00; status = "completed" },
        [ordered]@{ id = 'G-1002'; customer = "Casino Arizona Lounge"; destination = "Loop 101 & McKellips"; source = "GKIA App"; items = "50x Beef Green Tamales"; total = 350.00; status = "completed" }
    )
}

# Load pre-defined Claude responses from data.json to prevent encoding issues
$dataPath = Join-Path $PSScriptRoot "data.json"
if (Test-Path $dataPath) {
    $data = Get-Content -Path $dataPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $aiExpertResponses = $data.aiExpertResponses
} else {
    $aiExpertResponses = [ordered]@{
        casinos = "Casino strategy info"
        ads = "Ad copies"
        quality = "Quality standards"
        pricing = "Pricing info"
    }
}

# Main event loop
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $url = $request.RawUrl
        $method = $request.HttpMethod

        # CORS Headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")

        if ($method -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }

        # API ROUTES
        if ($url -eq "/api/state" -and $method -eq "GET") {
            $json = ConvertTo-Json -InputObject $state -Depth 4
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        elseif ($url -eq "/api/orders/dispatch" -and $method -eq "POST") {
            $pendingOrder = $state.orders | Where-Object { $_.status -eq 'pending' } | Select-Object -First 1
            $idleDriver = $state.drivers | Where-Object { $_.status -eq 'idle' } | Select-Object -First 1
            
            $res = [ordered]@{ success = $false; message = "No pending orders or idle drivers available." }
            
            if ($null -ne $pendingOrder -and $null -ne $idleDriver) {
                $pendingOrder.status = 'delivering'
                $idleDriver.status = 'delivering'
                $res.success = $true
                $res.message = "Driver $($idleDriver.name) dispatched for Order $($pendingOrder.id)!"
            }
            
            $json = ConvertTo-Json $res
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        elseif ($url -eq "/api/cooks/batch" -and $method -eq "POST") {
            $targetCook = $state.cooks | Where-Object { $_.activeBatch -eq 0 -and $_.status -eq 'active' } | Select-Object -First 1
            
            if ($null -eq $targetCook) {
                $targetCook = $state.cooks | Where-Object { $_.status -eq 'pending' } | Select-Object -First 1
            }
            
            $res = [ordered]@{ success = $false; message = "All cooks are currently cooking at max capacity." }
            
            if ($null -ne $targetCook) {
                $targetCook.status = 'active'
                $targetCook.activeBatch = 100
                $state.activeCooksCount = ($state.cooks | Where-Object { $_.status -eq 'active' }).Count
                $res.success = $true
                $res.message = "Assigned a new batch of 100 tamales to $($targetCook.name)."
            }
            
            $json = ConvertTo-Json $res
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        elseif ($url -eq "/api/kitchens/restock" -and $method -eq "POST") {
            $sortedTrucks = $state.mobileKitchens | Sort-Object stock
            $targetTruck = $sortedTrucks[0]
            
            $res = [ordered]@{ success = $false; message = "No trucks online." }
            
            if ($null -ne $targetTruck) {
                $targetTruck.stock += 50
                $res.success = $true
                $res.message = "Restocked $($targetTruck.name) with 50 fresh tamales."
            }
            
            $json = ConvertTo-Json $res
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        elseif ($url -eq "/api/orders/new" -and $method -eq "POST") {
            $names = @("Arthur M.", "Lucia G.", "Juan C.", "Phoenix Hotel", "Casino Guest", "Diana R.")
            $destinations = @("Casino Arizona Valet", "Tempe Marketplace", "Old Town Scottsdale", "Downtown Phoenix Office", "Maryvale District")
            $products = @("6x Beef Red Tamales", "12x Chicken Green Tamales", "12x Cheese Jalapeno Tamales", "24x Fiesta Mix Pack")
            $prices = @(42.00, 84.00, 84.00, 168.00)
            $sources = @("Uber Eats", "Grubhub", "GKIA App")
            
            $rand = New-Object System.Random
            $idx = $rand.Next(0, $names.Length)
            $pIdx = $rand.Next(0, $products.Length)
            $orderId = "G-$(1005 + $state.orders.Length)"
            
            $newOrder = [ordered]@{
                id = $orderId
                customer = $names[$idx]
                destination = $destinations[$rand.Next(0, $destinations.Length)]
                source = $sources[$rand.Next(0, $sources.Length)]
                items = $products[$pIdx]
                total = $prices[$pIdx]
                status = "pending"
            }
            
            $state.orders = @($newOrder) + $state.orders
            $state.todaySales += $newOrder.total
            
            $res = [ordered]@{ success = $true; message = "New order $orderId received via $($newOrder.source)!"; order = $newOrder }
            $json = ConvertTo-Json $res
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        elseif ($url.StartsWith("/api/chat") -and $method -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream)
            $bodyText = $reader.ReadToEnd()
            $body = ConvertFrom-Json $bodyText
            $prompt = $body.prompt.ToLower()
            
            $reply = ""
            if ($prompt.Contains("cook") -or $prompt.Contains("driver") -or $prompt.Contains("sales") -or $prompt.Contains("status") -or $prompt.Contains("stats") -or $prompt.Contains("revenue") -or $prompt.Contains("metric")) {
                $activeCooks = ($state.cooks | Where-Object { $_.status -eq 'active' }).Count
                $idleDrivers = ($state.drivers | Where-Object { $_.status -eq 'idle' }).Count
                $pendingOrders = ($state.orders | Where-Object { $_.status -eq 'pending' }).Count
                $totalToday = $state.todaySales
                
                $reply = "### GKIA Live Database Assistant`n`nHere is a summary of the current backend metrics on your **MacBook Pro M5** environment:`n`n"
                $reply += "*   **Today's Revenue**: `$($totalToday.ToString('F2')) USD` (Dynamic state)`n"
                $reply += "*   **Active Cooks**: $activeCooks cooks cooking batches`n"
                $reply += "*   **Pending Orders**: $pendingOrders orders waiting for dispatch`n"
                $reply += "*   **Available Drivers**: $idleDrivers idle drivers`n`n"
                $reply += "You can dispatch drivers, order new cook batches, or restock mobile kitchens in the **CRM Dashboard** and I will analyze the metrics in real time!"
            }
            elseif ($prompt.Contains("casino") -or $prompt.Contains("phoenix") -or $prompt.Contains("night") -or $prompt.Contains("late")) {
                $reply = $aiExpertResponses.casinos
            }
            elseif ($prompt.Contains("ad") -or $prompt.Contains("anuncio") -or $prompt.Contains("facebook") -or $prompt.Contains("marketing")) {
                $reply = $aiExpertResponses.ads
            }
            elseif ($prompt.Contains("quality") -or $prompt.Contains("checklist") -or $prompt.Contains("calidad") -or $prompt.Contains("hygiene")) {
                $reply = $aiExpertResponses.quality
            }
            elseif ($prompt.Contains("price") -or $prompt.Contains("cost") -or $prompt.Contains("option") -or $prompt.Contains("wholesale") -or $prompt.Contains("margin")) {
                $reply = $aiExpertResponses.pricing
            }
            else {
                $reply = "### GKIA Co-worker Consulting Assistant`n`nThanks for your query! As your Claude AI Co-worker, here is a general action plan:`n`n"
                $reply += "1. **Verify your margins**: We are targeting a low entry price of `$10k USD`. Make sure you utilize the **ROI Calculator** tab to test your numbers.`n"
                $reply += "2. **Review your Spanish collateral**: Check the **Marketing Kit** tab to find ready-to-use Facebook Ads and SMS sequences.`n"
                $reply += "3. **Dispatch Orders**: Go to the **CRM Dashboard** to monitor current sales, dispatch drivers (like Carlos Perez), and restock trucks.`n`n"
                $reply += "Let me know if you want me to write specific SMS messages, review health codes, or map out Glendale night routes!"
            }
            
            $res = [ordered]@{ reply = $reply }
            $json = ConvertTo-Json $res
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentType = "application/json; charset=utf-8"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        else {
            $fileName = $url.Split('?')[0]
            if ($fileName -eq "/") { $fileName = "/index.html" }
            $filePath = Join-Path $PSScriptRoot $fileName
            
            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath)
                $contentType = "text/html; charset=utf-8"
                if ($ext -eq ".css") { $contentType = "text/css" }
                elseif ($ext -eq ".js") { $contentType = "application/javascript" }
                elseif ($ext -eq ".webp") { $contentType = "image/webp" }
                
                $buffer = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $contentType
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $response.StatusCode = 404
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $fileName")
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        }
        $response.Close()
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}
