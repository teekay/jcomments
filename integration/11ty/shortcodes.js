"use strict"

/**
 * This function adds a Nunjucks shortcode that embeds comments into a page or post.
 * Edit according to your specific configuration.
 * 
 * You can then call it in a layout / template like this:
 * 
 * ```
 *  {% comments metadata.url, page.url %}
 *  ```
 *  (Replacing `metadata.url` with the website root as defined in your metadata)
 * 
 * If you would rather fetch all comments for your website, call `COMMENTS_API_URL`
 * without appending the page URL, cache them locally as JSON and process them as you see fit.
 * 
 * Dependencies:
 * - node-fetch
 * 
 * @param {*} eleventyConfig 
 */
function addShortcodes(eleventyConfig) {
  /**
   * This function returns HTML with a single comment.
   * 
   * You will want to customize it to match your preferences.
   * 
   * Available fields: see /src/comments/comment.interface.ts
   * 
   * @param {*} comment 
   * @returns 
   */
    function commentArticle(comment) {
      return `
      <article class="comment" data-id="${comment.id}">
        <p class="comment-date">${comment.postedAt}</p>
        <p class="comment-text">
          ${comment.text}
        </p>
        <p class="comment-author">
          ${comment.author.name}
        </p>
      </article>`;
  }

  eleventyConfig.addNunjucksAsyncShortcode("commentsForPage", async (baseUrl, permalink) => {
    try {
      // assumption: `permalink` is relative, `baseUrl` is the website root
      const response = await fetch(`${process.env['COMMENTS_API_URL']}/${encodeURIComponent(baseUrl+permalink)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env['COMMENTS_API_TOKEN']}`
        }
      });
      const comments = await response.json();
      
      return `<section class="comments">
      ${comments.map(commentArticle).join("")}
      </section>`;
    } catch (oops) {
      console.error(oops);
      return "";
    }
  });
}