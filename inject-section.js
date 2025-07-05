const fs = require('fs');
const path = require('path');

const folderPath = './pinescript-strategies';

const htmlSnippetToInject = `
        <section class="cta-section custom-strategy-cta">
            <h2 class="cta-title">Enhance Your Trading</h2>
            <p>Get a high-performance Pine Script analysis tool for actionable market insights, designed for traders on the move.</p>
            <p>This strategy runs in live mode on TradingView, helping you identify potential opportunities.</p>
            <a href="https://offlinepixel.gumroad.com/l/trader-on-the-go" class="btn custom-btn" target="_blank" rel="noopener noreferrer">
              Subscribe now @ $99/month
            </a>
        </section>`;

async function injectHtmlIntoFiles() {
    try {
        const files = await fs.promises.readdir(folderPath);

        console.log(`Found ${files.length} items in '${folderPath}'.`);

        for (const file of files) {
            if (path.extname(file).toLowerCase() === '.html') {
                const filePath = path.join(folderPath, file);

                try {
                    let fileContent = await fs.promises.readFile(filePath, 'utf8');

                    const targetTag = '</article>';

                    if (fileContent.includes(targetTag)) {
                        const modifiedContent = fileContent.replace(targetTag, htmlSnippetToInject + '\n' + targetTag);

                        await fs.promises.writeFile(filePath, modifiedContent, 'utf8');
                        console.log(`Successfully injected HTML into ${file}`);
                    } else {
                        console.warn(`'${targetTag}' not found in ${file}. Skipping injection.`);
                    }
                } catch (readWriteError) {
                    console.error(`Error processing file ${file}:`, readWriteError.message);
                }
            } else {
                console.log(`Skipping non-HTML file: ${file}`);
            }
        }
        console.log('\nHTML injection process completed.');
    } catch (dirError) {
        console.error(`Error reading directory '${folderPath}':`, dirError.message);
        console.error('Please ensure the folder path is correct and accessible.');
    }
}

injectHtmlIntoFiles();
