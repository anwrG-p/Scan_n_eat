// Theme configuration for the mobile app
export const theme = {
    colors: {
        primary: '#FF6B35',
        secondary: '#F7931E',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: '#333333',
        textSecondary: '#666666',
        border: '#E0E0E0',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFC107',
        gradient: ['#FF6B35', '#F7931E'],
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
    },
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: 'bold' as 'bold',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold' as 'bold',
        },
        h3: {
            fontSize: 20,
            fontWeight: '600' as '600',
        },
        body: {
            fontSize: 16,
            fontWeight: 'normal' as 'normal',
        },
        caption: {
            fontSize: 14,
            fontWeight: 'normal' as 'normal',
        },
    },
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
        },
        large: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
    },
};

export type Theme = typeof theme;
