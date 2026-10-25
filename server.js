const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const dataDir = path.join(root, "_data");
const storeFile = path.join(dataDir, "records.json");
const backupDir = path.join(dataDir, "backups");
const MAX_BODY = 80 * 1024 * 1024;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function ensureStore() {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.mkdirSync(backupDir, { recursive: true });
  } catch (error) {}
}

function emptyStore() {
  return { records: [], deleted: {}, updatedAt: "" };
}

function readStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(storeFile, "utf8"));
    if (!parsed || typeof parsed !== "object") return emptyStore();
    return {
      records: Array.isArray(parsed.records) ? parsed.records : [],
      deleted: parsed.deleted && typeof parsed.deleted === "object" ? parsed.deleted : {},
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : ""
    };
  } catch (error) {
    return emptyStore();
  }
}

function stampOf(record) {
  const value = record && record.createdAt ? new Date(record.createdAt).getTime() : 0;
  return isNaN(value) ? 0 : value;
}

function dailyBackup() {
  try {
    const day = new Date().toISOString().slice(0, 10);
    const target = path.join(backupDir, "records-" + day + ".json");
    if (!fs.existsSync(target) && fs.existsSync(storeFile)) { fs.copyFileSync(storeFile, target); }
    const files = fs.readdirSync(backupDir).filter(function (name) { return /^records-\d{4}-\d{2}-\d{2}\.json$/.test(name); }).sort();
    while (files.length > 60) { fs.unlinkSync(path.join(backupDir, files.shift())); }
  } catch (error) {}
}

function writeStore(store) {
  ensureStore();
  const temp = storeFile + ".tmp";
  fs.writeFileSync(temp, JSON.stringify(store, null, 2), "utf8");
  fs.renameSync(temp, storeFile);
  dailyBackup();
}

function mergeStores(base, incoming) {
  const byId = new Map();
  const put = function (record) {
    if (!record || typeof record !== "object" || !record.id) return;
    const current = byId.get(record.id);
    if (!current || stampOf(record) >= stampOf(current)) byId.set(record.id, record);
  };
  (base.records || []).forEach(put);
  (incoming.records || []).forEach(put);
  const deleted = Object.assign({}, base.deleted || {}, incoming.deleted || {});
  Object.keys(deleted).forEach(function (id) {
    const record = byId.get(id);
    if (!record) return;
    const when = new Date(deleted[id]).getTime();
    if (!isNaN(when) && stampOf(record) <= when) byId.delete(id);
  });
  return { records: Array.from(byId.values()), deleted: deleted, updatedAt: new Date().toISOString() };
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(function (request, response) {
  const requestPath = decodeURIComponent(String(request.url || "/").split("?")[0]);

  if (requestPath === "/api/records" || requestPath === "/api/records/") {
    if (request.method === "GET") { sendJson(response, 200, readStore()); return; }
    if (request.method === "POST") {
      let body = "";
      let size = 0;
      request.on("data", function (chunk) {
        size += chunk.length;
        if (size > MAX_BODY) { request.destroy(); return; }
        body += chunk;
      });
      request.on("end", function () {
        let incoming = null;
        try { incoming = JSON.parse(body || "{}"); } catch (error) { sendJson(response, 400, { error: "invalid json" }); return; }
        const merged = mergeStores(readStore(), incoming && typeof incoming === "object" ? incoming : {});
        writeStore(merged);
        sendJson(response, 200, merged);
      });
      return;
    }
    sendJson(response, 405, { error: "method not allowed" });
    return;
  }

  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const firstSegment = relativePath.split("/")[0];
  const filePath = path.resolve(root, relativePath);

  if (firstSegment === "_data" || firstSegment.charAt(0) === "." || (!filePath.startsWith(root + path.sep) && filePath !== path.join(root, "index.html"))) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, function (error, data) {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    response.writeHead(200, { "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    response.end(data);
  });
});

server.listen(port, "0.0.0.0", function () {
  console.log("案例册 running at http://127.0.0.1:" + port + " (LAN ok, data in _data/records.json)");
});