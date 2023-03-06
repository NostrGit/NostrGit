# NostrGit

A truly censorship-resistant alternative to GitHub that has a chance of working.

Read about the vision [here](https://github.com/NostrGit/NostrGit/tree/main/documentation/vision.md).

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

The NostrGit project operates an open contributor model where anyone is welcome to contribute towards development in the form of peer review, documentation, testing and patches. Anyone is invited to contribute without regard to technical experience, "expertise", OSS experience, age, or other concern.

See [contribution](https://github.com/NostrGit/NostrGit/blob/main/documentation/development/contributing.md).

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
    - [ ] New repository: serve created repository with [GitTorrent](https://github.com/cjb/GitTorrent)
    - [ ] Repo has a public key
        ```JSON
        {
            "pubkey": "abcd123...",
            "nrepo": "nrepo1ris1683fw6n2mvhl5h6dhqd8mqfv3wmxnz4qph83ua4dk4006ezsrt5c24"
        }
        ```
    - [ ] Zap a repo
        - [ ] Zap PRs
    - [ ] Rate a repo
    - [ ] Follow a repo
    - [ ] Comment on a repo
    - [ ] Add bounties
