# Tu comando actual para subir a GitHub
save:
	git add .
	git commit -m "frontend"
	git push

# --- Variables de Despliegue ---
USER = efran18
IMAGE_NAME = kambiape-web
IMAGE = $(USER)/$(IMAGE_NAME):latest

# --- Variables del Servidor ---
VPS_USER = administrator
VPS_HOST = 83.147.39.44
COMPOSE_FILE = /home/administrator/docker-compose.yml

# --- Tareas de Despliegue ---

# 1. Construye la imagen de Docker (¡CON LA CORRECCIÓN --no-cache!)
build:
	@echo "--- 1. Construyendo nueva imagen (SIN CACHÉ) para leer el .env.production ---"
	docker build --no-cache -t $(IMAGE) .
	@echo "--- 1. Construcción de imagen FINALIZADA ---"

# 2. Sube la imagen a Docker Hub
push:
	@echo "--- 2. Subiendo imagen a Docker Hub ---"
	docker push $(IMAGE)
	@echo "--- 2. Subida a Docker Hub FINALIZADA ---"

# 3. Se conecta al VPS y actualiza el contenedor
update-vps:
	@echo "--- 3. Conectando al VPS y actualizando servicio 'frontend' ---"
	ssh $(VPS_USER)@$(VPS_HOST) "docker-compose -f $(COMPOSE_FILE) pull frontend && docker-compose -f $(COMPOSE_FILE) rm --stop -f frontend && docker-compose -f $(COMPOSE_FILE) up -d"
	@echo "--- 3. Proceso en VPS FINALIZADO ---"

# 4. ¡EL COMANDO MÁGICO!
# Este comando hace los 3 pasos anteriores en orden.
deploy: build push update-vps