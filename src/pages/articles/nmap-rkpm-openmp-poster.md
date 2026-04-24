---
layout: ../../layouts/MarkdownArticleLayout.astro
title: 'Legacy Fortran Code to GPU-Enablement, Agentic AI Conversion to C++'
pubDate: 'April 15, 2026'
description: 'Converting legacy Fortran code to OpenMP multi-threaded in preparation for GPU-enablement and utilizing agentic AI to convert the code to C++.'
author: 'Anthony Marinov'
image:
    url: '/images/nmap-rkpm-openmp-poster/taylorbar.png'
    alt: 'Simulated deformation of unit lattice.'
tags: ["High-Performance Computing", "Multi-Threading", "GPU", "Engineering", "Software"]
---
A poster for the 2026 [MICDE Predictive Science Symposium](https://micde.umich.edu/news-events/annual-symposia/2026-predictive-science-symposium/) describing our progress on our GPU acceleration work as part of the [SHAPE](https://shape.ucsd.edu/) project. 

We (at the time of presenting this poster) managed to successfully offload the main parallel loop to the GPU of our MI300A system utilizing unified memory, as a proof of concept and viability. We also successfully utilized LLM's and agentic AI to quickly translate the codebase from Fortran into C++ in a matter of weeks.

Our future work will focus on optimizing the code for GPU acceleration, identifying and parallelizing other bottlenecks, and integrating additional features from the simulation research groups.
![Poster](/images/nmap-rkpm-openmp-poster/micde26-nmap-omp.png)