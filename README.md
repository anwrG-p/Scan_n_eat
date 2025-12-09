# Baz3it el chef - Mobile App

React Native mobile application for the Baz3it el chef recipe management system.

## Features

- 🏠 **Home**: Navigation hub to all features
- 📚 **Catalog**: Browse and add recipes to cart
- 📷 **Camera**: Scan ingredients to find recipes
- 🛒 **Checkout**: Manage cart and place orders
- 📜 **History**: View activity and order history
- 🚨 **Report**: Submit technical issues
- 🔐 **Login**: User authentication

## Prerequisites

- Node.js installed
- Expo Go app on your phone (iOS/Android)
- Backend services running

## Installation

```bash
cd frontend/mobile-app
npm install
```

## Running the App

```bash
npm start
```

Then:
1. Scan the QR code with Expo Go app (Android) or Camera app (iOS)
2. The app will load on your phone

## Configuration

### API Endpoints

Edit `src/services/api.ts` to configure backend URLs:

```typescript
const BASE_URL = 'http://192.168.1.X'; // Replace with your computer's IP
```

**Find your IP address:**
- Windows: `ipconfig`
- Mac/Linux: `ifconfig`

### Backend Services

Ensure these services are running:
- Recipe Service: Port 8082
- Order Service: Port 8085
- Auth Service: Port 8081
- History Service: Port 8080

## Project Structure

```
src/
├── navigation/     # Navigation setup
├── screens/        # All app screens
├── context/        # Cart context
├── services/       # API services
└── styles/         # Theme configuration
```

## Screens

- **HomeScreen**: Main navigation
- **CatalogScreen**: Recipe browsing
- **CameraScreen**: Ingredient scanning
- **CheckoutScreen**: Cart and checkout
- **HistoryScreen**: Activity history
- **ReportScreen**: Problem reporting
- **LoginScreen**: Authentication

## Development

### Adding New Features

1. Create screen in `src/screens/`
2. Add route in `src/navigation/AppNavigator.tsx`
3. Update navigation types

### Styling

All styling uses the theme from `src/styles/theme.ts`

## Troubleshooting

**Cannot connect to backend:**
- Use your computer's IP address, not localhost
- Ensure backend services are running
- Check firewall settings

**Camera not working:**
- Grant camera permissions when prompted
- Check device camera is working

**App won't load:**
- Run `npm install` again
- Clear Expo cache: `expo start -c`

## Testing

Test all features:
- [ ] Navigation between screens
- [ ] Add items to cart
- [ ] Place an order
- [ ] View history
- [ ] Submit a report
- [ ] Camera functionality

## Notes

- First run may take longer (downloading dependencies)
- Sample data is used if backend is unavailable
- Camera requires device permissions
