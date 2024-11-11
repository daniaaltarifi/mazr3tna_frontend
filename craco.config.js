// craco.config.js
const path = require('path');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins,
          ...process.env.NODE_ENV === 'production' 
            ? [
                new HtmlCriticalWebpackPlugin({
                  base: path.resolve(__dirname, 'build'),  // Where your final build files are located
                  src: 'index.html',  // Input HTML file
                  dest: 'index.html',  // Output HTML file with inlined critical CSS
                  inline: true,  // Inline critical CSS into the HTML
                  minify: true,  // Minify the CSS and HTML
                  extract: true,  // Extract critical CSS from the full CSS
                  width: 320,  // Viewport width for critical CSS calculation (mobile example)
                  height: 565,  // Viewport height for critical CSS calculation (mobile example)
                  penthouse: {
                    blockJSRequests: false,  // Don't block JavaScript requests when calculating critical CSS
                  },
                }),
              ]
            : [],
        ],
      };
    },
  },
};
