class TrieNode<T> {
  val: T | null;
  children: (TrieNode<T> | null)[];
  constructor(range: number) {
    this.val = null;
    this.children = Array(range).fill(null);
  }
}

export { TrieNode };
