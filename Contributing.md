# Contributing to BridgeX

Thank you for your interest in contributing to **BridgeX**! We encourage civil engineering enthusiasts, developers, designers, and documentation writers to help improve this platform.

By participating in this project, you help build a comprehensive, accurate, and accessible global encyclopedia of remarkable bridge engineering.

---

## Core Project Contributors

The core development and maintenance team behind BridgeX:

| Name | Role | Email |
| :--- | :--- | :--- |
| **Muhammad Rutaab Ali** | Project Lead / Owner | [rutaabali3@gmail.com](mailto:rutaabali3@gmail.com) |
| **Syed Muhammed Faraz** | Core Developer / Contributor | [muhammedfaraz875@gmail.com](mailto:muhammedfaraz875@gmail.com) |
| **Muhammad Shiraz** | Core Developer / Contributor | [muhammadshiraz2412c1@gmail.com](mailto:muhammadshiraz2412c1@gmail.com) |
| **Ahad Mirza** | Core Developer / Contributor | [ahadmirza1604@gmail.com](mailto:ahadmirza1604@gmail.com) |

---

## How to Contribute

### 1. Code & Feature Contributions

1. **Fork the Repository**
   Create a personal copy of the repository on GitHub by clicking the **Fork** button at the top right of the repository page.

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/BridgeX.git
   cd BridgeX
   ```

3. **Configure Upstream Remote**
   ```bash
   git remote add upstream https://github.com/rutaabali3/BridgeX.git
   ```

4. **Create a Feature Branch**
   Follow our branch naming conventions:
   - Features: `feature/short-description` (e.g., `feature/add-cable-stayed-filters`)
   - Bug fixes: `fix/short-description` (e.g., `fix/mobile-navbar-collapse`)
   - Documentation: `docs/short-description` (e.g., `docs/update-contributing-guide`)

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Your Changes**
   Implement your changes, adhering to our code style guidelines detailed below.

6. **Test Your Changes**
   Verify all pages load correctly across various screen sizes (desktop, tablet, mobile) and ensure interactive components (menus, forms, modal dialogs) function as expected.

7. **Commit Your Changes**
   Follow standard imperative commit conventions:
   ```bash
   git commit -m "Add cable-stayed bridge filtering capability"
   ```

8. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Open a Pull Request**
   Navigate to the original repository and click **New Pull Request**. Provide a detailed summary of the changes made and link any relevant issue numbers.

---

## Branch Naming Conventions

To maintain project organization, please strictly follow these branch prefix conventions:

| Prefix | Usage Description | Example |
| :--- | :--- | :--- |
| `feature/` | Adding new features, pages, or major functionality | `feature/search-bar` |
| `fix/` | Resolving bugs, broken links, or styling issues | `fix/header-padding` |
| `docs/` | Updating documentation, comments, or README | `docs/api-guide` |
| `refactor/` | Code optimization or restructuring without functional changes | `refactor/css-variables` |

---

## Commit Message Standards

Commit messages must be concise, descriptive, and written in the imperative mood.

### Format
`<type>: <short imperative summary>`

### Examples
- `feat: add new bridge entry for Golden Gate Bridge`
- `fix: correct layout alignment on contact page for mobile devices`
- `docs: update setup steps in README`
- `style: reformat CSS rules in index.css`

---

## Code Style & Standards

### HTML
- Use semantic HTML5 markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Ensure all image tags include descriptive `alt` text for web accessibility.
- Maintain consistent 2-space indentation.

### CSS
- Maintain standard class naming conventions.
- Utilize CSS variables where possible for uniform colors and spacing.
- Keep stylesheets modular within the `css/` folder.

### JavaScript
- Use modern ES6+ syntax (`const`/`let`, arrow functions, template literals).
- Avoid inline JavaScript handlers in HTML files; attach event listeners programmatically.

---

## Reporting Issues

If you discover a bug or have a suggestion for platform improvement:

1. Check existing issues in the GitHub repository to ensure it has not already been reported.
2. If not reported, open a new **Issue**.
3. Clear issue reports should include:
   - A clear, descriptive title.
   - Detailed steps to reproduce the behavior.
   - Expected vs actual behavior.
   - Browser name and version.
   - Screenshots if applicable.

---

## License & Attribution

By contributing to BridgeX, you agree that your contributions will be licensed under the project's [MIT License](LICENSE.md).
