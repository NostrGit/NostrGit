# Contributing to NostrGit

The NostrGit project operates an open contributor model where anyone is welcome to contribute towards development in the form of peer review, documentation, testing and patches.
Anyone is invited to contribute without regard to technical experience, "expertise", OSS experience, age, or other concern.

# Communications Channels

All communication happens openly, using github issues, PRs, and Nostr. This ensures that hidden information does not exist, which makes contributing much easier. Please post your nostr public key [here](https://github.com/NostrGit/NostrGit/issues/19) to be noticed on nostr by the team.

# Contribution Workflow

The codebase is maintained using the "contributor workflow" where everyone without exception contributes patch proposals using "pull requests". This facilitates social contribution, easy testing and peer review.

To contribute a patch, the worflow is a as follows:

1. Fork Repository
2. Create topic branch
    - Always use the naming conventions
        - issue/topic/spesific-topic (eg. cypherhoodlum:13/documentation/contributing)
        - issue/short-description
        - etc.
3. Commit patches
    - Keep your commit messages concise. [These](https://chris.beams.io/posts/git-commit/) guidelines should be kept in mind.
4. Create a pull request
    - Always start your pull requests with a described list (Add, Remove, Bump, etc.)
5. Be a part of the Nostr movement!


In general commits should be atomic and diffs should be easy to read. For this reason do not mix any formatting fixes or code moves with actual code changes. Further, each commit, individually, should compile and pass tests, in order to ensure git bisect and other automated tools function properly.

When adding a new feature, thought must be given to the long term technical debt. Every new feature should be covered by functional tests where possible.

When refactoring, structure your PR to make it easy to review and don't hesitate to split it into multiple small, focused PRs.

## Peer review

Anyone may participate in peer review which is expressed by comments in the pull request. Typically reviewers will review the code for obvious errors, as well as test out the patch set and opine on the technical merits of the patch. PR should be reviewed first on the conceptual level before focusing on code style or grammar fixes.

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
const home = () => {}
```

# UI

When designing the visual style of components, [shadcn](https://ui.shadcn.com/) should always be used when possible.
