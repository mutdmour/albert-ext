const mix = require('laravel-mix')
const path = require('path')

mix.setPublicPath('./')
mix.alias({
    '@': path.join(__dirname, 'src')
});
// compile css files
mix.css('src/assets/css/style.css', 'dist/assets/css')
    .css('src/assets/css/popup.css', 'dist/assets/css')

// compile javascript files
mix.ts('src/app.ts', 'dist')
		.ts('src/background.ts', 'dist')
		.ts('src/content.ts', 'dist')
    .ts('src/popup.ts', 'dist')
    .vue()

// copy static files,. views and  
mix.copy('src/views/', 'dist/views/')
    .copy('src/manifest.json', 'dist/')
    .copy('src/assets/img/', 'dist/assets/img')
    .options({
        processCssUrls: false
    })
