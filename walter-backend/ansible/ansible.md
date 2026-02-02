# Ansible Automation Guide for Chat Backend Project

This document provides step-by-step instructions to run and manage the project using **Ansible automation commands only**.

---

## Prerequisites

Before using Ansible automation, make sure the following are installed on your system:

- Docker  
- Kubernetes (Minikube or Docker Desktop Kubernetes)  
- Ansible  

### Check Ansible Installation

Run the following command to verify Ansible:

ansible --version

---

## Project Structure (Relevant to Ansible)

project/
│
├── backend/ 

├── deployment.yaml
├── .env
└── ansible/
├── inventory
├── vars.yml
├── build.yml
├── docker-deploy.yml
├── restart.yml
└── k8s-deploy.yml


---

## How to Use Ansible Automation

# Step 1 – Navigate to Ansible Directory

Move into the ansible folder:

## #cd ansible

---

# Step 2 – Build Docker Image

This command builds the Docker image for the backend automatically:

## #ansible-playbook -i inventory build.yml

---

# Step 3 – Deploy Backend Container

This command runs the Docker container using environment variables from the `.env` file:

## #ansible-playbook -i inventory docker-deploy.yml

After successful execution, open the application in the browser:

http://localhost:5001



---

# Step 4 – Restart Application (If Environment Variables Change)

If any values inside `.env` are modified, restart the container using:

## #ansible-playbook restart.yml



---

# Step 5 – Deploy to Kubernetes Using Ansible

To deploy the application in the Kubernetes cluster:

## #ansible-playbook -i inventory k8s-deploy.yml

---

## Complete Workflow Commands

To run the full automation process in order:

## #ansible-playbook -i inventory build.yaml
## #ansible-playbook -i inventory docker-deploy.yaml
## #ansible-playbook -i inventory k8s-deploy.yaml



---

## Verify Application Status

# Check Running Docker Containers

## #docker ps



# Check Kubernetes Pods

## #kubectl get pods



---

## Optional Commands

### Stop Running Backend Container

## #docker stop chat-backend



### Remove Running Container

## #docker rm chat-backend


---

## Summary

Using Ansible, the following tasks are fully automated:

- Building Docker images  
- Running containers with environment variables  
- Restarting application  
- Deploying Kubernetes configurations  

This eliminates manual DevOps commands and demonstrates Infrastructure as Code in the project.

---

### End of Guide





### kubectl delete deployment chat-backend

### kubectl delete service chat-backend





--------------------------------------------------------------------------------------------------



### NOW YOUR ENTIRE PROJECT RUNS WITH ONE COMMAND

From ansible folder:

## ansible-playbook -i inventory master.yaml


# Access URL Automation

## minikube service chat-backend --url



to stop 

# Stop app only
kubectl scale deployment chat-backend --replicas=0

# Stop cluster
minikube stop

# Delete everything
minikube delete


