# Deploying later with Cloudflare Pages

The app is prepared locally. No GitHub push, Cloudflare project, domain purchase, DNS change, or deployment has been performed. Follow these steps only when you decide to publish.

## 1. Verify and push

Use Node 24 (on this Windows checkout, first run `. ./scripts/use-local-node.ps1`). From the repository root:

```sh
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
```

After reviewing and approving the content, commit the source, lockfile, and CI workflow on a feature branch and push it to your existing GitHub repository. Do not commit `node_modules/`, `.tools/`, or `dist/`. Open a pull request targeting `main`. The included GitHub Actions workflow runs the same four checks after `npm ci`, on pull requests to `main` and pushes to `main`.

If you want CI to gate merges, enable branch protection/rulesets for `main` in GitHub and require the `validate` check. The workflow itself does not configure branch protection or deploy. Cloudflare’s build is a separate process; without merge protection it does not automatically wait for GitHub Actions to pass.

## 2. Connect the Git repository

1. Sign into your own Cloudflare account and open **Workers & Pages**.
2. Choose **Create application → Pages → Import an existing Git repository** (dashboard labels may vary).
3. Authorize GitHub access and select the existing `mahdi-portfolio` repository. Restrict access to the intended repository when possible.
4. Choose **main** as the production branch.
5. Set the build configuration:

   | Setting                | Value                                                       |
   | ---------------------- | ----------------------------------------------------------- |
   | Framework preset       | React / Vite, or no preset with the explicit settings below |
   | Root directory         | Repository root; leave blank or `/`                         |
   | Build command          | `npm run build`                                             |
   | Build output directory | `dist`                                                      |
   | Node build environment | `NODE_VERSION=24`                                           |

6. Save the configuration and start the first build. Pages installs dependencies from the checked-in lockfile, builds the site, and shows its result in the project’s **Deployments** view. Open the actual `*.pages.dev` address returned by Cloudflare. This repository does not assume a particular subdomain is available.

See [Cloudflare’s Git integration documentation](https://developers.cloudflare.com/pages/configuration/git-integration/) and [React deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/) for the current dashboard flow.

## 3. Production and preview deployments

Cloudflare Pages Git integration can build branch/PR previews with their own URLs. They allow reviewing changes without replacing production. Updates merged into your configured production branch (`main`) trigger the production deployment. Review branch controls in your Pages project to choose which branches create previews. A preview URL is a real hosted URL; keep private material out of public assets and client code.

Build and deployment logs live inside the selected deployment in the Pages project. If a build fails, check:

- The selected root directory contains `package.json` and `package-lock.json`.
- Node is set to 24; the original Node 20.10.0 cannot run this Vite setup.
- Build command/output are `npm run build` / `dist`.
- The same `npm ci` and checks pass locally.
- Asset filenames match exactly, including case: Linux hosts are case-sensitive.

## 4. Direct links and refresh

This is a client-routed SPA. [Cloudflare Pages’ documented default SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/#single-page-application-spa-rendering) returns the app shell for paths without a matching file **when there is no top-level `404.html`**. This project deliberately has no such file. No wildcard redirect or Pages Function is needed.

Before publishing, verify that `dist/index.html` exists and `dist/404.html` does not. The local production preview can verify application fallback:

```sh
npm run build
npm run preview
```

Open `/projects`, paste `/projects/a-missing-slug` into a new tab, and refresh both. The first should show work; the second should render the branded React 404. Repeat on the actual `pages.dev` deployment after your first publish. Local preview is evidence about the application, not a live Cloudflare deployment test. Unknown SPA routes return HTTP 200 with the branded client-side 404; server-level 404 statuses would require a separate rendering/hosting approach.

## 5. Connect a domain when ready

Purchase a domain separately only if you want one. This project has not bought or reserved one.

1. Open the Pages project → **Custom domains → Set up a custom domain**.
2. Enter the real domain or subdomain you own and follow the dashboard’s current verification and DNS instructions.
3. An apex domain (for example the root of your domain) normally requires the zone to be on Cloudflare with the correct nameservers. For an externally managed subdomain, Cloudflare may direct you to add a CNAME pointing to your actual Pages address. Follow the dashboard rather than inventing DNS values, and add the domain through Pages before changing the record.
4. Wait for DNS verification and the host-managed HTTPS certificate to become active. Cloudflare generally manages HTTPS after successful domain setup; troubleshoot any pending status in the dashboard.
5. Update `site.baseUrl` in `src/content/profile.ts`. Set real absolute `og:url`, `og:image`, Twitter image, and canonical metadata in the appropriate head configuration; use a public PNG/JPEG preview for broad crawler support. Generate `public/sitemap.xml` from actual published routes and add its real URL to `public/robots.txt`.

Do not change nameservers or delete existing DNS records without understanding what uses them (such as email). See [Cloudflare’s custom-domain instructions](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## واژه‌نامهٔ ساده

| English term                | توضیح فارسی                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| Domain — دامنه              | نام سایت که در مرورگر می‌نویسید؛ باید جداگانه ثبت و تمدید شود.                                            |
| Hosting — میزبانی           | سرویسی که فایل‌های سایت را نگه می‌دارد و به بازدیدکنندگان نشان می‌دهد.                                    |
| DNS                         | دفتر راهنمای اینترنت؛ مشخص می‌کند نام دامنه به کدام سرویس وصل شود.                                        |
| GitHub                      | جایی برای نگهداری کد، تاریخچهٔ تغییرات و بررسی کارها با Pull Request.                                     |
| CI — Continuous Integration | بررسی خودکار تغییرات کد؛ مثل اجرای lint، بررسی TypeScript، تست و build.                                   |
| CD — Continuous Deployment  | انتشار خودکار نسخهٔ جدید پس از تغییر شاخهٔ مشخص، وقتی سرویس انتشار را تنظیم کرده باشید.                   |
| Build — ساخت                | تبدیل فایل‌های توسعه به فایل‌های آمادهٔ نمایش در مرورگر؛ خروجی این پروژه در پوشهٔ dist است.               |
| Deployment — انتشار         | قراردادن خروجی build روی سرویس میزبانی تا سایت قابل بازدید شود.                                           |
| Production — نسخهٔ اصلی     | نسخه‌ای از سایت که برای بازدیدکنندگان اصلی منتشر می‌شود.                                                  |
| Preview — پیش‌نمایش         | نسخهٔ جداگانه برای بررسی تغییرات پیش از انتشار در نسخهٔ اصلی.                                             |
| SSL / HTTPS                 | ارتباط رمزگذاری‌شدهٔ مرورگر با سایت؛ پس از تنظیم درست دامنه معمولاً سرویس میزبانی گواهی را مدیریت می‌کند. |
