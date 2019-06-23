

export function splitAt(value, index) {
  return [
    value.substring(0, index),
    value.substring(index + 1)
  ];
}


String.prototype.hashCode = function() {
  var hash = 0,
    i,
    chr;
  if (this.length === 0)
    return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
