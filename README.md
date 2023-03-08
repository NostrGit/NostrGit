# NostrGit

A truly censorship-resistant alternative to GitHub that has a chance of working.

Read about the vision [here](https://github.com/NostrGit/NostrGit/tree/main/documentation/vision.md).

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [ui.shadcn.com](https://ui.shadcn.com)

<a href="https://nostrgit.com"><img src="https://user-images.githubusercontent.com/8019099/223422735-795b4341-5751-49ce-bffb-800ee81788d2.jpg" alt="NostrGit"></a>

# Development

Fork the repo

```bash
# install npm packages
$ yarn
# run in development mode (localhost:3000)
$ yarn dev
```

# Questions or Discussions

Have a question or a proposal? Create a [new discussion](https://github.com/NostrGit/NostrGit/discussions/new?category=general) first

# Contributing

The NostrGit project operates an open contributor model where anyone is welcome to contribute towards development in the form of peer review, documentation, testing and patches. Anyone is invited to contribute without regard to technical experience, "expertise", OSS experience, age, or other concern.

See [contribution guidelines](https://github.com/NostrGit/NostrGit/blob/main/documentation/development/contributing.md).

## Contributors

<img src="https://contrib.rocks/image?repo=nostrgit/nostrgit" alt="list of contributors" />

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

Special Thanks

<a href="https://vercel.com?utm_source=nostrgit&utm_campaign=oss"><img src="https://images.ctfassets.net/e5382hct74si/78Olo8EZRdUlcDUFQvnzG7/fa4cdb6dc04c40fceac194134788a0e2/1618983297-powered-by-vercel.svg" />
