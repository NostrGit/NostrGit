# The vision

## Repositories

The vision is to be able to interact with git repositories completely on Nostr. Commenting, creating pull requests, zapping repos, zapping pull requests, zapping issues, it should all happen over Nostr. Being able to zap everything will give a major incentive to participate in FOSS projects in many different ways.

We want every repo to be able to interact with the nostr network. Repo deployments should be able to interact with nostr. Nostr users should be able to interact with repos via Nostr, and interact with deployments via Nostr. Zap a repo, rate a repo, follow a repo, comment on a repo, add bounties. Vote on how code evolves. Have batteries for automated agents so they can keep running etc.

Repos should have keys like normal nostr users. This makes it easy for a repo to have nip5, description, and a profile photo.

```JSON
{
    "pubkey": "abcd123...",
    "nrepo": "nrepo1ris1683fw6n2mvhl5h6dhqd8mqfv3wmxnz4qph83ua4dk4006ezsrt5c24"
}
```

It should be possible to clone a repository like this:

```bash
$ git clone nrepo1ris1683fw6n2mvhl5h6dhqd8mqfv3wmxnz4qph83ua4dk4006ezsrt5c24
```

And link repos like nostrgit.com/nrepo1ris1683fw6n2mvhl5h6dhqd8mqfv3wmxnz4qph83ua4dk4006ezsrt5c24

The npub and nrepo are just the same bech32 encoding of a public key. But nrepo gives you a strong hint that we are dealing with a repo. That in turn can help you choose which relays to query and which filters to apply.

What we have in mind for nrepo:

- paste in an input box and it brings up the whole history of the repo
- clone it with a CLI command and you get the latest code
- run an info command to get a history of the repo
- plug it into a continuous deployment tool and run the code
- put it in a live environment (e.g. docker) and it runs, but can also get live updates
- testing in local environments, live updates happen as you code
- more stuff

## Nostr

Read about the vision of Nostr [here](https://github.com/NostrGit/NostrGit/blob/main/documentation/development/nostr.md).
