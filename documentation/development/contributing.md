# Contributing to NostrHub

The NostrHub project operates an open contributor model where anyone is welcome to contribute towards development in the form of peer review, documentation, testing and patches.
Anyone is invited to contribute without regard to technical experience, "expertise", OSS experience, age, or other concern.

# Communications Channels

All communication happens openly, using github issues, PRs, and Nostr. This ensures that hidden information does not exist, which makes contributing much easier. Please post your nostr public key [here](https://github.com/NostrGit/NostrGit/issues/19) to be noticed on nostr by the team.

# Contribution Workflow

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

# Coding conventions

TBA

