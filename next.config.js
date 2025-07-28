module.exports = {
    output: 'standalone',
    reactStrictMode: false,
    trailingSlash: false,
    swcMinify: true,
    experimental: {
        optimizePackageImports: [
            "mui/x-data-grid",
            "@mui/styles",
            "@mui/lab",
            "@mui/material",
            "@mui/icons-material",
            "@mui/x-date-pickers",
            "@mui/x-data-grid",
            "react-hook-form"
        ],
    },
    env: {
        NEXT_PUBLIC_HOST_API : process.env.NEXT_PUBLIC_HOST_API
      },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
    images: {
        domains: ['autoconn.s3.amazonaws.com'],
    },
};
