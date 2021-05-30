# JamComments

A commenting platform for self-hosted static websites.

## The problem

Websites running on the JAM stack don't have a backend, and so it's not obvious how to integrate comments into them.

Some use hosted solutions such as Disqus but these are terrible for privacy and the comments are, by design, not integrated into the website itself but rather fetched from the cloud dynamically.

Other use [Webmentions](https://github.com/aaronpk/webmention.io). This has its use cases but won't let people comment directly on one's website.

## The solution

Provide a (self-)hosted service that does the following:

1. Take a markdown-formatted comment coming from a form on the source website
2. Examine it to guess whether it's SPAM or not
3. If SPAM, flag it and put it in a review queue
4. Otherwise, trigger a (partial?) build of the website including the new comment

Provide a REST API that returns JSON with all comments for a particular post (URL).

Provide an (optional) front-end package with a commenting form.

Provide a (self-)hosted dashboard for reviewing comments that may be SPAM and either deleting or approving them.

## Concerns

### Build

It's not obvious how to trigger a build remotely. If the website is truly static and has no backend running on it, all that might be running on it is git.

Let's assume the service would call a webhook and leave the build to the implementing party.

### SPAM

Leave this part to a third-party module (Akismet?)

### Security

Since approving a comment could mean triggering a build, this could open an attack vector to the implementing website. One might want to think about throttling, or enabling manual-only builds.
