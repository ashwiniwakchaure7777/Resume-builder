module.exports.cleanupBlacklist = () => {
    const blacklist = fs.readFileSync(blacklistFilePath, "utf-8");
    const now = new Date();
    const updatedBlacklist = blacklist
      .split("\n")
      .filter((line) => {
        const [, expiresAt] = line.split(" | ");
        return new Date(expiresAt) > now;
      })
      .join("\n");
  
    fs.writeFileSync(blacklistFilePath, updatedBlacklist, "utf-8");
  };
  
 