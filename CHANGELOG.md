# Changelog

## 1.0.0 (2025-06-29)


### Features

* Add concurrency control to release workflow to prevent parallel executions ([7a26b70](https://github.com/KengoTODA/actions/commit/7a26b70f7513c23a9af40c59b7517e0787a7e3e9))
* Add github-comment executable installation from GitHub releases ([c9f279e](https://github.com/KengoTODA/actions/commit/c9f279e0c712df1f83721965107fb3d0df5cbe72))
* Add MIT license and implement semantic-release for automated versioning and GitHub releases ([ae720c9](https://github.com/KengoTODA/actions/commit/ae720c963a88fca7e40b7f0e033025a5fe123bf4))
* Add permissions to GitHub Actions workflow jobs ([fae9434](https://github.com/KengoTODA/actions/commit/fae9434dfeae76887b14295ed4d9ecb4b28cc56f))
* implement proper changesets/action workflow for npm-based releases ([9c99f2c](https://github.com/KengoTODA/actions/commit/9c99f2caafefe6163bea4560bc371b64888bd5c0))
* Replace semantic-release with changesets for monorepo support ([24de2d2](https://github.com/KengoTODA/actions/commit/24de2d2c4c8985235d935317f3d967e05d3304d6))
* Update github-comment action inputs and add environment variables ([74e0094](https://github.com/KengoTODA/actions/commit/74e009401dde5bfb19d9b585d99623e9d51471fc))


### Bug Fixes

* Add .prettierignore to exclude dist/ directories from formatting checks ([665fff3](https://github.com/KengoTODA/actions/commit/665fff3bb61e6d73502be38aecfc6255bb7c89cb))
* add GITHUB_TOKEN env var to github-comment smoke test ([6774281](https://github.com/KengoTODA/actions/commit/67742819ceb9f99638027f73068fc479d0d9bc01))
* add missing .release-please-manifest.json file ([0e1c008](https://github.com/KengoTODA/actions/commit/0e1c008ca70471a2ade7996f00b9d518bbb1245a))
* add missing .release-please-manifest.json file ([07c7f58](https://github.com/KengoTODA/actions/commit/07c7f58505b0197922508567e7626856f95c5e6f))
* format code with prettier and upgrade ESLint to v9.30.0 with new config ([fb0182e](https://github.com/KengoTODA/actions/commit/fb0182e865a90e73f0cc589bb02985f716e06838))
* update README.md and add smoke test for github-comment action ([2cc1228](https://github.com/KengoTODA/actions/commit/2cc12281c1ce1f257c4ed1f9d2bdc05e52de8c9e))
* update release-please action to use googleapis/release-please-action ([a6bdb1b](https://github.com/KengoTODA/actions/commit/a6bdb1b129f325e6f431d1cb9bb6d0dbd4c65238))
* update release-please workflow to use RELEASE_PLEASE_TOKEN ([cc24997](https://github.com/KengoTODA/actions/commit/cc249972631af5459d2ef8cd8b8001526f46f135))
* update release-please workflow to use RELEASE_PLEASE_TOKEN ([08b6499](https://github.com/KengoTODA/actions/commit/08b64993aff45ce8a56aeb89762dcf1a9ffe105e))
* use GITHUB_TOKEN with explicit permissions instead of PAT ([f9c3640](https://github.com/KengoTODA/actions/commit/f9c3640b80bbacf39767f4cd05ae48918bf8eb20))
* use github-comment built-in template variables instead of env vars ([e29b270](https://github.com/KengoTODA/actions/commit/e29b2709abafb7a1f8d9404a7f6f8e8d458568e1))
* Use head ref for checkout to avoid merge commit in CI workflow ([175e04a](https://github.com/KengoTODA/actions/commit/175e04addc3ae2ada1c7ff56be37bd207e44f504))
* Use HEAD:branch syntax for git push in CI workflow to handle detached HEAD state ([73d835d](https://github.com/KengoTODA/actions/commit/73d835ddf8921820aff32b01e017982eaccf9ec5))
