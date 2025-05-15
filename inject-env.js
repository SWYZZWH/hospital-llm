const fs = require('fs');
const path = require('path');

// Read the HTML files
const htmlFiles = ['login.html', 'index.html'];
const env = process.env.ENV || 'development';

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add environment variable script if it doesn't exist
    if (!content.includes('window.ENV')) {
        content = content.replace(
            '<head>',
            `<head>
    <script>
        window.ENV = '${env}';
    </script>`
        );
        fs.writeFileSync(filePath, content);
    }
}); 