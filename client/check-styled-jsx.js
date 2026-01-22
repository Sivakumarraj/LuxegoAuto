// check-styled-jsx.js
const fs = require('fs');
const path = require('path');

function checkForStyledJsx(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            checkForStyledJsx(filePath);
        } else if (file.endsWith('.js')) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.includes('styled jsx') || content.includes('jsx=')) {
                console.log(`Found styled-jsx in: ${filePath}`);
            }
        }
    });
}

console.log('Checking for styled-jsx usage...');
checkForStyledJsx('./src/components');
console.log('Check complete.');