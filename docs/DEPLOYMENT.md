# Deployment Guide - Vive Code

This guide covers deploying Vive Code to production environments.

## Deployment Options

### 1. Docker Compose (Single Server)

Best for: Small to medium deployments, development staging

**Prerequisites:**
- VPS or cloud server (minimum 4GB RAM, 2 CPU cores)
- Docker and Docker Compose installed
- Domain name pointing to your server

**Steps:**

1. **Clone the repository**
```bash
git clone https://github.com/appbuilder2903/Vive-code.git
cd Vive-code
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with production values
```

3. **Build and start services**
```bash
docker-compose up -d --build
```

4. **Setup Nginx reverse proxy** (create `/etc/nginx/sites-available/vivecode`)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # WebSocket
    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

5. **Enable site and restart Nginx**
```bash
sudo ln -s /etc/nginx/sites-available/vivecode /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 2. Kubernetes (Scalable Production)

Best for: Large-scale deployments, high availability

**Prerequisites:**
- Kubernetes cluster (GKE, EKS, AKS, or self-hosted)
- kubectl configured
- Helm installed

**Steps:**

1. **Create namespace**
```bash
kubectl create namespace vivecode
```

2. **Create secrets**
```bash
kubectl create secret generic vivecode-secrets \
  --from-env-file=.env \
  --namespace=vivecode
```

3. **Deploy with Helm** (create helm chart)
```bash
helm install vivecode ./helm-chart \
  --namespace vivecode \
  --values production-values.yaml
```

4. **Setup ingress**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: vivecode-ingress
  namespace: vivecode
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - vivecode.io
    secretName: vivecode-tls
  rules:
  - host: vivecode.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 3000
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend
            port:
              number: 5000
```

### 3. Cloud Platforms

#### AWS

**Frontend (S3 + CloudFront):**
```bash
# Build frontend
npm run build:frontend

# Upload to S3
aws s3 sync frontend/dist s3://your-bucket-name

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

**Backend (ECS or EKS):**
- Use AWS ECS for simpler deployment
- Use AWS EKS for Kubernetes-based deployment

#### Google Cloud Platform

**Frontend (Cloud Storage + Cloud CDN):**
```bash
# Build and deploy
npm run build:frontend
gsutil rsync -R frontend/dist gs://your-bucket-name
```

**Backend (Cloud Run or GKE):**
```bash
# Build and push image
gcloud builds submit --tag gcr.io/PROJECT_ID/vivecode-backend

# Deploy to Cloud Run
gcloud run deploy vivecode-backend \
  --image gcr.io/PROJECT_ID/vivecode-backend \
  --platform managed
```

#### Azure

**Frontend (Static Web Apps):**
```bash
# Deploy with Azure Static Web Apps
az staticwebapp create \
  --name vivecode-frontend \
  --resource-group vivecode-rg \
  --source frontend \
  --location "East US"
```

**Backend (App Service or AKS):**
```bash
# Deploy to App Service
az webapp up \
  --name vivecode-backend \
  --runtime "NODE:18-lts"
```

### 4. Netlify + Heroku (Quick Deploy)

**Frontend to Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build:frontend
netlify deploy --prod --dir=frontend/dist
```

**Backend to Heroku:**
```bash
# Install Heroku CLI
# Create app
heroku create vivecode-backend

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git subtree push --prefix backend heroku main
```

## Production Configuration

### Environment Variables

Set these in production:

```bash
NODE_ENV=production
PORT=5000
APP_URL=https://your-domain.com
API_URL=https://api.your-domain.com

# Use strong secrets
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Production database
DATABASE_URL=postgresql://user:pass@host:5432/vivecode

# Production Redis
REDIS_URL=redis://host:6379

# OAuth callbacks (production URLs)
GITHUB_CALLBACK_URL=https://api.your-domain.com/auth/github/callback
GOOGLE_CALLBACK_URL=https://api.your-domain.com/auth/google/callback
```

### Database

**Managed Database Services:**
- AWS RDS (PostgreSQL)
- Google Cloud SQL
- Azure Database for PostgreSQL
- DigitalOcean Managed Databases

**Self-Hosted:**
- Use Docker volumes for persistence
- Regular backups
- Replication for high availability

### File Storage

**Options:**
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
- MinIO (self-hosted S3-compatible)

### Caching

**Redis Options:**
- AWS ElastiCache
- Google Cloud Memorystore
- Azure Cache for Redis
- Self-hosted Redis Cluster

## Monitoring & Logging

### Application Monitoring

**Options:**
- New Relic
- Datadog
- AppDynamics
- Prometheus + Grafana

**Setup:**
```bash
npm install newrelic
# Add to backend/src/index.ts
require('newrelic');
```

### Log Aggregation

**Options:**
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Splunk
- Papertrail
- CloudWatch Logs

### Uptime Monitoring

**Tools:**
- UptimeRobot
- Pingdom
- StatusCake
- Custom healthchecks

**Healthcheck endpoint:**
```
GET /health
```

## Backup Strategy

### Database Backups

**Automated backups:**
```bash
# PostgreSQL dump
pg_dump -U user vivecode > backup.sql

# Restore
psql -U user vivecode < backup.sql
```

**Backup schedule:**
- Daily: 7 days retention
- Weekly: 4 weeks retention
- Monthly: 12 months retention

### File Storage Backups

```bash
# S3 backup
aws s3 sync s3://source-bucket s3://backup-bucket

# MinIO backup
mc mirror minio/source-bucket minio/backup-bucket
```

## Security Checklist

- [ ] HTTPS enabled with valid SSL certificate
- [ ] Strong JWT and session secrets
- [ ] Database credentials secured
- [ ] API keys in environment variables
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] Helmet.js security headers
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Regular security updates
- [ ] Firewall configured
- [ ] DDoS protection
- [ ] Regular backups tested

## Scaling

### Horizontal Scaling

**Frontend:**
- CDN for static assets
- Multiple instances behind load balancer

**Backend:**
- Load balancer (Nginx, HAProxy, or cloud LB)
- Multiple backend instances
- Session store in Redis (not in-memory)

**Database:**
- Read replicas
- Connection pooling
- Query optimization

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Database optimization
- Code optimization

### Caching Strategy

- Redis for session storage
- Redis for API response caching
- CDN for static assets
- Browser caching headers

## CI/CD Pipeline

The included GitHub Actions workflow handles:
- Linting
- Testing
- Building
- Deployment to staging/production

**Customize `.github/workflows/ci-cd.yml`** for your deployment target.

## Rollback Strategy

### Docker Compose

```bash
# Tag before deploying
docker-compose build --no-cache
docker tag vivecode_backend:latest vivecode_backend:v1.0.0

# Rollback
docker-compose down
docker tag vivecode_backend:v1.0.0 vivecode_backend:latest
docker-compose up -d
```

### Kubernetes

```bash
# Rollback deployment
kubectl rollout undo deployment/backend -n vivecode

# Check rollout status
kubectl rollout status deployment/backend -n vivecode
```

## Support

For deployment issues:
- 📧 Email: support@vivecode.io
- 💬 GitHub Discussions
- 📚 Documentation

## Performance Optimization

- Enable gzip compression
- Minify assets
- Use CDN for static files
- Implement lazy loading
- Database query optimization
- Redis caching
- Load balancing
- Auto-scaling

---

**Remember:** Always test your deployment in a staging environment before going to production!
