# QuantiCure Frontend

A modern medical platform that combines AI capabilities with quantum computing simulations for advanced healthcare solutions.

## Features

- 🏥 **Patient Management**
  - Digital patient intake system
  - Medical history tracking
  - Appointment scheduling
  - Patient data analytics

- 🤖 **AI Integration**
  - Medical chatbot with OpenRouter integration
  - AI-powered medical assistance
  - Symptom analysis
  - Treatment recommendations
  - Citation support for medical information

- 💊 **Drug Dashboard**
  - Comprehensive drug information
  - Interaction analysis
  - Quantum simulations for drug behavior
  - Visual molecular representations

- 👨‍⚕️ **Doctor Interface**
  - Patient review system
  - Treatment planning tools
  - Medical record management
  - AI-assisted diagnosis support

- 🎨 **Modern UI/UX**
  - Responsive design for all devices
  - Dark/Light theme support
  - Intuitive navigation
  - Real-time updates
  - Accessible interface

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- OpenRouter AI Integration
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/QUANTICURE/QC-Frontend.git
cd QC-Frontend
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env` file in the root directory:
```env
VITE_OPENROUTER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
pnpm build
```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── chatbot/       # AI chatbot components
│   ├── common/        # Shared UI components
│   ├── doctor/        # Doctor interface components
│   ├── drugs/         # Drug dashboard components
│   ├── layout/        # Layout components
│   ├── patient/       # Patient management components
│   └── simulation/    # Quantum simulation components
├── config/            # Configuration files
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
└── services/          # API and service integrations

```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Acknowledgments

- OpenRouter for AI capabilities
- React and Vite teams for the amazing development experience
- Tailwind CSS for the utility-first CSS framework
- All contributors and maintainers
