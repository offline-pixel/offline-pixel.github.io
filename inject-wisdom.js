const fs = require('fs');
const path = require('path');

const folderPath = './pinescript-strategies';

// The snippet we want to inject *before* <nav>
const linkToInject = `
  <div class="special-nav-div">
    <a href="https://offlinepixel.gumroad.com/l/kpafhy" class="" target="_blank" rel="noopener noreferrer">
      Get &nbsp;<b>The Option Buyer</b>&nbsp; guide now
    </a>`;

// Closing div *after* </nav>
const closingDiv = '</div>';

async function injectHtmlIntoFiles() {
  try {
    const files = await fs.promises.readdir(folderPath);

    console.log(`Found ${files.length} items in '${folderPath}'.`);

    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.html') {
        const filePath = path.join(folderPath, file);

        try {
          let fileContent = await fs.promises.readFile(filePath, 'utf8');

          if (fileContent.includes('<nav class="breadcrumb"')) {
            // Insert opening <div> + link before <nav>
            let modifiedContent = fileContent.replace(
              '<nav class="breadcrumb"',
              linkToInject + '\n  <nav class="breadcrumb"'
            );

            // Insert closing </div> right after </nav>
            modifiedContent = modifiedContent.replace(
              '</nav>',
              '</nav>\n' + closingDiv
            );

            await fs.promises.writeFile(filePath, modifiedContent, 'utf8');
            console.log(`✅ Wrapped breadcrumb nav in ${file}`);
          } else {
            console.warn(`⚠️ <nav class="breadcrumb"> not found in ${file}. Skipping.`);
          }
        } catch (err) {
          console.error(`❌ Error processing ${file}:`, err.message);
        }
      } else {
        console.log(`Skipping non-HTML file: ${file}`);
      }
    }

    console.log('\nHTML wrapping process completed.');
  } catch (dirErr) {
    console.error(`❌ Error reading directory '${folderPath}':`, dirErr.message);
  }
}

injectHtmlIntoFiles();
