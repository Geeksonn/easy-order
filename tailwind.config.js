module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {

        extend: {
            boxShadow: {
                around: '0 0 10px #9ca3af',
            },
            colors: {
                'dark-green': '#004335',
                'pink': '#EEA4C8',
                'orange': '#F6A000',
                'beige': '#FAF9FA',
                'light-grey': '#909090',
                'very-light-grey': '#F8F8F8',
                'dark-white': '#EEEEEE',
                'red': '#E65E44',
                'dark-beige': '#F5F4F0',
                'bar-grey': '#D5D5D5'

            },
            width: {
                icon: '1.25rem',
            },
            height: {
                icon: '1.25rem',
            },
        },
        fontFamily: {
            body: ['Inter', 'sans-serif'],
            title: ['new-spirit', 'serif'],
        },
    },
    plugins: [],
};
