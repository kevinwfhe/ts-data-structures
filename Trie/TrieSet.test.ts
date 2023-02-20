import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { TrieSet } from "./TrieSet";

describe("TrieSet", () => {
  test("Add key to set", () => {
    const ts = new TrieSet();

    expect(ts.has("abcd")).toBeFalsy();
    ts.add("abcd");
    expect(ts.has("abcd")).toBeTruthy();
  });

  test("Delete key in set", () => {
    const ts = new TrieSet();

    ts.delete("abcd");
    expect(ts.size).toBe(0);

    ts.add("abcd");
    expect(ts.has("abcd")).toBeTruthy();

    ts.delete("abc");
    expect(ts.has("abcd")).toBeTruthy();
    expect(ts.size).toBe(1);

    ts.add("abc");
    expect(ts.size).toBe(2);
    ts.delete("abc");
    expect(ts.has("abcd")).toBeTruthy();
    expect(ts.size).toBe(1);

    ts.delete("abcd");
    expect(ts.has("abcd")).toBeFalsy();
    expect(ts.size).toBe(0);

    ts.add("abc");
    ts.add("abcd");
    ts.delete("abcd");
    expect(ts.has("abcd")).toBeFalsy();
  });

  test("Keys has a specific prefix", () => {
    const ts = new TrieSet();
    ts.add("tire");
    ts.add("tiger");
    ts.add("tiring");
    ts.add("tight");
    ts.add("teaching");

    expect(ts.keysWithPrefix("tir").join(",")).toBe("tire,tiring");
    expect(ts.keysWithPrefix("tig").join(",")).toBe("tiger,tight");
    expect(ts.keysWithPrefix("ti").join(",")).toBe("tiger,tight,tire,tiring");
    expect(ts.keysWithPrefix("t").join(",")).toBe(
      "teaching,tiger,tight,tire,tiring"
    );

    expect(ts.keysWithPrefix("tired").join(",")).toBe("");
  });

  test("Contain keys that have a specific prefix", () => {
    const ts = new TrieSet();
    ts.add("tire");
    ts.add("tiger");
    ts.add("tiring");
    ts.add("tight");
    ts.add("teaching");

    expect(ts.hasKeyWithPrefix("teach")).toBeTruthy();
    expect(ts.hasKeyWithPrefix("tig")).toBeTruthy();
    expect(ts.hasKeyWithPrefix("ti")).toBeTruthy();
    expect(ts.hasKeyWithPrefix("t")).toBeTruthy();
    expect(ts.hasKeyWithPrefix("")).toBeTruthy();

    expect(ts.hasKeyWithPrefix("tr")).toBeFalsy();
    expect(ts.hasKeyWithPrefix("tired")).toBeFalsy();
    expect(ts.hasKeyWithPrefix("teacher")).toBeFalsy();
  });

  test("Longest key that is a prefix of a specific query", () => {
    const ts = new TrieSet();
    ts.add("head");
    ts.add("phone");
    expect(ts.longestPrefixOf("headphone")).toBe("head");

    ts.add("headphones");
    // becasue "headphone" is not a key in the map
    expect(ts.longestPrefixOf("headphone")).toBe("head");

    ts.add("headphone");
    expect(ts.longestPrefixOf("headphone")).toBe("headphone");

    ts.delete("head");
    ts.delete("phone");
    ts.delete("headphone");
    ts.delete("headphones");
    expect(ts.longestPrefixOf("headphone")).toBe("");
  });

  test("Shortest key that is a prefix of a specific query", () => {
    const ts = new TrieSet();
    ts.add("key");
    ts.add("keycap");
    expect(ts.shortestPrefixOf("keycaps")).toBe("key");

    ts.add("k");
    expect(ts.shortestPrefixOf("keycaps")).toBe("k");

    ts.delete("k");
    ts.delete("key");
    expect(ts.shortestPrefixOf("keycaps")).toBe("keycap");

    ts.delete("keycap");
    ts.add("keycaps");
    expect(ts.shortestPrefixOf("keycaps")).toBe("keycaps");

    ts.delete("keycaps");
    expect(ts.shortestPrefixOf("keycaps")).toBe("");

    expect(ts.shortestPrefixOf("")).toBe("");
  });
});
