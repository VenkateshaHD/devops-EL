Write-Host "Starting Walter Backend..."
Start-Process npm -ArgumentList "run dev" -WorkingDirectory "walter-backend"

Write-Host "Starting Walter Frontend..."
Start-Process npm -ArgumentList "run dev" -WorkingDirectory "walter-frontend"

Write-Host "Services launched in new windows."
