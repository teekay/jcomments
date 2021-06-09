# JamComments

A commenting platform for self-hosted static websites.

## The problem

Websites running on the JAM stack don't have a backend, and so it's not obvious how to integrate comments into them.

Some use hosted solutions such as Disqus but these are terrible for privacy and the comments are, by design, not integrated into the website itself but rather fetched from the cloud dynamically.

Other use [Webmentions](https://github.com/aaronpk/webmention.io). This has its use cases but won't let people comment directly on one's website.

## The solution

Provide a (self-)hosted service that does the following:

1. Take a comment coming from a form on the source website
2. Examine it to guess whether it's SPAM or not. If SPAM, flag it and put it in a review queue.
3. Call a webhook when a new comment arrives
4. Provide JSON with all comments for a particular post (URL).
5. Provide an (optional) front-end package with a commenting form.
6. Provide a (self-)hosted dashboard for reviewing comments that may be SPAM and either deleting or approving them.

The implementing party can fetch the JSON with the comments and bake the comments into the post, eliminating the need for fetching them dynamically next time. It follow that the API would need to support range queries so that it would not return comments that are already statically built.

## Tech stack

The prototype is built with Typescript using the NestJS framework and PostgreSQL for data storage. Spam detection is delegated to Akismet (optional).

### CLI

The command-line module gives you an option to create user accounts and assign or revoke access tokens.

### Web API

The API module exposes a REST interface that accepts incoming comments and returns comments associated with an account or also with a specific post / page.

### Admin interface

This module exposes a web dashboard where each user account can manage settings, view and manage comments, and deal with the SPAM queue.

## Integrations

The prototype now features a sample integration with [Eleventy](https://www.11ty.dev/). More integrations to follow.
