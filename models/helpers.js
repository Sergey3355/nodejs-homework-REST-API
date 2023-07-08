const fs = require("fs").promises;

const tryCatchWrapper =
  (func) =>
  async (...args) => {
    try {
      return await func(...args);
    } catch (error) {
      console.log("🚀  error:", error);
    }
  };

const updateFileOperation = async (data, addToContactFile, contactsPath) => {
  const contactFile = data.filter(({ id }) => id !== addToContactFile.id);

  const addNewContact = [addToContactFile, ...contactFile];

  const convertToString = JSON.stringify(addNewContact);
  await fs.writeFile(contactsPath, convertToString, "utf-8");
};

module.exports = {
  updateFileOperation,
  tryCatchWrapper,
};
