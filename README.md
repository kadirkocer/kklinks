# kklinks

A modern, animated social links page for Kadir Koçer. Features a dynamic circular layout with floating social media icons orbiting around a video avatar.

🔗 **Live Demo**: Cloudflare Pages üzerinden yayınlanacak

## ✨ Features

- **Animated Layout**: Social icons orbit smoothly with individual floating animations
- **Responsive Design**: Adapts beautifully from mobile to desktop
- **Interactive Effects**: Glow effects and scale animations on hover
- **Video Avatar**: Central animated video profile with interactive hover state
- **PWA Ready**: Includes manifest and all necessary icons for installation

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool with HMR
- **Tailwind CSS** - Styling
- **Cloudflare Workers** - Deployment (Static Assets)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/kadirkocer/kklinks.git

# Navigate to the project
cd kklinks

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy:cf` | Deploy to Cloudflare via Wrangler |

## Cloudflare Worker Build Form

Use these values in **Set up your application**:

- **Project name**: `kklinks`
- **Build command**: `npm run build`
- **Deploy command**: `npm run deploy:cf`
- **Non-production branch deploy command**: leave empty (or same as deploy command)
- **Path**: `/`
- **API token variable name**: `CLOUDFLARE_API_TOKEN`
- **API token variable value**: your Cloudflare API token

Required token permissions:
- **Account - Workers Scripts: Edit**
- **Account - Workers Routes: Edit** (if you will bind custom routes)
- **Zone - Zone: Read** (for route/domain operations)

## 📁 Project Structure

```
kklinks/
├── public/
│   ├── video/           # Video assets
│   ├── favicon.svg      # SVG favicon
│   ├── favicon-*.png    # PNG favicons
│   ├── apple-touch-icon.png
│   ├── og-image.jpg     # Social sharing image
│   └── manifest.json    # PWA manifest
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
└── index.html           # HTML template with SEO meta tags
```

## 🔗 Social Links

- [Instagram](https://www.instagram.com/kkadirkkocer/)
- [YouTube](https://www.youtube.com/@kkadirkocer)
- [LinkedIn](https://www.linkedin.com/in/kkadirkocer/)
- [Twitter/X](https://x.com/kkadirkocer)
- [GitHub](https://github.com/kadirkocer)
- [Website](https://kadirkocer.com)

## 📄 License

MIT © [Kadir Koçer](https://kadirkocer.com)
