# Deployment Guide for Secure QR Generator React App

## 🚀 Building for Production

```bash
# Install dependencies
npm ci

# Run tests
npm test

# Build the application
npm run build
```

The built application will be in the `dist/` directory.

## 📦 Deployment Options

### 1. Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### 2. Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect Vite configuration
3. Deploy

### 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run build && npm run deploy
```

### 4. Static File Server

After running `npm run build`, serve the `dist/` directory using any static file server:

```bash
# Using Python
python3 -m http.server 8000 --directory dist

# Using Node.js serve
npx serve dist

# Using nginx
# Copy dist contents to nginx web root
```

## 🔧 Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

## 🔒 Security Headers

For production deployment, consider adding these HTTP headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), payment=()
```

## 📊 Performance Optimization

The build process includes:

- Tree shaking for minimal bundle size
- Code splitting for optimal loading
- Asset optimization
- Modern JavaScript with fallbacks
- CSS minification
- Image optimization

## 🧪 Pre-deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Code is formatted: `npm run format:check`
- [ ] Environment variables configured
- [ ] Security headers configured (production)
- [ ] PWA manifest configured
- [ ] Service worker functioning

## 📱 PWA Verification

After deployment, verify PWA functionality:

1. Open in Chrome DevTools > Application
2. Check Service Worker registration
3. Test "Add to Home Screen"
4. Verify offline functionality

## 🔍 Monitoring

Consider adding:

- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics, Plausible)
- Performance monitoring (Web Vitals)
- Uptime monitoring
