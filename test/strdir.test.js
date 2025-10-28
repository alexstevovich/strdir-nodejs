import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import strdir from '../src/index.js';
import { stringDirSync } from '../src/index.js';

// Safe test directory (not within /test so test files aren't affected)
const testRoot = path.join(process.cwd(), 'temptest', 'strdir');

async function setupTestDir() {
    const recursiveDir = path.join(testRoot, 'recursive');
    await fs.mkdir(recursiveDir, { recursive: true });

    await Promise.all([
        fs.writeFile(path.join(testRoot, 'file1.txt'), 'File 1 content'),
        fs.writeFile(path.join(testRoot, 'file2.txt'), 'File 2 content'),
        fs.writeFile(path.join(recursiveDir, 'file3.md'), 'File 3 content'),
        fs.writeFile(path.join(recursiveDir, 'file4.txt'), 'File 4 content'),
    ]);
}

async function cleanupTestDir() {
    await fs.rm(path.join(process.cwd(), 'temptest'), {
        recursive: true,
        force: true,
    });
}

describe('strdir utility', () => {
    beforeAll(async () => {
        await setupTestDir();
    });

    afterAll(async () => {
        await cleanupTestDir();
    });

    it('reads files asynchronously and combines contents', async () => {
        const result = await strdir(testRoot, {
            recursive: true,
            extensions: ['.txt'], // Read only .txt files
        });
        const expected = 'File 1 contentFile 2 contentFile 4 content'; // file3.md will be excluded because it's .md
        expect(result).toBe(expected);
    });

    it('reads files synchronously and combines contents', () => {
        const result = stringDirSync(testRoot, {
            recursive: true,
            extensions: ['.txt'], // Read only .txt files
        });
        const expected = 'File 1 contentFile 2 contentFile 4 content'; // file3.md will be excluded because it's .md
        expect(result).toBe(expected);
    });

    it('filters by extensions correctly (async)', async () => {
        const result = await strdir(testRoot, {
            recursive: true,
            extensions: ['.md'], // Read only .md files
        });
        const expected = 'File 3 content'; // Only file3.md should be included
        expect(result).toBe(expected);
    });

    it('filters by extensions correctly (sync)', () => {
        const result = stringDirSync(testRoot, {
            recursive: true,
            extensions: ['.md'], // Read only .md files
        });
        const expected = 'File 3 content'; // Only file3.md should be included
        expect(result).toBe(expected);
    });

    it('returns empty string for empty directory', async () => {
        const emptyDir = path.join(testRoot, 'empty');
        await fs.mkdir(emptyDir, { recursive: true });

        const result = await strdir(emptyDir, { recursive: true });
        expect(result).toBe('');
    });
});
