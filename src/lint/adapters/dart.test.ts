import { describe, expect, it } from "bun:test";

import { createDartAdapter } from "./dart";

describe("DartAdapter.supports", () => {
  const adapter = createDartAdapter();

  it("returns true for .dart files", () => {
    expect(adapter.supports("main.dart")).toBe(true);
    expect(adapter.supports("/path/to/lib.dart")).toBe(true);
    expect(adapter.supports("src/utils.dart")).toBe(true);
  });

  it("returns false for .ts files", () => {
    expect(adapter.supports("main.ts")).toBe(false);
    expect(adapter.supports("src/index.ts")).toBe(false);
  });

  it("returns false for .py files", () => {
    expect(adapter.supports("main.py")).toBe(false);
    expect(adapter.supports("src/utils.py")).toBe(false);
  });

  it("returns false for .rb files", () => {
    expect(adapter.supports("main.rb")).toBe(false);
    expect(adapter.supports("src/utils.rb")).toBe(false);
  });
});

describe("DartAdapter", () => {
  const adapter = createDartAdapter();

  it("has adapter ID 'dart'", () => {
    expect(adapter.id).toBe("dart");
  });

  it("throws an error when dart CLI is not available", () => {
    // If dart is not on PATH, analyze() should throw a descriptive error.
    // We attempt the call in a try/catch to handle environments without dart.
    try {
      const result = adapter.analyze("test.dart", "void main() {}");
      // If we reach here, dart is installed and we got a valid result.
      expect(result).toBeDefined();
      expect(result.adapterId).toBe("dart");
    } catch (e) {
      expect((e as Error).message).toContain("Dart adapter requires `dart` on PATH");
    }
  });
});
