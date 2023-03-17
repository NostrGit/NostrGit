# NostrGit

A truly censorship-resistant alternative to GitHub that has a chance of working.

Read about the vision [here](https://github.com/NostrGit/NostrGit/tree/main/documentation/vision.md).

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [ui.shadcn.com](https://ui.shadcn.com)

We use the [T3 stack](https://create.t3.gg/).

<a href="https://nostrgit.com"><img src="https://user-images.githubusercontent.com/8019099/223422735-795b4341-5751-49ce-bffb-800ee81788d2.jpg" alt="NostrGit"></a>

# How to run locally (production)

## Docker containers

Install [Docker](https://www.docker.com/products/docker-desktop/).

```bash
# clone the repository
$ git clone https://github.com/NostrGit/NostrGit.git
```

Edit the `gitnostr/Dockerfile`
  - replace the public key (hex) with your public key (hex) in the "gitRepoOwners" section of the JSON
  - optional: add/remove some relays in the "relays" section of the JSON 

```bash
# change the directory to NostrGit
$ cd NostrGit
# run the containers
$ docker compose up &
```

## git-nostr-cli

To run the cli tool for managing git repositories over nostr:

Make sure you have go installed
```bash
$ go version
```

If the command above doesnt print out something like `go version go1.20.2 linux/amd64`, you can follow [these instructions](https://go.dev/doc/install) to install go on your system.

```bash
# change directory to gitnostr
$ cd ../gitnostr/
# compile the cli tool (requires go installation)
$ make git-nostr-cli
# Run the git-nostr-cli command once to create the default config file
$ ./bin/gn
```

You should get the message `no relays connected`.

Edit the config file at `~/.config/git-nostr/git-nostr-cli.json`. The file should look something like this

```JSON
{
    "relays": ["wss://relay.damus.io", "wss://nostr.fmt.wiz.biz", "wss://nos.lol"],
    "privateKey": "", // your nostr private key (hex)
    "gitSshBase": "git-nostr@localhost" // the docker containers expect this
}
```

You need to publish your public ssh key to the nostr relays to be able to interact with the git-nostr-bridge docker container.
You may need to replace id_rsa.pub with the correct public key file.

```bash
./bin/gn ssh-key add ~/.ssh/id_rsa.pub
```

Create a test repository and clone it. replace with the hex represenation of your public key. If you are using a nip05 capable public key you can use the nip05 identifier instead.

```bash
$ ./bin/gn repo create <repo_name>
$ ./bin/gn repo clone  <publickey>:<repo_name>
```

To be able to push to the repository you can set write permission with the following command.

```bash
# public key must be in the hex format
$ ./bin/gn repo permission <repo_name> <publickey> WRITE
```

If you are using a nip05 capable public key you can use the nip05 identifier instead.

```bash
$ ./bin/gn repo permission username@relayaddr WRITE
```

# Development

Fork the repo

```bash
# install yarn packages
$ yarn
# run in development mode (localhost:3000)
$ yarn dev
```

# Questions or discussions

Have a question or a proposal? Create a [new issue](https://github.com/NostrGit/NostrGit/issues/new).

# Contributing

The NostrGit project operates an open contributor model where anyone is welcome to contribute towards development in the form of peer review, documentation, testing and patches. Anyone is invited to contribute without regard to technical experience, "expertise", OSS experience, age, or other concern.

If you are new to contributing to open source projects, please see the [Open Source Guides](https://opensource.guide/how-to-contribute/) on how to get started.

See [contribution guidelines](https://github.com/NostrGit/NostrGit/blob/main/documentation/development/contributing.md).

You may also want to check out the [bitcoin-development](https://github.com/jonatack/bitcoin-development/blob/master/how-to-review-bitcoin-core-prs.md) repository about the principles of Bitcoin development in general. Most of them apply also here. 

## Contributors

<img src="https://contrib.rocks/image?repo=nostrgit/nostrgit" alt="list of contributors" />

# Roadmap

Product

We need to define the product roadmap. We need to figure out what features we want to implement. If you have any idea, please feel free to create a new issue.

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
