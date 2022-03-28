'use strict';

const { openfeature } = require('@openfeature/openfeature-js');
const {
  OpenFeatureLaunchDarklyProvider,
} = require('@openfeature/js-launchdarkly-provider');

/**
 * Registers the LaunchDarkly provider to the globally scoped
 * OpenFeature object.
 */
console.log('Registering the OpenFeature LaunchDarkly provider');
openfeature.registerProvider(
  new OpenFeatureLaunchDarklyProvider(process.env.LD_KEY)
);
