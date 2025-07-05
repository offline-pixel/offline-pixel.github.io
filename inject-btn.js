const fs = require('fs');
const path = require('path');

const folderPath = './pinescript-strategies'; // Adjust this path if your folder is not in the same directory as the script

// --- HTML Snippet for SECTION (to be injected before </article>) ---
const sectionHtmlToInject = `
        <section class="cta-section custom-strategy-cta">
            <h2 class="cta-title">Enhance Your Trading</h2>
            <p>Get a high-performance Pine Script analysis tool for actionable market insights, designed for traders on the move.</p>
            <p>This strategy runs in live mode on TradingView, helping you identify potential opportunities.</p>
            <a href="https://offlinepixel.gumroad.com/l/trader-on-the-go" class="btn custom-btn" target="_blank" rel="noopener noreferrer">
              Subscribe now @ $99/month
            </a>
        </section>`;

// --- HTML Snippet for P.JOB-META (to replace existing p.job-meta) ---
const jobMetaReplacementHtml = `
      <p class="job-meta" style="text-align: center; justify-content: center;">
        <a href="https://offlinepixel.gumroad.com/l/trader-on-the-go" class="btn custom-btn" target="_blank" rel="noopener noreferrer">Subscribe now @ $99/month</a>
      </p>`;

async function modifyHtmlFiles() {
    try {
        // Read all files and subdirectories in the specified folder
        const files = await fs.promises.readdir(folderPath);

        console.log(`Found ${files.length} items in '${folderPath}'.`);

        for (const file of files) {
            // Construct the full path to the file
            const filePath = path.join(folderPath, file);

            // Check if it's an HTML file
            if (path.extname(file).toLowerCase() === '.html') {
                console.log(`Processing file: ${filePath}`);

                try {
                    // Read the content of the HTML file
                    let fileContent = await fs.promises.readFile(filePath, 'utf8');
                    let modifiedContent = fileContent; // Start with the original content

                    // // --- Step 1: Inject the SECTION before </article> ---
                    // const articleTargetTag = '</article>';
                    // if (modifiedContent.includes(articleTargetTag)) {
                    //     // Replace the target tag with the snippet + target tag
                    //     modifiedContent = modifiedContent.replace(articleTargetTag, sectionHtmlToInject + '\n' + articleTargetTag);
                    //     console.log(`  Successfully injected SECTION before '${articleTargetTag}' in ${file}.`);
                    // } else {
                    //     console.warn(`  '${articleTargetTag}' not found in ${file}. Skipping SECTION injection.`);
                    // }

                    // --- Step 2: Replace the p.job-meta tag ---
                    // This regex finds a <p> tag that has the class "job-meta",
                    // regardless of other attributes or its inner content.
                    // The 's' flag (dotAll) allows '.' to match newlines.
                    const jobMetaRegex = /<p[^>]*class="job-meta"[^>]*>.*?<\/p>/s;
                    if (jobMetaRegex.test(modifiedContent)) {
                        // Replace the entire matched p.job-meta block with the new HTML
                        modifiedContent = modifiedContent.replace(jobMetaRegex, jobMetaReplacementHtml);
                        console.log(`  Successfully replaced 'p.job-meta' tag in ${file}.`);
                    } else {
                        console.warn(`  'p.job-meta' tag not found in ${file}. Skipping replacement.`);
                    }

                    // Write the modified content back to the file ONLY if changes were made
                    if (modifiedContent !== fileContent) {
                        await fs.promises.writeFile(filePath, modifiedContent, 'utf8');
                        console.log(`  File ${file} updated.`);
                    } else {
                        console.log(`  No changes were made to ${file}.`);
                    }

                } catch (readWriteError) {
                    console.error(`Error processing file ${file}:`, readWriteError.message);
                }
            } else {
                console.log(`Skipping non-HTML file: ${file}`);
            }
        }
        console.log('\nHTML modification process completed.');
    } catch (dirError) {
        console.error(`Error reading directory '${folderPath}':`, dirError.message);
        console.error('Please ensure the folder path is correct and accessible.');
    }
}

// Run the modification function
modifyHtmlFiles();
