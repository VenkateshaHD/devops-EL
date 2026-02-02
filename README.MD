# Full-Stack DevOps Chat Application

A real-time chat application with complete DevOps automation using Docker, Kubernetes, and Ansible.

## 🚀 Quick Start

### Deploy Entire Stack (Kubernetes)

```bash
cd walter-backend/ansible
ansible-playbook -i inventory master.yaml
```

This single command will:
- Build Docker images for frontend and backend
- Deploy containers locally
- Start Minikube
- Deploy to Kubernetes
- Expose services via NodePort

### Access the Application

**Frontend:**
```bash
minikube service chat-frontend
```
Or visit: `http://192.168.49.2:32484`

**Backend API:**
```bash
minikube service chat-backend --url
```
Or visit: `http://192.168.49.2:30948`

---

## 📦 Local Development

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Access:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5001
- **MongoDB**: localhost:27017

---

## 🏗️ Project Structure

```
devops-EL/
├── walter-frontend/           # React/Vite frontend
│   ├── Dockerfile            # Multi-stage build
│   ├── nginx.conf            # API proxy config
│   ├── deployment.yaml       # K8s deployment
│   └── service.yaml          # K8s service
│
├── walter-backend/           # Node.js/Express backend
│   ├── Dockerfile
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ansible/              # Automation playbooks
│       ├── master.yaml       # Main orchestrator
│       ├── build.yaml        # Backend image build
│       ├── build-frontend.yaml
│       ├── docker-deploy.yaml
│       ├── docker-deploy-frontend.yaml
│       ├── k8s-deploy.yaml   # K8s deployment
│       ├── vars.yaml         # Configuration
│       └── inventory         # Ansible hosts
│
└── docker-compose.yaml       # Local dev stack
```

---

## 🛠️ DevOps Architecture

### Containerization
- **Frontend**: Multi-stage build (Node.js → nginx) = 64.8MB
- **Backend**: Node.js with dependencies = 1.21GB
- **Both**: Optimized with .dockerignore

### Kubernetes Deployment
- **Frontend**: 2 replicas, NodePort service
- **Backend**: 2 replicas, NodePort service
- **High Availability**: Auto-healing, rolling updates

### Ansible Automation
- Infrastructure as Code
- Idempotent playbooks
- Modular task organization

---

## 📋 Available Commands

### Build Docker Images

```bash
# Frontend
cd walter-frontend
docker build -t chat-frontend:1.0 .

# Backend
cd walter-backend
docker build -t chat-backend:1.0 .
```

### Kubernetes Operations

```bash
# View pods
kubectl get pods

# View services
kubectl get svc

# View deployments
kubectl get deployments

# Scale deployment
kubectl scale deployment chat-frontend --replicas=3

# View logs
kubectl logs -f deployment/chat-frontend
```

### Ansible Playbooks

```bash
cd walter-backend/ansible

# Build images only
ansible-playbook -i inventory build.yaml
ansible-playbook -i inventory build-frontend.yaml

# Deploy containers only
ansible-playbook -i inventory docker-deploy.yaml
ansible-playbook -i inventory docker-deploy-frontend.yaml

# K8s deployment only
ansible-playbook -i inventory k8s-deploy.yaml

# Complete deployment
ansible-playbook -i inventory master.yaml
```

---

## 🔧 Configuration

### Frontend Environment Variables

Create `.env` in `walter-frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

### Backend Environment Variables

Configure `.env` in `walter-backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
NODE_ENV=production
# Add other configuration variables
```

### Ansible Variables

Edit `walter-backend/ansible/vars.yaml`:

```yaml
# Backend
image_name: chat-backend
image_tag: "1.0"
container_name: chat-backend
host_port: 5001
container_port: 3000

# Frontend
frontend_image_name: chat-frontend
frontend_image_tag: "1.0"
frontend_container_name: chat-frontend
frontend_host_port: 8080
frontend_container_port: 80
```

---

## 🎯 Features

### Application
- ✅ Real-time messaging with Socket.io
- ✅ User authentication
- ✅ Group chat support
- ✅ Contact management
- ✅ File sharing capabilities

### DevOps
- ✅ Automated Docker builds
- ✅ Multi-stage optimized images
- ✅ Kubernetes orchestration
- ✅ Infrastructure as Code (Ansible)
- ✅ Single-command deployment
- ✅ High availability (2 replicas)
- ✅ Service discovery
- ✅ API proxy and WebSocket support

---

## 📖 Documentation

- **Implementation Plan**: See planning artifacts in `.gemini/antigravity/brain/`
- **Detailed Walkthrough**: Complete deployment documentation available
- **Task Tracking**: Task breakdown and progress tracking

---

## 🤝 Contributing

1. Make your changes
2. Test locally with Docker Compose
3. Deploy to Kubernetes using Ansible
4. Verify all services are running

---

## 📄 License

This project is part of a DevOps college project.

---

## 🙋 Support

For deployment issues:

1. Check pod status: `kubectl get pods`
2. View logs: `kubectl logs -f deployment/chat-frontend`
3. Verify images: `docker images | grep chat-`
4. Check Minikube: `minikube status`

---

**Made with ❤️ using Docker, Kubernetes, and Ansible**
