param(
    [switch]$prisma
)

# Definir función para verificar el código de salida
function Verificar-ExitCode {
    param(
        [string]$comando,
        [int]$exitCode
    )

    if ($exitCode -eq 0) {
        Write-Host "$comando ejecutado correctamente"
    } else {
        Write-Host "$comando falló con código de salida: $exitCode"
        exit 1
    }
}

docker-compose down
Verificar-ExitCode "docker-compose down" $LASTEXITCODE

docker-compose up -d
Verificar-ExitCode "docker-compose up -d" $LASTEXITCODE
Start-Sleep 5
if ($prisma) {
    Write-Host "Levantando la base de datos..."
    Start-Sleep -Seconds 3
    npx prisma db pull
    Verificar-ExitCode "npx prisma db pull" $LASTEXITCODE

    npx prisma generate
    Verificar-ExitCode "npx prisma generate" $LASTEXITCODE
}

yarn dev
