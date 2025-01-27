#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Files to update version in
const FILES = {
    package: './package.json',
    plugin: './wp-reference-manager.php',
    readme: './readme.txt',
};

// Get the current version from package.json
const packageJson = JSON.parse(fs.readFileSync(FILES.package, 'utf8'));
const currentVersion = packageJson.version;

// Parse version components
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Determine which part to bump based on commit message
const commitMessage = execSync('git log -1 --pretty=%B').toString().trim().toLowerCase();
let newVersion;

if (commitMessage.includes('major:') || commitMessage.includes('breaking:')) {
    newVersion = `${major + 1}.0.0`;
} else if (commitMessage.includes('feat:') || commitMessage.includes('feature:')) {
    newVersion = `${major}.${minor + 1}.0`;
} else {
    newVersion = `${major}.${minor}.${patch + 1}`;
}

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(FILES.package, JSON.stringify(packageJson, null, 2) + '\n');

// Update plugin file
let pluginContent = fs.readFileSync(FILES.plugin, 'utf8');
pluginContent = pluginContent.replace(
    /Version: \d+\.\d+\.\d+/,
    `Version: ${newVersion}`
);
pluginContent = pluginContent.replace(
    /define\('WP_REFERENCE_MANAGER_VERSION', '\d+\.\d+\.\d+'\);/,
    `define('WP_REFERENCE_MANAGER_VERSION', '${newVersion}');`
);
fs.writeFileSync(FILES.plugin, pluginContent);

// Update readme.txt
let readmeContent = fs.readFileSync(FILES.readme, 'utf8');
readmeContent = readmeContent.replace(
    /Stable tag: \d+\.\d+\.\d+/,
    `Stable tag: ${newVersion}`
);
fs.writeFileSync(FILES.readme, readmeContent);

// Update CHANGELOG.md
const today = new Date().toISOString().split('T')[0];
let changelogContent = fs.readFileSync('./CHANGELOG.md', 'utf8');

// Move [Unreleased] changes to new version
changelogContent = changelogContent.replace(
    '## [Unreleased]',
    `## [Unreleased]\n\n## [${newVersion}] - ${today}`
);

// Get repository URL from git remote
const repoUrl = execSync('git remote get-url origin')
    .toString()
    .trim()
    .replace(/\.git$/, '')
    .replace(/^git@github\.com:/, 'https://github.com/');

// Update comparison links
if (!changelogContent.includes(`[${newVersion}]:`)) {
    // Add new version comparison link
    const versionLinkPattern = /\[Unreleased\]: (.+)\/compare\/(.+)\.\.\.HEAD/;
    const match = changelogContent.match(versionLinkPattern);
    
    if (match) {
        // Update existing links
        changelogContent = changelogContent.replace(
            versionLinkPattern,
            `[Unreleased]: ${repoUrl}/compare/v${newVersion}...HEAD\n[${newVersion}]: ${repoUrl}/compare/${match[2]}...v${newVersion}`
        );
    } else {
        // Add initial links
        changelogContent += `\n\n[Unreleased]: ${repoUrl}/compare/v${newVersion}...HEAD\n[${newVersion}]: ${repoUrl}/releases/tag/v${newVersion}`;
    }
}

fs.writeFileSync('./CHANGELOG.md', changelogContent);

// Stage the modified files
execSync('git add package.json wp-reference-manager.php readme.txt CHANGELOG.md');

console.log(`Version bumped from ${currentVersion} to ${newVersion}`);
