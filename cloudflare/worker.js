export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return assetResponse;
    }

    const hasFileExtension = /\/[^/]+\.[^/]+$/.test(url.pathname);
    if (hasFileExtension) {
      return assetResponse;
    }

    url.pathname = "/index.html";
    return env.ASSETS.fetch(new Request(url.toString(), request));
  },
};
