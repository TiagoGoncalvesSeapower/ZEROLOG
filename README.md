# ZEROLOG

ZEROLOG is a fully static website designed to present and communicate all key information about the project, including its objectives, context, activities, partners, results, and news updates.  
The site provides a clear, accessible, and mobile‑friendly way for visitors to explore the project while keeping maintenance simple through a centralized data file (`project-data.js`).  
All pages load instantly, work on any device, and require no backend or server‑side processing.

## Description

ZEROLOG is a fully static, lightweight web platform developed to provide a clear and comprehensive presentation of the project’s mission, objectives, activities, partners, and ongoing results.

Built entirely with pure HTML, CSS, and vanilla JavaScript, the site avoids all frameworks and backend dependencies, ensuring long‑term stability, fast loading times, and maximum compatibility across devices and hosting environments.

All project information is centrally managed through a single data source (`project-data.js`), allowing updates to propagate automatically across every page without modifying the underlying HTML files.

Dynamic elements such as the partners list, news updates, activities table, and structured overview sections are rendered client‑side using a simple but robust JavaScript rendering system, while shared interface components like the header and footer are inserted through a custom partial‑loading script.
## Getting Started

### Dependencies

The project has no special dependencies.  
Because it is a fully static website, it runs on any modern operating system (Windows, macOS, Linux) and does not require any backend or external libraries.

Optional:
If you want to run a local development server, you can use Python’s built‑in HTTP server:

- Windows 10/11, macOS, or Linux
- Python 3.x installed (only if using the local server)
- Docker — if you prefer to build and run the site inside a container

### Executing program


The ZEROLOG website is fully static and does not require any backend server.  
You can run it in two simple ways:

### 1. Using Python’s built‑in HTTP server

1. Open a terminal in the project’s root folder.
2. Run the following command:
```

python -m http.server

```
3. Open your browser and visit:
   
   http://localhost:8000

---

### 2. Using Docker

If you prefer running the site inside a lightweight Docker container:

1. Open a terminal in the project’s root folder.
2. Build the image:
```

docker build -t zerolog-site .

```
3. Run the container:
```

docker run --name zerolog -p 8000:80 zerolog-site

```
4. Visit the site in your browser at:
   
   http://localhost:8000

## Authors

Contributors names

Tiago Rico Gonçalves
