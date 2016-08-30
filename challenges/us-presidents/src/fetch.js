import isomorphicfetch from 'isomorphic-fetch';


/*
 * exported for tests only.
 */
export function _fetch(delegate, input, init) {
  return delegate(input, init).then(response => {
    if (response.status >= 400) {
      return promise.reject({ status: response.status, response });
    }
    return response;
  });
}

/*
 * handles http response with status code 4xx or 5xx as errors, like super agent does:
 *
 * http://visionmedia.github.io/superagent/#error-handling
 * -------------------------------------------------------
 * note that a 4xx or 5xx response with super agent are considered an error by default. for
 * example if you get a 500 or 403 response, this status information will be available via
 * err.status. errors from such responses also contain an err.response field with all of the
 * properties mentioned in "response properties". the library behaves in this way to handle
 * the common case of wanting success responses and treating http error status codes as
 * errors while still allowing for custom logic around specific error conditions.
 *
 * network failures, timeouts, and other errors that produce no response will contain no
 * err.status or err.response fields.
 */
export default function fetch(input, init) {
  return _fetch(isomorphicfetch, input, init);
}
