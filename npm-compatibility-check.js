const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function checkDependencyCompatibility() {
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    const results = {
        compatible: [],
        incompatible: [],
        errors: []
    };

    for (const [pkg, version] of Object.entries(dependencies)) {
        try {
            console.log(`Checking ${pkg}...`);

            // Get package info
            const { stdout } = await exec(`npm view ${pkg} versions peerDependencies`);
            const info = JSON.parse(stdout);

            // Check peer dependencies
            if (info.peerDependencies) {
                const peerDeps = Object.entries(info.peerDependencies);
                let isCompatible = true;

                for (const [peerPkg, peerVersion] of peerDeps) {
                    if (dependencies[peerPkg]) {
                        const requestedVersion = dependencies[peerPkg].replace('^', '').replace('~', '');
                        const requiredVersion = peerVersion.replace('^', '').replace('~', '');

                        if (!isVersionCompatible(requestedVersion, requiredVersion)) {
                            isCompatible = false;
                            results.incompatible.push({
                                package: pkg,
                                peer: peerPkg,
                                required: peerVersion,
                                current: dependencies[peerPkg]
                            });
                        }
                    }
                }

                if (isCompatible) {
                    results.compatible.push(pkg);
                }
            } else {
                results.compatible.push(pkg);
            }
        } catch (error) {
            results.errors.push({
                package: pkg,
                error: error.message
            });
        }
    }

    return results;
}

function isVersionCompatible(current, required) {
    // Simple version comparison - could be enhanced with semver
    const [currentMajor] = current.split('.');
    const [requiredMajor] = required.split('.');
    return currentMajor >= requiredMajor;
}

// Run the check
checkDependencyCompatibility()
    .then(results => {
        console.log('\nCompatibility Check Results:');
        console.log('\nCompatible Packages:', results.compatible.length);
        console.log(results.compatible.join('\n'));

        console.log('\nIncompatible Packages:', results.incompatible.length);
        results.incompatible.forEach(({ package, peer, required, current }) => {
            console.log(`\n${package}:`);
            console.log(`  Requires ${peer}@${required}`);
            console.log(`  Current version: ${current}`);
        });

        console.log('\nErrors:', results.errors.length);
        results.errors.forEach(({ package, error }) => {
            console.log(`\n${package}:`);
            console.log(`  ${error}`);
        });
    })
    .catch(console.error);