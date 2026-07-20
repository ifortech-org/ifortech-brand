import assert from "node:assert/strict";
import { getRevalidationTargets } from "./revalidate-utils";

const pageTargets = getRevalidationTargets({
  _type: "page",
  before: {
    slug: { current: "about" },
    language: { code: "it" },
  },
});

assert(pageTargets.paths.includes("/it/about"));
assert(pageTargets.paths.includes("/it"));

const postTargets = getRevalidationTargets({
  _type: "post",
  before: {
    slug: { current: "hello-world" },
    language: { code: "en" },
  },
});

assert(postTargets.paths.includes("/en/blog"));
assert(postTargets.paths.includes("/en/blog/hello-world"));

console.log("revalidate-utils ok");
