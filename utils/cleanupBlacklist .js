// module.exports.cleanupBlacklist = () => {
//     const blacklist = fs.readFileSync(blacklistFilePath, "utf-8");
//     const now = new Date();
//     const updatedBlacklist = blacklist
//       .split("\n")
//       .filter((line) => {
//         const [, expiresAt] = line.split(" | ");
//         return new Date(expiresAt) > now;
//       })
//       .join("\n");

//     fs.writeFileSync(blacklistFilePath, updatedBlacklist, "utf-8");
//   };

const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const cleanExpiredTokens = () => {
  try {
    const blacklistFilePath = path.join(__dirname, "../blacklist.json");

    if (fs.existsSync(blacklistFilePath)) {
      const blacklisted = JSON.parse(
        fs.readFileSync(blacklistFilePath, "utf-8")
      );

      // Get the current date and time
      const now = new Date();

      // Remove expired tokens
      for (const token in blacklisted) {
        const expiryDate = new Date(blacklisted[token]);
        if (expiryDate < now) {
          delete blacklisted[token];
        }
      }

      // Write the updated blacklist back to the file
      fs.writeFileSync(blacklistFilePath, JSON.stringify(blacklisted, null, 2));
      console.log("Expired tokens cleaned up successfully.");
    } else {
      console.log("Blacklist file does not exist. No cleanup needed.");
    }
  } catch (error) {
    console.error("Error while cleaning up expired tokens:", error.message);
  }
};

// Schedule the function to run every 24 hours using node-cron

// cron.schedule("0 0 * * *", () => {
//   console.log("Running daily cleanup for expired tokens...");
//   cleanExpiredTokens();
// });
// console.log("Running daily cleanup for expired tokens...");

const cleanupBlacklist = () => {
  cron.schedule("0 0 * * *", () => {
    console.log("Running cleanup for expired tokens every 5 seconds...",new Date());
    cleanExpiredTokens();
  });
};

module.exports = { cleanupBlacklist };
