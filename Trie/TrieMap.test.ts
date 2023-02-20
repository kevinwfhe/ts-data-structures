import { describe, expect, test, jest, beforeEach } from "@jest/globals";
import { TrieMap } from "./TrieMap";

describe("TrieMap", () => {
  test("Add and update key to map", () => {
    const tm = new TrieMap<number>();

    tm.set("abcd", 1);
    expect(tm.get("abcd")).toBe(1);
    expect(tm.size).toBe(1);

    tm.set("abcd", 2);
    expect(tm.get("abcd")).toBe(2);
    expect(tm.size).toBe(1);
  });

  test("Has key in map", () => {
    const tm = new TrieMap<number>();

    expect(tm.has("abcd")).toBeFalsy();
    tm.set("abcd", 1);
    expect(tm.has("abcd")).toBeTruthy();
  });

  test("Delete key in map", () => {
    const tm = new TrieMap<number>();

    tm.delete("abcd");
    expect(tm.size).toBe(0);

    tm.set("abcd", 1);
    expect(tm.has("abcd")).toBeTruthy();

    tm.delete("abc");
    expect(tm.has("abcd")).toBeTruthy();
    expect(tm.size).toBe(1);

    tm.set("abc", 2);
    expect(tm.size).toBe(2);
    tm.delete("abc");
    expect(tm.has("abcd")).toBeTruthy();
    expect(tm.size).toBe(1);

    tm.delete("abcd");
    expect(tm.has("abcd")).toBeFalsy();
    expect(tm.size).toBe(0);

    tm.set("abc", 1)
    tm.set("abcd", 1)
    tm.delete("abcd")
    expect(tm.has("abcd")).toBeFalsy()
    
  });

  test("Get key in map", () => {
    const tm = new TrieMap<number>();

    expect(tm.get("abcd")).toBeNull();

    tm.set("abc", 1);
    expect(tm.get("abcd")).toBeNull();

    tm.set("abcd", 2);
    expect(tm.get("abc")).toBe(1);
    expect(tm.get("abcd")).toBe(2);

    tm.delete("abc");
    expect(tm.get("abc")).toBeNull();
    expect(tm.get("abcd")).toBe(2);

    tm.delete("abcd");
    expect(tm.get("abcd")).toBeNull();
  });

  test("Keys has a specific prefix", () => {
    const tm = new TrieMap<number>();
    tm.set("tire", 1);
    tm.set("tiger", 2);
    tm.set("tiring", 3);
    tm.set("tight", 4);
    tm.set("teaching", 5);

    expect(tm.keysWithPrefix("tir").join(",")).toBe("tire,tiring");
    expect(tm.keysWithPrefix("tig").join(",")).toBe("tiger,tight");
    expect(tm.keysWithPrefix("ti").join(",")).toBe("tiger,tight,tire,tiring");
    expect(tm.keysWithPrefix("t").join(",")).toBe(
      "teaching,tiger,tight,tire,tiring"
    );

    expect(tm.keysWithPrefix("tired").join(",")).toBe("");
  });

  test("Contain keys that have a specific prefix", () => {
    const tm = new TrieMap<number>();
    tm.set("tire", 1);
    tm.set("tiger", 2);
    tm.set("tiring", 3);
    tm.set("tight", 4);
    tm.set("teaching", 5);

    expect(tm.hasKeyWithPrefix("teach")).toBeTruthy();
    expect(tm.hasKeyWithPrefix("tig")).toBeTruthy();
    expect(tm.hasKeyWithPrefix("ti")).toBeTruthy();
    expect(tm.hasKeyWithPrefix("t")).toBeTruthy();
    expect(tm.hasKeyWithPrefix("")).toBeTruthy();

    expect(tm.hasKeyWithPrefix("tr")).toBeFalsy();
    expect(tm.hasKeyWithPrefix("tired")).toBeFalsy();
    expect(tm.hasKeyWithPrefix("teacher")).toBeFalsy();
  });

  test("Longest key that is a prefix of a specific query", () => {
    const tm = new TrieMap<number>();
    tm.set("head", 1);
    tm.set("phone", 2);
    expect(tm.longestPrefixOf("headphone")).toBe("head");

    tm.set("headphones", 3);
    // becasue "headphone" is not a key in the map
    expect(tm.longestPrefixOf("headphone")).toBe("head");

    tm.set("headphone", 4);
    expect(tm.longestPrefixOf("headphone")).toBe("headphone");

    tm.delete("head");
    tm.delete("phone");
    tm.delete("headphone");
    tm.delete("headphones");
    expect(tm.longestPrefixOf("headphone")).toBe("");
  });

  test("Shortest key that is a prefix of a specific query", () => {
    const tm = new TrieMap<number>();
    tm.set("key", 1);
    tm.set("keycap", 2);
    expect(tm.shortestPrefixOf("keycaps")).toBe("key");

    tm.set("k", 3);
    expect(tm.shortestPrefixOf("keycaps")).toBe("k");

    tm.delete("k");
    tm.delete("key");
    expect(tm.shortestPrefixOf("keycaps")).toBe("keycap");
    
    tm.delete("keycap");
    tm.set("keycaps", 4);
    expect(tm.shortestPrefixOf("keycaps")).toBe("keycaps");

    tm.delete("keycaps")
    expect(tm.shortestPrefixOf("keycaps")).toBe("");

    expect(tm.shortestPrefixOf("")).toBe("");
  });
});
