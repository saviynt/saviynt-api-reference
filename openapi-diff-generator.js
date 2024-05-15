const { diff } = require('openapi-diff');
const path = require('path');

async function compareOpenApiSpecs(oldSpec, newSpec) {
    try {
        const result = await diff({
            sourceSpec: {
                content: require(path.resolve(__dirname, oldSpec)),
                location: oldSpec,
                format: 'openapi3'
            },
            destinationSpec: {
                content: require(path.resolve(__dirname, newSpec)),
                location: newSpec,
                format: 'openapi3'
            }
        });

        if (result.breakingDifferencesFound) {
            console.log('Breaking changes found:');
            console.log(JSON.stringify(result.breakingDifferences, null, 2));
        } else {
            console.log('No breaking changes found.');
        }

        if (result.nonBreakingDifferencesFound) {
            console.log('Non-breaking changes found:');
            console.log(JSON.stringify(result.nonBreakingDifferences, null, 2));
        } else {
            console.log('No non-breaking changes found.');
        }

    } catch (error) {
        console.error('Error comparing OpenAPI specs:', error);
    }
}

// Example usage, specify the paths to your old and new OpenAPI spec files
compareOpenApiSpecs('./specs/api-v1.yaml', './specs/api-v2.yaml');
