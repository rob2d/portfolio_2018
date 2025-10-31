const projects = [
    {
        title: 'Video Game Vision AI & State Prediction',
        techs: ['Python', 'PyTorch', 'OpenCV', 'NumPy'],
        years: 'June 2025 - Present',
        points: [
            'Built a deep learning pipeline for successful real-time state prediction using PyTorch, and a custom multi-task multi-head CNN model, and novel data augmentation.',

            'Automated data scraping, cleaning, and normalization for large-scale datasets; this involved engineering scripts for distribution analysis, downsampling, and cache optimization.',

            'Integrated multi-head neural networks for health, characters, and spatial predictions; experimented with ideas such as U-Net, CBAM, and regularization techniques to enhance the ' +
            'interpretability of the vision model.',

            'Developed scripts for model visualization, loss diagnostics, and training optimization across multi-GPU setups.',

            'Demonstrated rapid learning and adaptability in AI/ML, expanding beyond full-stack and UX engineering, and began to explore various ideas for sequence models for temporal state predictions.'
        ]
    },
    {
        title: '3D SEGA Dreamcast Model Viewer and Texture Editor',
        techs: ['React', 'Redux', 'THREE.js', 'Next.js', 'Jest'],
        years: 'May 2023 - May 2024',
        points: [
            'Built a browser-based app for interactive 3D scene navigation and texture editing at 60fps, pipelining end-to-end editing of various binary file formats with additional integrations.',

            'Leveraged Typescript, React, MUI 5.x, R3F/Three.JS, Node.js\' Buffer API, RTK, Vercel/Next.js and Jest for development, deployment and testing. ',

            'Reverse engineered binary formats (vector quantized images, LZSS compression), implemented ML-based image optimization with k-means clustering, ' +
            'while designing for maximum usability.',

            'Tools developed later enabled efficient translation workflows of in-game binary assets and graphics for a large localization project.',
        ]
    }
];

export default projects;
