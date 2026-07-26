const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'public', 'assets', 'Sreelakshmiagro logo.png');
const targetIcon = path.join(__dirname, '..', 'public', 'icon.png');
const targetFavicon = path.join(__dirname, '..', 'public', 'favicon.ico');
const targetAppFavicon = path.join(__dirname, '..', 'app', 'favicon.ico');
const targetAppleIcon = path.join(__dirname, '..', 'public', 'apple-icon.png');

if (fs.existsSync(srcPath)) {
  const logoBuffer = fs.readFileSync(srcPath);
  fs.writeFileSync(targetIcon, logoBuffer);
  fs.writeFileSync(targetFavicon, logoBuffer);
  fs.writeFileSync(targetAppFavicon, logoBuffer);
  fs.writeFileSync(targetAppleIcon, logoBuffer);
  console.log('Favicon files generated successfully!');
} else {
  console.error('Source logo not found at:', srcPath);
}
