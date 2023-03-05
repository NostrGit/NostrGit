# NostrGit

a truly censorship-resistant alternative to GitHub that has a chance of working

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [ui.shadcn.com](https://ui.shadcn.com)


<a href="https://nostrgit.com"><img src="https://user-images.githubusercontent.com/8019099/222984779-5afbd000-680f-42ee-9b99-2ae7f562d17d.jpg" alt="NostrGit"></a>

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

For core members: always open an issue first, and the the branch:

![Create Branch](https://user-images.githubusercontent.com/8019099/222988401-6528471b-8490-4ddf-b54c-4e8b7675a6a8.jpg)

- Be sure to [check the "Allow edits from maintainers" option](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) while creating you PR.
- If your PR refers to or fixes an issue, be sure to add `refs #XXX` or `fixes #XXX` to the PR description. Replacing `XXX` with the respective issue number. See more about [Linking a pull request to an issue
  ](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
- Be sure to fill the PR Template accordingly.

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
