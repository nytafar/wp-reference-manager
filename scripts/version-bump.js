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

// Update comparison links
const lines = changelogContent.split('\n');
const lastLine = lines[lines.length - 1];
const repoUrl = lastLine.match(/https:\/\/github\.com\/[^\/]+\/[^\/]+/)[0];

if (!changelogContent.includes(`[${newVersion}]:`)) {
    changelogContent += `\n[${newVersion}]: ${repoUrl}/compare/v${currentVersion}...v${newVersion}`;
}

fs.writeFileSync('./CHANGELOG.md', changelogContent);

// Stage the modified files
execSync('git add package.json wp-reference-manager.php readme.txt CHANGELOG.md');

console.log(`Version bumped from ${currentVersion} to ${newVersion}`);
