const { addonBuilder } = require("stremio-addon-sdk");

const builder = new addonBuilder({
  id: "org.arabic.sdk",
  version: "1.0.0",
  name: "Arabic Classics SDK",
  description: "Streaming Arabic classic movies via SDK.",
  logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Internet_Archive_logo_and_wordmark.svg",
  resources: ["catalog", "stream"],
  types: ["movie"],
  catalogs: [{ type: "movie", id: "arabic", name: "Arabic Classics" }],
});

// Sample movie
const MOVIES = [
  {
    id: "arabic-movie-1",
    type: "movie",
    name: "الناصر صلاح الدين (1963)",
    poster: "https://ia801600.us.archive.org/22/items/Nasser-Salah-El-Din/Nasser-Salah-El-Din.jpg",
    description: "فيلم مصري تاريخي من إخراج يوسف شاهين.",
  },
];

// Catalog handler with async + try/catch
builder.defineCatalogHandler(async (args, cb) => {
  try {
    cb(null, { metas: MOVIES });
  } catch (err) {
    console.error("Catalog handler error:", err);
    cb(err);
  }
});

// Stream handler with async + try/catch
builder.defineStreamHandler(async ({ id }, cb) => {
  try {
    if (id === "arabic-movie-1") {
      cb(null, {
        streams: [
          {
            title: "Watch HD",
            url: "https://archive.org/download/Nasser-Salah-El-Din/Nasser-Salah-El-Din.mp4",
          },
        ],
      });
    } else {
      cb(null, { streams: [] });
    }
  } catch (err) {
    console.error("Stream handler error:", err);
    cb(err);
  }
});

module.exports = builder.getInterface();
