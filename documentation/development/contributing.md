# Contributing to NostrGit

The NostrGit project operates an open contributor model where anyone is welcome to contribute towards development in the form of peer review, documentation, testing and patches.
Anyone is invited to contribute without regard to technical experience, "expertise", OSS experience, age, or other concern.

# Communications Channels

All communication happens openly, using github issues, PRs, and Nostr. This ensures that hidden information does not exist, which makes contributing much easier. Please post your nostr public key [here](https://github.com/NostrGit/NostrGit/issues/19) to be noticed on nostr by the team.

Do not use Discussions, only Issues. They are much easier to track.

# Contribution Workflow

The codebase is maintained using the "contributor workflow" where everyone without exception contributes patch proposals using "pull requests". This facilitates social contribution, easy testing and peer review.

To contribute a patch, the worflow is a as follows:

1. Fork Repository
2. Create topic branch
   - Always use the naming conventions
     - feature/fix/documentation/core/bump/remove (eg. core/add-huskyjs)
3. Commit patches
   - Keep your commit messages concise. [These](https://chris.beams.io/posts/git-commit/) guidelines should be kept in mind.
4. Create a pull request
   - By default use the PR template when creating pull requests
     - ![PR template](https://github.com/NostrGit/NostrGit/blob/main/documentation/resources/pr_template.png)
   - Always start your pull requests with a described list (Add, Remove, Bump, etc.)
   - Including screenshots or [loom](https://www.loom.com/) videos into PRs is highly recommended. This helps the reviewing process immensely, especially from casual contributions.
     - After you have signed up to [loom](https://www.loom.com/), you can record short videos easily of your screen to showcase what you have done. The videos can be shared by embedding a link to the PR.
5. Be a part of the Nostr movement!

In general commits should be atomic and diffs should be easy to read. For this reason do not mix any formatting fixes or code moves with actual code changes. Further, each commit, individually, should compile and pass tests, in order to ensure git bisect and other automated tools function properly.

When adding a new feature, thought must be given to the long term technical debt. Every new feature should be covered by functional tests where possible.

When refactoring, structure your PR to make it easy to review and don't hesitate to split it into multiple small, focused PRs.

## Troubleshooting Vercel

We are using [Vercel](https://vercel.com/) to deploy our code.

If Vercel fails to deploy your branch, and you cannot see why, try running the following command locally:
```bash
  $ yarn build
```
It should show you the relevant error message.

## Development

Fork the repo

```bash
# install npm packages
$ yarn
# run in development mode (localhost:3000)
$ yarn dev
```

If you use npm instead of yarn, make sure not to include package-lock.json in the commits.

## Tooling

We use [prettier](https://prettier.io/) to format our code. It is recommended to use the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for VSCode. We also use `@trivago/prettier-plugin-sort-imports` to sort our imports.

## Peer review

Anyone may participate in peer review which is expressed by comments in the pull request. Typically reviewers will review the code for obvious errors, as well as test out the patch set and opine on the technical merits of the patch. PR should be reviewed first on the conceptual level before focusing on code style or grammar fixes.

Please describe the changes you made in the PR description using the `pull_request_template.md` file.

## About Github Actions

You may notice that we have enable required Github Actions for all PRs. This is to ensure that all PRs are tested before merging. The actions are as follows:

- prettier
- eslint

Others will be added in the future.

## For core members

Always open an issue first, and then the branch. It makes organising branches much easier. The exeptions are very simple PRs such as updates to the documentation when creating a separate issue would just complicate the peer review.

<img src="https://user-images.githubusercontent.com/8019099/222988401-6528471b-8490-4ddf-b54c-4e8b7675a6a8.jpg" alt="Create Branch" width="450px" height="auto" />

- Be sure to [check the "Allow edits from maintainers" option](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) while creating you PR.
- If your PR refers to or fixes an issue, be sure to add `refs #XXX` or `fixes #XXX` to the PR description. Replacing `XXX` with the respective issue number. See more about [Linking a pull request to an issue
  ](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
- Be sure to fill the PR Template accordingly.

# Coding conventions

Use function components instead of arrow functions.

This :

```javascript
function Home() {}
```

instead of this :

```javascript
const home = () => {};
```

```javascript
// bad
<Link onClick={(e) => e.currentTarget.Value}>Click me</Link>;
// good
const handleClick = useCallback((e) => e.currentTarget.Value, []);
<Link onClick={handleClick}>Click me</Link>;
```

## UI

When designing the visual style of components, [shadcn](https://ui.shadcn.com/) should always be used when possible.
