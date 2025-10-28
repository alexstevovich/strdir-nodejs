import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

export async function stringDir(dir, { extensions, encoding = 'utf8' } = {}) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    let combined = '';

    // Iterate over entries and process files and subdirectories
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recursively process subdirectories
            combined += await stringDir(fullPath, { extensions, encoding });
        } else if (
            entry.isFile() &&
            (!extensions ||
                extensions.some((ext) =>
                    entry.name.toLowerCase().endsWith(ext.toLowerCase()),
                ))
        ) {
            // Read file if it matches extensions
            const content = await fs.readFile(fullPath, encoding);
            combined += content;
        }
    }

    return combined.trim();
}

export function stringDirSync(dir, { extensions, encoding = 'utf8' } = {}) {
    const entries = fsSync.readdirSync(dir, { withFileTypes: true });

    let combined = '';

    // Iterate over entries and process files and subdirectories
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recursively process subdirectories
            combined += stringDirSync(fullPath, { extensions, encoding });
        } else if (
            entry.isFile() &&
            (!extensions ||
                extensions.some((ext) =>
                    entry.name.toLowerCase().endsWith(ext.toLowerCase()),
                ))
        ) {
            // Read file if it matches extensions
            const content = fsSync.readFileSync(fullPath, encoding);
            combined += content;
        }
    }

    return combined.trim();
}

export default stringDir;
