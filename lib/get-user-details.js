module.exports = getUserDetails;

const { UserNotFoundError } = require("./modules/errors");

async function getUserDetails({ octokit, username }) {
  // TODO: optimzation, if commenting user is the user we're adding we can avoid an api call
  // const commentUser = context.payload.comment.user.login
  // if (user === commentUser) {
  //     return {
  //         name: context.payload.comment.user.name
  //         avatarUrl: context.payload.comment.avatar_url
  //         profile:
  //     }
  // }

  let result;
  try {
    result = await octokit.users.getByUsername({ username });
  } catch (error) {
    /* istanbul ignore if */
    if (error.status !== 404) {
      throw error;
    }

    throw new UserNotFoundError(username);
  }

  const { avatar_url, blog, html_url, name } = result.data;

  return {
    name: name || username,
    avatar_url,
    profile: blog || html_url,
  };
}