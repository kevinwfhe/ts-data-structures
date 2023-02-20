import { TrieMap } from "./TrieMap";

class TrieSet {
  private trieMap: TrieMap<string>;
  constructor() {
    this.trieMap = new TrieMap<string>();
  }
  delete(key: string): void {
    this.trieMap.delete(key);
  }
  add(key: string): void {
    this.trieMap.set(key, key);
  }
  keysWithPrefix(prefix: string): string[] {
    return this.trieMap.keysWithPrefix(prefix);
  }
  longestPrefixOf(query: string): string {
    return this.trieMap.longestPrefixOf(query);
  }
  shortestPrefixOf(query: string): string {
    return this.trieMap.shortestPrefixOf(query);
  }
  hasKeyWithPrefix(prefix: string): boolean {
    return this.trieMap.hasKeyWithPrefix(prefix);
  }
  has(key: string): boolean {
    return this.trieMap.has(key);
  }
  get size(): number {
    return this.trieMap.size;
  }
}

export { TrieSet };
