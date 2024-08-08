const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");

const logFilePath = path.join(__dirname, "../logs/transactions.log");

module.exports = (req, res, next) => {
  const logEntry = `[${format(Date(), "dd/MM/yyyy \t HH:mm:ss")}] \t ${
    req.method
  } \t ${req.path}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) console.error("Error writing log entry");
  });
  next();
};
