module.exports = {
    expo: {
        name: 'TechWizard',
        slug: 'tech-wizard',
        version: '2.0.0',
        orientation: 'portrait',
        icon: path.resolve('./path/src/img/LogoTech.png'),
        splash: {
            image: path.resolve('./path/src/img/LogoTech.png'),
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        android: {
            package: 'TechWizard.app',
        },
    },
};