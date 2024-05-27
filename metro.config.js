const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add SVG transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Extend the default sourceExts array and include 'svg'
config.resolver.sourceExts = config.resolver.sourceExts.concat('svg');

// Exclude 'svg' from assetExts
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');

module.exports = config;