import queryTransform from "query-string";

export default function parseSearch(string) {
  return queryTransform.parse(string);
}
