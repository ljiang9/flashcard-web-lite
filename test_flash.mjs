// test_flash.mjs — 闪卡纯函数 Node 断言。
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import assert from "node:assert";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, "index.html"), "utf-8");
const m = html.match(/\/\/ ===== 纯函数：挖空[\s\S]*?\/\/ ===== FLASH_LOGIC_END =====/);
assert.ok(m, "未找到闪卡纯函数标记");
const f = new Function(`${m[0]}\nreturn { makeCloze, nextBox, dueDays };`)();

// 挖空
assert.deepStrictEqual(f.makeCloze("首都=北京"), { front: "首都", back: "北京" });
assert.deepStrictEqual(f.makeCloze("无等号"), { front: "无等号", back: "" });

// Leitner 盒进退
assert.strictEqual(f.nextBox(1, true), 2);
assert.strictEqual(f.nextBox(3, false), 1);
assert.strictEqual(f.nextBox(5, true), 5); // 封顶

// 间隔递增
assert.ok(f.dueDays(2) > f.dueDays(1));
assert.ok(f.dueDays(5) > f.dueDays(4));

console.log("OK: flashcard-web-lite 全部用例通过");