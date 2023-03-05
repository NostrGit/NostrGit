# NostrGit

a truly censorship-resistant alternative to GitHub that has a chance of working

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [ui.shadcn.com](https://ui.shadcn.com)


<a href="https://nostrgit.com"><img src="https://raw.githubusercontent.com/NostrGit/NostrGit/main/documentation/resources/frontpage.png" alt="NostrGit"></a>

# Development

Fork the repo

```bash
# install npm packages
$ npm i
# run in development mode (localhost:3000)
$ npm run dev
```

or


```bash
# install npm packages
$ yarn
# run in development mode (localhost:3000)
$ yarn dev
```

# Contributing

The codebase is maintained using the "contributor workflow" where everyone without exception contributes patch proposals using "pull requests". This facilitates social contribution, easy testing and peer review.

To contribute a patch, the worflow is a as follows:

1. Fork Repository
2. Create topic branch
    - Always use the naming conventions
        - issue/topic/spesific_topic (eg. cypherhoodlum:13/documentation/contributing)
        - issue/short_description
        - etc.
3. Commit patches
    - Keep your commit messages concise. [These](https://chris.beams.io/posts/git-commit/) guidelines should be kept in mind.
4. Create a pull request
    - Always start your pull requests with a described list (Add, Remove, Bump, etc.)
5. Be a part of the Nostr movement!


In general commits should be atomic and diffs should be easy to read. For this reason do not mix any formatting fixes or code moves with actual code changes. Further, each commit, individually, should compile and pass tests, in order to ensure git bisect and other automated tools function properly.

When adding a new feature, thought must be given to the long term technical debt. Every new feature should be covered by functional tests where possible.

When refactoring, structure your PR to make it easy to review and don't hesitate to split it into multiple small, focused PRs.

# Roadmap

UI
- [ ] Mobile Breakpoints 
- [ ] Code
    - [ ] Clone with HTTPS
    - [ ] Clone with SSH
    - [ ] Download ZIP
- [ ] Issues
    - [ ] Issues list
        - [ ] Filter by open / closed issues
    - [ ] Single issue
        - [ ] Show details about the issue
        - [ ] Commenting / comment threads
    - [ ] New issue page
- [ ] Pull Requests
    - [ ] Pull requests list
    - [ ] Single pull request page
    - [ ] New pull request page
- [ ] Discussions
- [ ] Insights
    - [ ] Repo statistics
        - Merged pull requests
        - Open pull requests
        - Closed issues
        - New issues
    - [ ] Tabs
        - [ ] Contributors
        - [ ] Commits
        - [ ] Code frequency
        - [ ] Dependency graph
        - [ ] Forks
- [ ] Settings
    - [ ] Edit repository name
    - [ ] Toggle features
        - Wikis
        - Issues
        - Discussions
        - Pull requests
            - Allow merge commits
            - Allow squash merging
            - Allow rebase merging
    - [ ] Danger zone
        - Change repo visibility
        - Transfer ownership
        - Delete repo
    - [ ] Settings tabs
        - [ ] General
        - [ ] Access (collaborators)
            - [ ] View collaborators
            - [ ] Add collaborators
            - [ ] Remove collaborators
        - [ ] Branches
            - [ ] Branch protection rules
        - [ ] Tags
        - [ ] Actions
        - [ ] Secrets and variables
    

Nostr
- [ ] Login
- [ ] Figure out decentralised data storage
