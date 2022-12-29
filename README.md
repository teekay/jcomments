<img src="https://github.com/teekay/JamComments/blob/master/jcomments_logo.svg" style="width: 210px;"/>

A commenting platform for self-hosted static websites. Currently, it integrates with Eleventy, the static site generator, using the [first-party](https://github.com/teekay/eleventy-plugin-jcomments)[ plugin](https://github.com/teekay/eleventy-plugin-jcomments).

## Why use it

There are a few commenting platforms you can use on a static website like Commento or Disqus. Typically, you'll embed a JavaScript file in your HTML files, and the browser fetches the comments dynamically as the web page loads.

This app takes a different approach, motivated by a desire to "own your data."

It encourages the publisher to make an API call during website build to fetch existing comments such that they can be embedded in the final HTML.

The browser can still request comments made after the last build.

Using this technique, the publisher has protection against outages, network interruptions, etc. The website visitor sees the comments sooner.

## When to use it

The app is for publishers of websites with a small or moderate number of comments per day.

The feature set is rudimentary. There are no threads, voting, emojis, replies, etc.

If you supply your own Akismet API key, the app will watch out for comment SPAM and put suspicious comments on an approval queue. You can review, approve, or delete all comments using the web dashboard.

The app can also notify you about new comments via e-mail.

That's it! If you need more, you can raise an issue.

## Hosting

You can self-host the app anywhere. You need Node.js (v14 and up) and PostgreSQL. For e-mail notifications, you need a Mailgun API key.

You can also host this in Azure. Have a look at the [docs](./AZURE.md).

## Tech stack

The prototype is built with Typescript using the NestJS framework and PostgreSQL for data storage. Spam detection is delegated to Akismet (optional but recommended).
