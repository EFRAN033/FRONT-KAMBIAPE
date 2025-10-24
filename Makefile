# Tu comando actual para subir a GitHub
save:
	git add .
	git commit -m "frontend"
	git push

# --- AÑADE TODO ESTO DEBAJO ---

# --- Variables de Despliegue (NUEVO) ---
USER = efran18
IMAGE_NAME = kambiape-web
IMAGE = $(USER)/$(IMAGE_NAME):latest

# --- Variables del Servidor (NUEVO) ---
VPS_USER = administrator
VPS_HOST = 83.147.39.44
COMPOSE_FILE = /home/administrator/docker-compose.yml

# --- Tareas de Despliegue (NUEVO) ---

# 1. Construye la imagen de Docker
build:
	docker build -t $(IMAGE) .

# 2. Sube la imagen a Docker Hub
push:
	docker push $(IMAGE)

# 3. Se conecta al VPS y actualiza el contenedor
update-vps:
	ssh $(VPS_USER)@$(VPS_HOST) "docker-compose -f $(COMPOSE_FILE) pull frontend && docker-compose -f $(COMPOSE_FILE) rm --stop -f frontend && docker-compose -f $(COMPOSE_FILE) up -d"

# 4. ¡EL COMANDO MÁGICO!
# Este comando hace los 3 pasos anteriores en orden.
deploy: build push update-vps