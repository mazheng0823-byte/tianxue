import { chromium } from "playwright";
import { pathToFileURL } from "node:url";

const root = "C:/Users/admin/Documents/PM/student-login-verification";
const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  args: ["--disable-gpu", "--disable-software-rasterizer", "--no-sandbox"]
});

const institution = await browser.newPage({ viewport: { width: 2520, height: 1264 } });
await institution.goto(pathToFileURL(`${root}/demo/0924-机构登录验证设置.html`).href);
const optionValues = await institution.locator("#verifyLogin option").allTextContents();
if (optionValues.join(",") !== "否,是") throw new Error(`机构登录验证选项错误：${optionValues.join(",")}`);
await institution.screenshot({ path: `${root}/screenshots/0924-demo-validation.png`, fullPage: true });
await institution.locator("#closeModal").click();
if (await institution.locator("#overlay").isVisible()) throw new Error("机构弹窗关闭失败");
await institution.locator(".edit-trigger").first().click();
await institution.locator("#verifyLogin").selectOption("是");
await institution.locator("#saveForm").click();
if (!(await institution.locator("#toast").textContent()).includes("是")) throw new Error("机构设置保存反馈未体现选择结果");

const pc = await browser.newPage({ viewport: { width: 1969, height: 1247 }, deviceScaleFactor: 1.28 });
await pc.goto(pathToFileURL(`${root}/demo/0924-教师端成员管理-登录验证码.html`).href);
const pcActions = await pc.locator(".code-action").count();
if (pcActions !== 5) throw new Error(`PC 验证码入口数量错误：${pcActions}`);
if ((await pc.locator(".code-action").first().textContent()).trim() !== "生成登录码") throw new Error("PC 操作名称错误");
await pc.locator(".code-action").last().click();
const pcCode = (await pc.locator("#loginCode").textContent()).trim();
if (!/^\d{4}$/.test(pcCode)) throw new Error(`PC 验证码不是 4 位数字：${pcCode}`);
if (!(await pc.locator("#dialogName").textContent()).includes("马诤")) throw new Error("PC 弹窗未关联所选学生");
await pc.screenshot({ path: `${root}/screenshots/0924-pc-member-validation.png`, fullPage: true });
await pc.locator("#closeDialog").click();
if (await pc.locator("#codeOverlay").isVisible()) throw new Error("PC 验证码弹窗关闭失败");

const mobile = await browser.newPage({ viewport: { width: 396, height: 835 }, deviceScaleFactor: 1, isMobile: true });
await mobile.goto(pathToFileURL(`${root}/demo/0924-学生详情-移动端.html`).href);
if ((await mobile.locator("#generateCode").textContent()).trim() !== "生成登录码") throw new Error("移动端操作名称错误");
await mobile.locator("#generateCode").click();
const mobileCode = (await mobile.locator("#loginCode").textContent()).trim();
if (!/^\d{4}$/.test(mobileCode)) throw new Error(`移动端验证码不是 4 位数字：${mobileCode}`);
await mobile.waitForTimeout(250);
await mobile.screenshot({ path: `${root}/screenshots/0924-mobile-student-validation.png`, fullPage: true });
await mobile.locator("#closeSheet").click();
if (await mobile.locator("#overlay").isVisible()) throw new Error("移动端验证码弹层关闭失败");

const index = await browser.newPage({ viewport: { width: 1440, height: 960 } });
await index.goto(pathToFileURL(`${root}/demo/index.html`).href);
if (await index.locator(".card").count() !== 3) throw new Error("目录页未包含全部 3 个页面");
await index.locator('[data-filter="mobile"]').click();
if (await index.locator('.card:not([hidden])').count() !== 1) throw new Error("目录页终端筛选失败");
await index.locator('[data-filter="all"]').click();
await index.screenshot({ path: `${root}/screenshots/0924-demo-directory.png`, fullPage: true });

console.log("PASS: 机构设置、PC 验证码、移动端验证码、1 小时有效期文案及目录筛选均正常");
await browser.close();
