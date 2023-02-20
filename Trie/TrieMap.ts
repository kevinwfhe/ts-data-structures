import { TrieNode } from "./TrieNode";

class TrieMap<T> {
  private __size: number;
  private root: TrieNode<T> | null;
  private static range = 26;
  constructor() {
    this.size = 0;
    this.root = new TrieNode<T>(TrieMap.range);
  }

  delete(key: string) {
    if (!this.has(key)) {
      return;
    }
    this.deleteKey(this.root as TrieNode<T>, key, 0);
    this.size -= 1;
  }

  set(key: string, val: T) {
    if (!this.has(key)) {
      this.size += 1;
    }
    this.root = this.setKey(this.root, key, val, 0);
  }

  // return all the keys that has prefix as prefix
  keysWithPrefix(prefix: string) {
    let res = [];
    const node = this.getNode(this.root, prefix);
    if (node === null) {
      return res;
    }
    this.collectKeys(node, prefix.split(""), res);
    return res;
  }

  // return the longest key that has common prefix with query it there's any
  longestPrefixOf(query: string) {
    let node = this.root;
    let len = 0;
    for (let i = 0; i < query.length; i++) {
      if (node === null) {
        break;
      }
      if (node.val !== null) {
        len = i;
      }
      const charIndex = query.charCodeAt(i) - 97;
      node = node.children[charIndex];
    }
    if (node !== null && node.val !== null) {
      return query;
    }
    return query.substring(0, len);
  }

  // return the shortest key that has common prefix with query it there's any
  shortestPrefixOf(query: string) {
    let node = this.root;
    for (let i = 0; i < query.length; i++) {
      if (node === null) {
        return "";
      }
      if (node.val !== null) {
        return query.substring(0, i);
      }
      const charIndex = query.charCodeAt(i) - 97;
      node = node.children[charIndex];
    }
    if (node !== null && node.val !== null) {
      return query;
    }
    return "";
  }

  hasKeyWithPrefix(prefix: string) {
    return this.getNode(this.root, prefix) !== null;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  get(key: string): T | null {
    const node = this.getNode(this.root, key);
    if (node === null || node.val === null) {
      // if node === null, means this path doesn't exist
      // if node.val === null, means the path might exist,
      // but there's no corresponding value to the key
      return null;
    }
    return node.val;
  }

  get size() {
    return this.__size;
  }

  private set size(sz: number) {
    this.__size = sz;
  }

  private getNode(root: TrieNode<T> | null, key: string) {
    let node = root;
    for (let i = 0; i < key.length; i++) {
      if (node === null) return null;
      const charIndex = key.charCodeAt(i) - 97;
      node = node.children[charIndex];
    }
    return node;
  }

  private collectKeys(node: TrieNode<T> | null, path: string[], res: string[]) {
    if (node === null) {
      return;
    }
    if (node.val !== null) {
      res.push(path.join(""));
    }
    for (let char = 0; char < TrieMap.range; char++) {
      path.push(String.fromCharCode(char + 97));
      this.collectKeys(node.children[char], path, res);
      path.pop();
    }
  }

  private setKey(node: TrieNode<T> | null, key: string, val: T, i: number) {
    if (node === null) {
      node = new TrieNode<T>(TrieMap.range);
    }
    if (i === key.length) {
      node.val = val;
      return node;
    }
    const charIndex = key.charCodeAt(i) - 97;
    node.children[charIndex] = this.setKey(
      node.children[charIndex],
      key,
      val,
      i + 1
    );
    return node;
  }

  private deleteKey(node: TrieNode<T>, key: string, i: number) {
    if (i === key.length) {
      node.val = null;
    } else {
      const charIndex = key.charCodeAt(i) - 97;
      node.children[charIndex] = this.deleteKey(
        node.children[charIndex] as TrieNode<T>,
        key,
        i + 1
      );
    }
    if (node.val !== null) {
      return node;
    }
    for (let char = 0; char < 26; char++) {
      if (node.children[char] !== null) {
        return node;
      }
    }
    return null;
  }
}

export { TrieMap };
