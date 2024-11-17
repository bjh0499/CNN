export default function createBlockObj(key, url, block, check) {
  const obj = {};
  obj[key] = {
    key,
    url,
    block,
    check,
  };
  return obj;
}
