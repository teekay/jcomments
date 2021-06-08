"use strict";

/**
 * This function would fetch the comments authored after the last build date.
 * The script is supposed to be pre-processed by the template engine such that
 * the `COMMENTS_API_URL` and `COMMENTS_API_TOKEN` values can be injected.
 * 
 * In Eleventy, these two can be configured like this:
 * https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables
 * 
 * If you've changed the class names in `shortcodes.js`, also change them here.
 */
async function latestComments() {
  let commentSection = document.querySelector('.comments');
  let comments = Array.from(document.querySelectorAll('.comment'));
  let lastComment = comments[comments.length - 1];
  let lastCommentId = lastComment ? lastComment.getAttribute('data-id') : '';
  let response = await fetch(`{{ COMMENTS_API_URL }}/${encodeURIComponent(document.location)}?since=${lastCommentId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {{ COMMENTS_API_TOKEN }}'
    }
  });
  let newComments = await response.json();
  newComments.forEach(c => {
    let template = document.createElement('article');
    template.classList.add('comment');
    template.setAttribute('data-id', c.id);
    let pDate = document.createElement('p');
    pDate.classList.add('comment-date');
    pDate.innerHTML = c.postedAt; // format the date as you'd like
    template.appendChild(pDate);
    let pText = document.createElement('p');
    pText.classList.add('comment-text');
    pText.innerHTML = c.text; // beware XSS injection, bad HTML, etc.
    template.appendChild(pText);
    let pAuthor = document.createElement('p');
    pAuthor.classList.add('comment-author');
    pAuthor.innerHTML = c.author.name; // or also show commenter's website, email...
    template.appendChild(pAuthor);
    commentSection.appendChild(template);
  });
}