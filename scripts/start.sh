#!/usr/bin/env bash

# Detectar OS
OS="$(uname -s)"
echo "Detected OS: $OS"

# Comando de Docker
DOCKER_CMD="docker-compose"

# Usar docker compose moderno si docker-compose no existe
if ! command -v docker-compose >/dev/null 2>&1; then
    if command -v docker >/dev/null 2>&1; then
        DOCKER_CMD="docker compose"
    else
        echo "Error: docker-compose or docker is not installed."
        exit 1
    fi
fi

# Función para levantar docker-compose
start_compose() {
    # En Linux, si no es root, usar sudo
    if [[ "$OS" == "Linux" && $EUID -ne 0 ]]; then
        echo "Running with sudo on Linux..."
        sudo $DOCKER_CMD up -d
    else
        $DOCKER_CMD up -d
    fi
}

# Levantar servicios usando .env automáticamente
start_compose

echo "Services are up! App should be available at the port definido en tu .env"
